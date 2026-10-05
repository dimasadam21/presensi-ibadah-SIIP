// =============================================================
// ABSEN SHOLAT 5 WAKTU - SMKN 1 MAGELANG
// Backend Google Apps Script (Code.gs)
// Fitur:
//  - Login Siswa via NIS + Password
//  - Ganti password mandiri oleh siswa
//  - Reset password siswa oleh Admin
//  - Ambil foto kamera depan/selfie (wajib saat Hadir/Halangan)
//  - Rekam GPS (lat/lng + jarak ke sekolah) & waktu absen
//  - 5 waktu sholat: Subuh, Dzuhur, Ashar, Maghrib, Isya
//  - Khusus siswi (JK = P): pilihan "Halangan" per waktu sholat & menu Halangan Harian (satu klik untuk semua waktu)
// =============================================================

var TZ = 'Asia/Jakarta';
var NAMA_SHOLAT = ['Subuh', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
var NAMA_SEKOLAH_DEFAULT = 'SMKN 1 Magelang';
var PASS_DEFAULT_L = '12345';
var PASS_DEFAULT_P = '123456';

// ================= ROUTING & API GATEWAY =================
function doGet(e) {
  // Jika diakses dengan query ?action=... untuk pengecekan API
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequest_(e);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var pengMap = getPengaturanMap_(ss);
  var appTitle = pengMap['judul_aplikasi'] || 'Presensi Sholat & Ibadah';
  try {
    return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle(appTitle)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return ContentService.createTextOutput("Backend API Presensi Sholat Aktif. Silakan gunakan POST untuk memanggil endpoint.")
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  return handleApiRequest_(e);
}

function handleApiRequest_(e) {
  var output;
  try {
    var action = '';
    var args = [];

    if (e && e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        action = parsed.action || '';
        args = parsed.args || [];
      } catch (eParse) {
        action = (e.parameter && e.parameter.action) || '';
      }
    } else if (e && e.parameter) {
      action = e.parameter.action || '';
      if (e.parameter.args) {
        try { args = JSON.parse(e.parameter.args); } catch(ex){}
      }
    }

    var apiMap = {
      'getInfoPublik': getInfoPublik,
      'getDaftarSiswa': getDaftarSiswa,
      'loginSiswa': loginSiswa,
      'gantiPasswordSiswa': gantiPasswordSiswa,
      'getRiwayatSholat': getRiwayatSholat,
      'getRekapHariIni': getRekapHariIni,
      'adminLogin': adminLogin,
      'getPengaturan': getPengaturan,
      'simpanPengaturan': simpanPengaturan,
      'getLaporan': getLaporan,
      'getLaporanHarian': getLaporanHarian,
      'getSemuaSiswa': getSemuaSiswa,
      'simpanSiswa': simpanSiswa,
      'hapusSiswa': hapusSiswa,
      'importSiswa': importSiswa,
      'resetPasswordSiswa': resetPasswordSiswa,
      'resetPasswordGlobal': resetPasswordGlobal,
      'resetSemuaPasswordDefaultGender': resetSemuaPasswordDefaultGender,
      'catatSholat': catatSholat,
      'catatHalanganSemua': catatHalanganSemua,
      'toggleCronWA': toggleCronWA,
      'testKirimWA': testKirimWA,
      'sinkronkanDataDanNoHp': sinkronkanDataDanNoHp
    };

    if (!action || !apiMap[action]) {
      output = { success: false, message: 'Aksi API "' + action + '" tidak ditemukan atau tidak diizinkan.' };
    } else {
      output = apiMap[action].apply(null, args);
    }
  } catch (err) {
    output = { success: false, message: 'Terjadi error di server Apps Script: ' + err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ================= SETUP DATABASE =================
// Jalankan sekali dari editor Apps Script untuk membuat sheet & data contoh,
// dan untuk menambahkan kolom Password ke sheet Siswa yang sudah ada.
function setupDB() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetsConfig = {
    'Siswa': ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP'],
    'AbsenSholat': ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl'],
    'Pengaturan': ['Parameter', 'Nilai'],
    'LogNotifWA': ['Tanggal', 'Sholat', 'NIS', 'Nama', 'NoHP', 'KirimKe', 'WaktuKirim', 'Status']
  };

  for (var name in sheetsConfig) {
    if (!ss.getSheetByName(name)) {
      var sheet = ss.insertSheet(name);
      sheet.appendRow(sheetsConfig[name]);
      if (name === 'Pengaturan') sheet.getRange("A:A").setFontWeight("bold");
    } else {
      var sheet = ss.getSheetByName(name);
      ensureSheetHeaders_(sheet, sheetsConfig[name]);
    }
  }

  // Data contoh Siswa (password default: L = 12345, P = 123456)
  var siswa = ss.getSheetByName('Siswa');
  if (siswa.getLastRow() <= 1) {
    siswa.getRange(2, 2, 4, 1).setNumberFormat('@'); // Kolom NIS sebagai teks
    siswa.appendRow(['SIS001', '2024001', 'Muhammad Farhan', 'X', 'RPL', 'L', 'Aktif', hashPassword_('2024001'), '']);
    siswa.appendRow(['SIS002', '2024002', 'Aisyah Putri', 'X', 'RPL', 'P', 'Aktif', hashPassword_('2024002'), '']);
    siswa.appendRow(['SIS003', '2024003', 'Ahmad Zaki', 'XI', 'TKJ', 'L', 'Aktif', hashPassword_('2024003'), '']);
    siswa.appendRow(['SIS004', '2024004', 'Siti Fatimah', 'XI', 'TKJ', 'P', 'Aktif', hashPassword_('2024004'), '']);
  }

  // Pengaturan default (lokasi sekolah, radius, & jendela waktu sholat)
  var peng = ss.getSheetByName('Pengaturan');
  if (peng.getLastRow() <= 1) {
    var defaults = [
      ['nama_sekolah', NAMA_SEKOLAH_DEFAULT],
      ['lat_sekolah', '-7.5342'],
      ['lng_sekolah', '110.2312'],
      ['radius_meter', '100'],
      ['wajib_dalam_radius', 'TIDAK'], // YA = tolak absen di luar radius
      ['admin_pin', '1234'], // PIN lama (kompatibilitas)
      ['admin_user', 'admin'], // Username login admin
      ['admin_pass', 'admin123'], // Password login admin (ubah demi keamanan)
      // Jendela waktu tiap sholat (format HH:mm). Absen di luar jendela = Terlambat.
      ['subuh_mulai', '04:00'], ['subuh_selesai', '05:45'],
      ['dhuha_mulai', '07:00'], ['dhuha_selesai', '11:00'],
      ['dzuhur_mulai', '11:45'], ['dzuhur_selesai', '15:00'],
      ['ashar_mulai', '15:00'], ['ashar_selesai', '17:45'],
      ['maghrib_mulai', '17:45'], ['maghrib_selesai', '19:00'],
      ['isya_mulai', '19:00'], ['isya_selesai', '23:59'],
      ['judul_aplikasi', 'Presensi Sholat & Ibadah'],
      ['tema_warna', '#0d9488'],
      ['ukuran_logo', '42'],
      ['ukuran_judul', '19'],
      ['posisi_header', 'center'],
      ['tata_letak_header', 'stacked'],
      ['wa_token', ''],
      ['wa_aktif', 'TIDAK'],
      ['wa_interval', '15'],
      ['wa_max_kirim', '2'],
      ['wa_template_pesan', "Assalamu'alaikum *{nama}*,\n\nWaktu sholat *{sholat}* sedang berlangsung.\nSegera laksanakan sholat dan lakukan absen di aplikasi {sekolah}.\n\n_(Pesan otomatis pengingat ibadah)_"],
      ['wa_target_mode', 'semua'],
      ['wa_target_kelas', ''],
      ['wa_target_nomor', ''],
      ['pesan_sukses', 'Barangsiapa yang memelihara sholat, maka sholat itu akan menjadi cahaya, petunjuk, dan keselamatan baginya di hari kiamat. (HR. Ahmad)\nSholat adalah tiang agama, barangsiapa menegakkannya maka sungguh ia telah menegakkan agama.\nJadikan sholat dan sabar sebagai penolongmu. Sesungguhnya Allah bersama orang-orang yang sabar. (QS. Al-Baqarah: 153)\nAmalan yang paling dicintai oleh Allah adalah sholat pada awal waktunya. (HR. Bukhari & Muslim)'],
      ['pesan_sukses_subuh', 'Dua rakaat fajar (sebelum Subuh) lebih baik daripada dunia dan seisinya. (HR. Muslim)\nBarangsiapa yang sholat Subuh berjamaah, maka ia berada dalam jaminan dan perlindungan Allah Ta\'ala. (HR. Muslim)\nSungguh sholat Subuh itu disaksikan oleh para malaikat malam dan malaikat siang. (QS. Al-Isra: 78)\nAwali pagimu dengan sujud Subuh, niscaya Allah lapangkan rezeki dan berkahi harimu.'],
      ['pesan_sukses_dhuha', 'Dua rakaat sholat Dhuha mencukupi sedekah atas seluruh 360 persendian tubuhmu setiap harinya. (HR. Muslim)\nWahai anak Adam, janganlah engkau luput dari empat rakaat di awal harimu (Dhuha), niscaya Aku cukupkan kebutuhanmu hingga sore hari. (HR. Tirmidzi)\nSholat Dhuha adalah sholatnya orang-orang yang senantiasa bertaubat dan kembali kepada Allah. (HR. Ibnu Khuzaimah)\nRezeki tidak melulu tentang harta, hati yang damai dan tubuh yang sehat adalah karunia Dhuha.'],
      ['pesan_sukses_dzuhur', 'Pintu-pintu langit dibuka pada saat tergelincir matahari (Dzuhur), dan aku suka amal shalihku diangkat pada saat itu. (HR. Tirmidzi)\nSholat Dzuhur tepat waktu di sela kesibukan adalah tanda kesetiaan cinta seorang hamba kepada Rabb-nya.\nRehatkan jiwamu dari hiruk-pikuk aktivitas siang dengan sujud Dzuhur yang khusyuk dan menentramkan.'],
      ['pesan_sukses_ashar', 'Barangsiapa meninggalkan sholat Ashar, maka gugurlah amal kebaikannya. (HR. Bukhari)\nOrang yang menjaga sholat sebelum terbit matahari (Subuh) dan sebelum terbenamnya (Ashar) tidak akan disentuh api neraka. (HR. Muslim)\nSholat Wustha (Ashar) adalah penjaga keteguhan hati di penghujung sore, istiqamahkan selalu.'],
      ['pesan_sukses_maghrib', 'Umatku akan senantiasa berada dalam kebaikan selama tidak menunda sholat Maghrib. (HR. Abu Dawud)\nTutup lembaran siang harimu dengan rasa syukur dan doa yang mustajab di antara azan dan iqamah sholat Maghrib.\nSaat senja berganti petang, terangi hatimu dengan sujud Maghrib yang penuh ketundukan kepada Sang Maha Pencipta.'],
      ['pesan_sukses_isya', 'Barangsiapa sholat Isya berjamaah, maka seolah-olah ia telah sholat separuh malam. (HR. Muslim)\nSeandainya mereka mengetahui keutamaan sholat Isya dan Subuh, niscaya mereka akan mendatanginya meski merangkak. (HR. Bukhari & Muslim)\nLepaskan semua beban lelah harimu di hadapan Allah dalam sholat Isya, agar istirahat malammu dinaungi rahmat.'],
      ['pass_default_l', PASS_DEFAULT_L],
      ['pass_default_p', PASS_DEFAULT_P],
      ['mode_pass_default', 'gender']
    ];
    defaults.forEach(function (row) { peng.appendRow(row); });
  }

  return { success: true, message: 'Setup database Absen Sholat berhasil.' };
}

// ================= UTILS =================
function isPerempuan_(jk) {
  var s = String(jk || '').trim().toUpperCase();
  return (s === 'P' || s === 'PEREMPUAN' || s === 'WANITA' || s === 'W' || s.indexOf('P') === 0 || s.indexOf('W') === 0);
}

function strEq_(a, b) {
  var sa = a === null || a === undefined ? '' : String(a).trim();
  var sb = b === null || b === undefined ? '' : String(b).trim();
  return sa === sb;
}

// Normalisasi nilai Tanggal ke format 'yyyy-MM-dd'.
function toTanggalStr_(val) {
  if (val === null || val === undefined || val === '') return '';
  if (Object.prototype.toString.call(val) === '[object Date]') {
    return Utilities.formatDate(val, TZ, 'yyyy-MM-dd');
  }
  var s = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  var d = new Date(s);
  if (!isNaN(d.getTime())) return Utilities.formatDate(d, TZ, 'yyyy-MM-dd');
  return s;
}

function formatNomorHp_(val) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (!str) return '';

  // Tangani format scientific notation e.g. 8.12345E+11 dari Excel / Spreadsheet
  if (/[eE]\+?/.test(str)) {
    var num = Number(str);
    if (!isNaN(num) && isFinite(num)) {
      str = num.toLocaleString('fullwide', { useGrouping: false });
    }
  }

  // Buang semua karakter non-angka
  var digits = str.replace(/\D/g, '');
  if (!digits) return '';

  // Ubah format internasional 628... menjadi 08...
  if (digits.indexOf('62') === 0 && digits.length >= 10) {
    digits = '0' + digits.substring(2);
  }
  // Jika angka 0 di depan hilang (karena Google Sheet menganggap nomor: 81234567890), tambahkan 0 di depan
  else if (digits.indexOf('8') === 0 && digits.length >= 9 && digits.length <= 13) {
    digits = '0' + digits;
  }

  return digits;
}

function getColumnMap(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return {};
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var map = {};

  for (var i = 0; i < headers.length; i++) {
    var raw = String(headers[i] || '').trim();
    if (!raw) continue;
    map[raw] = i;
    var norm = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (norm && map[norm] === undefined) {
      map[norm] = i;
    }
  }

  // Pemetaan alias cerdas agar nama kolom bervariasi tetap terdeteksi otomatis
  var aliases = {
    'SiswaID': ['siswaid', 'id', 'idsiswa', 'nomorid'],
    'NIS': ['nis', 'nisn', 'nomorinduk', 'noinduk'],
    'Nama': ['nama', 'namasiswa', 'namalengkap', 'nama_siswa'],
    'Kelas': ['kelas', 'kls', 'rombel', 'tingkat'],
    'Jurusan': ['jurusan', 'prodi', 'program', 'keahlian'],
    'JK': ['jk', 'jeniskelamin', 'gender', 'l/p', 'lp'],
    'Status': ['status', 'statussiswa', 'keaktifan'],
    'Password': ['password', 'pass', 'katasandi', 'katasandi_hash', 'passwordhash'],
    'NoHP': ['nohp', 'no_hp', 'no. hp', 'no hp', 'nomorhp', 'hp', 'nowa', 'no wa', 'no_wa', 'no. wa', 'nomorwa', 'whatsapp', 'wa', 'telepon', 'telp', 'notelp', 'kontak', 'nohandphone', 'handphone']
  };

  for (var stdKey in aliases) {
    if (map[stdKey] === undefined) {
      var arr = aliases[stdKey];
      for (var a = 0; a < arr.length; a++) {
        var aNorm = arr[a].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (map[arr[a]] !== undefined) {
          map[stdKey] = map[arr[a]];
          break;
        } else if (map[aNorm] !== undefined) {
          map[stdKey] = map[aNorm];
          break;
        }
      }
    }
  }

  return map;
}

function ensureSheetHeaders_(sheet, expectedHeaders) {
  if (!sheet) return;
  var sName = sheet.getName();
  var cache = CacheService.getScriptCache();
  var cKey = 'HDR_OK_' + sName;
  if (cache.get(cKey) === '1') return;

  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) {
    sheet.appendRow(expectedHeaders);
    try { cache.put(cKey, '1', 1800); } catch(e){}
    return;
  }
  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var map = {};
  for (var i = 0; i < currentHeaders.length; i++) {
    var raw = String(currentHeaders[i] || '').trim();
    if (raw) {
      map[raw] = i;
      var norm = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (norm) map[norm] = i;
    }
  }

  var aliases = {
    'SiswaID': ['siswaid', 'id', 'idsiswa'],
    'NIS': ['nis', 'nisn', 'nomorinduk'],
    'Nama': ['nama', 'namasiswa', 'namalengkap'],
    'Kelas': ['kelas', 'kls', 'rombel'],
    'Jurusan': ['jurusan', 'prodi'],
    'JK': ['jk', 'jeniskelamin', 'gender'],
    'Status': ['status', 'statussiswa'],
    'Password': ['password', 'pass', 'katasandi'],
    'NoHP': ['nohp', 'no_hp', 'no. hp', 'no hp', 'nomorhp', 'hp', 'nowa', 'no wa', 'no_wa', 'whatsapp', 'wa', 'telepon', 'notelp', 'kontak']
  };

  for (var j = 0; j < expectedHeaders.length; j++) {
    var exp = expectedHeaders[j];
    var found = (map[exp] !== undefined);
    if (!found && aliases[exp]) {
      var aliasList = aliases[exp];
      for (var k = 0; k < aliasList.length; k++) {
        var aNorm = aliasList[k].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (map[aliasList[k]] !== undefined || map[aNorm] !== undefined) {
          found = true;
          var colIdx = (map[aliasList[k]] !== undefined) ? map[aliasList[k]] : map[aNorm];
          sheet.getRange(1, colIdx + 1).setValue(exp);
          break;
        }
      }
    }

    if (!found) {
      lastCol++;
      sheet.getRange(1, lastCol).setValue(exp);
      map[exp] = lastCol - 1;
      map[exp.toLowerCase().replace(/[^a-z0-9]/g, '')] = lastCol - 1;
    }
  }

  try { cache.put(cKey, '1', 1800); } catch(e){}
}

function sanitizeInput(value, maxLength) {
  if (value === 0) return '0';
  if (!value) return '';
  var str = String(value).replace(/<[^>]*>?/gm, '').trim();
  if (maxLength && str.length > maxLength) str = str.substring(0, maxLength);
  return str;
}

// Hash password sederhana (SHA-256, hex). Password TIDAK disimpan dalam bentuk teks biasa.
function hashPassword_(plain) {
  var str = String(plain == null ? '' : plain).trim();
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str, Utilities.Charset.UTF_8);
  return bytes.map(function (b) {
    var v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

// Bandingkan password input dengan hash tersimpan.
// Kompatibel dengan data lama yang belum memiliki Password (dianggap default: L=12345, P=123456, atau NIS).
function cekPassword_(inputPassword, storedHash, nis, optDefaultPass) {
  var input = String(inputPassword == null ? '' : inputPassword).trim();
  var actualNis = String(nis == null ? '' : nis).trim();
  if (storedHash) {
    if (hashPassword_(input) === String(storedHash).trim()) return true;
    if (storedHash === input) return true; // plain text di spreadsheet
    if (strEq_(input, actualNis) && (storedHash === hashPassword_(actualNis) || storedHash === actualNis)) return true;
    if (optDefaultPass && (storedHash === hashPassword_(optDefaultPass) || storedHash === optDefaultPass) && strEq_(input, optDefaultPass)) return true;
    return false;
  }
  // Bila password belum diset di sheet, default mutlak adalah nomor NIS siswa
  if (strEq_(input, actualNis)) return true;
  if (optDefaultPass && strEq_(input, optDefaultPass)) return true;
  return false;
}

// Hasilkan password acak 6 digit (dipakai saat admin reset password tanpa menentukan nilai baru).
function buatPasswordAcak_() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getPengaturanMap_(ss) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('PENGATURAN_MAP_JSON');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  var sheet = ss.getSheetByName('Pengaturan');
  var data = sheet.getDataRange().getValues();
  var map = {};
  for (var i = 1; i < data.length; i++) {
    map[String(data[i][0]).trim()] = data[i][1];
  }
  if (map['nama_sekolah']) {
    map['nama_sekolah'] = String(map['nama_sekolah']).replace(/^Aplikasi untuk Sekolah\s*/i, '').trim();
  }

  // Nilai default untuk key baru agar otomatis aktif pada database yang sudah ada
  var defaults = {
    'dhuha_mulai': '07:00',
    'dhuha_selesai': '11:00',
    'subuh_mulai': '04:00',
    'subuh_selesai': '05:45',
    'dzuhur_mulai': '11:45',
    'dzuhur_selesai': '15:00',
    'ashar_mulai': '15:00',
    'ashar_selesai': '17:45',
    'maghrib_mulai': '17:45',
    'maghrib_selesai': '19:00',
    'isya_mulai': '19:00',
    'isya_selesai': '23:59',
    'judul_aplikasi': 'Presensi Sholat & Ibadah',
    'tema_warna': '#0d9488',
    'ukuran_logo': '46',
    'ukuran_judul': '19',
    'posisi_header': 'center',
    'tata_letak_header': 'stacked',
    'pass_default_l': PASS_DEFAULT_L,
    'pass_default_p': PASS_DEFAULT_P,
    'mode_pass_default': 'gender'
  };

  var missing = [];
  for (var k in defaults) {
    if (map[k] === undefined || map[k] === null || String(map[k]).trim() === '') {
      map[k] = defaults[k];
      missing.push([k, defaults[k]]);
    }
  }

  // Otomatis tambahkan baris yang belum ada ke sheet Pengaturan di spreadsheet
  if (missing.length > 0) {
    try {
      missing.forEach(function (r) {
        var nextRow = sheet.getLastRow() + 1;
        sheet.getRange(nextRow, 1).setValue(r[0]);
        sheet.getRange(nextRow, 2).setNumberFormat('@').setValue(r[1]);
      });
    } catch (eAuto) {}
  }

  try {
    cache.put('PENGATURAN_MAP_JSON', JSON.stringify(map), 600); // Cache RAM 10 menit
  } catch (eC) {}

  return map;
}

function parseJamKeMenit_(val) {
  if (val instanceof Date) return val.getHours() * 60 + val.getMinutes();
  var str = String(val == null ? '' : val).trim();
  var match = str.match(/^(\d{1,2})[:.](\d{2})/);
  if (match) return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  return null;
}

// Haversine, hasil dalam meter
function hitungJarakMeter_(lat1, lng1, lat2, lng2) {
  lat1 = parseFloat(String(lat1).replace(',', '.'));
  lng1 = parseFloat(String(lng1).replace(',', '.'));
  lat2 = parseFloat(String(lat2).replace(',', '.'));
  lng2 = parseFloat(String(lng2).replace(',', '.'));
  if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) return null;
  var R = 6371000;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLng = (lng2 - lng1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Caching folder foto absen agar tidak memanggil DriveApp.getFoldersByName berulang kali (menghemat 1-2 detik per absen)
function getFolderFotoAbsen_() {
  var cache = CacheService.getScriptCache();
  var folderId = cache.get('FOLDER_FOTO_ID');
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (e) {
      cache.remove('FOLDER_FOTO_ID');
    }
  }
  var props = PropertiesService.getScriptProperties();
  folderId = props.getProperty('FOLDER_FOTO_ID');
  if (folderId) {
    try {
      var folder = DriveApp.getFolderById(folderId);
      cache.put('FOLDER_FOTO_ID', folderId, 21600);
      return folder;
    } catch (e) {
      props.deleteProperty('FOLDER_FOTO_ID');
    }
  }
  var folders = DriveApp.getFoldersByName('Foto Absen Sholat');
  var targetFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Foto Absen Sholat');
  try {
    targetFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {}
  var id = targetFolder.getId();
  try {
    props.setProperty('FOLDER_FOTO_ID', id);
    cache.put('FOLDER_FOTO_ID', id, 21600);
  } catch (e) {}
  return targetFolder;
}

function invalidateDaftarSiswaCache_() {
  try {
    CacheService.getScriptCache().remove('DAFTAR_SISWA_PUB');
  } catch (e) {}
}

// Tentukan sholat yang sedang berlangsung berdasarkan jam sekarang (prioritaskan sholat fardhu jika beririsan).
function getSholatSaatIni_(pengMap, now) {
  now = now || new Date();
  var menit = now.getHours() * 60 + now.getMinutes();
  var urutan = ['Dzuhur', 'Ashar', 'Maghrib', 'Isya', 'Subuh', 'Dhuha'];
  for (var i = 0; i < urutan.length; i++) {
    var key = urutan[i].toLowerCase();
    var mulai = parseJamKeMenit_(pengMap[key + '_mulai']);
    var selesai = parseJamKeMenit_(pengMap[key + '_selesai']);
    if (mulai === null || selesai === null) continue;
    var match = (mulai <= selesai) ? (menit >= mulai && menit <= selesai) : (menit >= mulai || menit <= selesai);
    if (match) return urutan[i];
  }
  return '';
}

// Daftar semua sholat yang jendelanya sedang aktif saat ini
function getDaftarSholatAktif_(pengMap, now) {
  now = now || new Date();
  var menit = now.getHours() * 60 + now.getMinutes();
  var aktif = [];
  for (var i = 0; i < NAMA_SHOLAT.length; i++) {
    var key = NAMA_SHOLAT[i].toLowerCase();
    var mulai = parseJamKeMenit_(pengMap[key + '_mulai']);
    var selesai = parseJamKeMenit_(pengMap[key + '_selesai']);
    if (mulai === null || selesai === null) continue;
    var match = (mulai <= selesai) ? (menit >= mulai && menit <= selesai) : (menit >= mulai || menit <= selesai);
    if (match) aktif.push(NAMA_SHOLAT[i]);
  }
  return aktif;
}

// Normalisasi nilai jam ke format 'HH:mm' (menangani objek Date dari Sheets dan format titik).
function jamStr_(val) {
  if (val instanceof Date) return Utilities.formatDate(val, TZ, 'HH:mm');
  var m = String(val == null ? '' : val).trim().match(/^(\d{1,2})[:.](\d{2})/);
  if (m) return ('0' + m[1]).slice(-2) + ':' + m[2];
  return String(val == null ? '' : val).trim();
}

// Bangun objek jendela waktu sholat: {Subuh:{mulai,selesai}, ...}
function getJendelaSholat_(pengMap) {
  var j = {};
  NAMA_SHOLAT.forEach(function (s) {
    var key = s.toLowerCase();
    j[s] = { mulai: jamStr_(pengMap[key + '_mulai']), selesai: jamStr_(pengMap[key + '_selesai']) };
  });
  return j;
}

// Info publik untuk halaman utama (tanpa perlu login): nama sekolah, branding, & jendela sholat.
function getInfoPublik() {
  try {
    var cache = CacheService.getScriptCache();
    var cached = cache.get('INFO_PUBLIK_JSON');
    if (cached) {
      try { return JSON.parse(cached); } catch(e){}
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var pengMap = getPengaturanMap_(ss);
    var res = {
      success: true,
      namaSekolah: pengMap['nama_sekolah'] || NAMA_SEKOLAH_DEFAULT,
      logoSekolah: pengMap['logo_sekolah'] || '',
      judulAplikasi: pengMap['judul_aplikasi'] || 'Presensi Sholat & Ibadah',
      temaWarna: pengMap['tema_warna'] || '#0d9488',
      ukuranLogo: pengMap['ukuran_logo'] || '42',
      ukuranJudul: pengMap['ukuran_judul'] || '19',
      posisiHeader: pengMap['posisi_header'] || 'center',
      tataLetakHeader: pengMap['tata_letak_header'] || 'stacked',
      waInterval: pengMap['wa_interval'] || '15',
      pesanSukses: pengMap['pesan_sukses'] || '',
      pesanSuksesSubuh: pengMap['pesan_sukses_subuh'] || '',
      pesanSuksesDhuha: pengMap['pesan_sukses_dhuha'] || '',
      pesanSuksesDzuhur: pengMap['pesan_sukses_dzuhur'] || '',
      pesanSuksesAshar: pengMap['pesan_sukses_ashar'] || '',
      pesanSuksesMaghrib: pengMap['pesan_sukses_maghrib'] || '',
      pesanSuksesIsya: pengMap['pesan_sukses_isya'] || '',
      jendelaSholat: getJendelaSholat_(pengMap),
      sholatSaatIni: getSholatSaatIni_(pengMap, new Date()),
      daftarSholatAktif: getDaftarSholatAktif_(pengMap, new Date()),
      wajibDalamRadius: pengMap['wajib_dalam_radius'] || 'TIDAK'
    };

    try { cache.put('INFO_PUBLIK_JSON', JSON.stringify(res), 600); } catch(e){}
    return res;
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ================= LOGIN & DATA SISWA =================
// Daftar siswa untuk fitur autocomplete NIS di halaman login.
function getDaftarSiswa() {
  try {
    var cache = CacheService.getScriptCache();
    var cached = cache.get('DAFTAR_SISWA_PUB');
    if (cached) {
      try { return { success: true, data: JSON.parse(cached) }; } catch(e){}
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    if (!sheet) return { success: false, message: 'Sheet Siswa belum ada. Jalankan setupDatabase().' };
    var data = sheet.getDataRange().getValues();
    var map = getColumnMap(sheet);
    var list = [];
    for (var i = 1; i < data.length; i++) {
      if (!strEq_(data[i][map['Status']], 'Aktif')) continue;
      list.push({
        nis: String(data[i][map['NIS']]).trim(),
        nama: String(data[i][map['Nama']]).trim(),
        kelas: String(data[i][map['Kelas']]).trim()
      });
    }

    try { cache.put('DAFTAR_SISWA_PUB', JSON.stringify(list), 1800); } catch(e){}
    return { success: true, data: list };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Login siswa berdasarkan NIS + Password.
function loginSiswa(nis, password) {
  try {
    nis = sanitizeInput(nis, 30);
    if (!nis) return { success: false, message: 'NIS wajib diisi.' };
    if (!password) return { success: false, message: 'Password wajib diisi.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password']);
    var data = sheet.getDataRange().getValues();
    var map = getColumnMap(sheet);
    for (var i = 1; i < data.length; i++) {
      var isMatch = strEq_(data[i][map['NIS']], nis) || strEq_(data[i][map['Nama']], nis);
      if (isMatch) {
        if (!strEq_(data[i][map['Status']], 'Aktif')) {
          return { success: false, message: 'Akun siswa tidak aktif. Hubungi guru/admin.' };
        }
        var actualNis = String(data[i][map['NIS']]).trim();
        var storedHash = map['Password'] !== undefined ? String(data[i][map['Password']] || '').trim() : '';
        var jk = String(data[i][map['JK']]).trim().toUpperCase();
        var isPerempuan = isPerempuan_(jk);
        var pengMap = getPengaturanMap_(ss);
        var defL = String(pengMap['pass_default_l'] || PASS_DEFAULT_L).trim();
        var defP = String(pengMap['pass_default_p'] || PASS_DEFAULT_P).trim();
        var genderPass = isPerempuan ? defP : defL;

        if (!cekPassword_(password, storedHash, actualNis)) {
          return { success: false, message: 'Password salah. (Default: nomor NIS masing-masing siswa)' };
        }
        var isDefault = !storedHash ||
          storedHash === hashPassword_(actualNis) ||
          storedHash === actualNis;
        var siswa = {
          nis: actualNis,
          nama: String(data[i][map['Nama']]).trim(),
          kelas: String(data[i][map['Kelas']]).trim(),
          jurusan: String(data[i][map['Jurusan']]).trim(),
          jk: jk, // 'L' atau 'P'
          isPerempuan: isPerempuan,
          passwordDefault: isDefault
        };
        return {
          success: true,
          siswa: siswa,
          namaSekolah: pengMap['nama_sekolah'] || NAMA_SEKOLAH_DEFAULT,
          logoSekolah: pengMap['logo_sekolah'] || '',
          judulAplikasi: pengMap['judul_aplikasi'] || 'Presensi Sholat & Ibadah',
          temaWarna: pengMap['tema_warna'] || '#0d9488',
          ukuranLogo: pengMap['ukuran_logo'] || '42',
          ukuranJudul: pengMap['ukuran_judul'] || '19',
          posisiHeader: pengMap['posisi_header'] || 'center',
          tataLetakHeader: pengMap['tata_letak_header'] || 'stacked',
          waInterval: pengMap['wa_interval'] || '15',
          pesanSukses: pengMap['pesan_sukses'] || '',
          pesanSuksesSubuh: pengMap['pesan_sukses_subuh'] || '',
          pesanSuksesDhuha: pengMap['pesan_sukses_dhuha'] || '',
          pesanSuksesDzuhur: pengMap['pesan_sukses_dzuhur'] || '',
          pesanSuksesAshar: pengMap['pesan_sukses_ashar'] || '',
          pesanSuksesMaghrib: pengMap['pesan_sukses_maghrib'] || '',
          pesanSuksesIsya: pengMap['pesan_sukses_isya'] || '',
          sholatSaatIni: getSholatSaatIni_(pengMap, new Date()),
          daftarSholatAktif: getDaftarSholatAktif_(pengMap, new Date()),
          jendelaSholat: getJendelaSholat_(pengMap),
          riwayatHariIni: getRiwayatHariIni_(ss, actualNis),
          wajibDalamRadius: pengMap['wajib_dalam_radius'] || 'TIDAK'
        };
      }
    }
    return { success: false, message: 'NIS / Nama "' + nis + '" tidak terdaftar.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Ganti password mandiri oleh siswa (butuh password lama yang benar).
function gantiPasswordSiswa(nis, passwordLama, passwordBaru) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(8000)) return { success: false, message: 'Server sibuk, coba lagi sesaat.' };
  try {
    nis = sanitizeInput(nis, 30);
    if (!nis) return { success: false, message: 'Sesi tidak valid, silakan login ulang.' };
    passwordBaru = String(passwordBaru == null ? '' : passwordBaru).trim();
    if (passwordBaru.length < 4) return { success: false, message: 'Password baru minimal 4 karakter.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password']);
    var data = sheet.getDataRange().getValues();
    var map = getColumnMap(sheet);
    for (var i = 1; i < data.length; i++) {
      if (strEq_(data[i][map['NIS']], nis)) {
        var storedHash = String(data[i][map['Password']] || '').trim();
        var jk = String(data[i][map['JK']]).trim().toUpperCase();
        var isP = (jk === 'P' || jk === 'PEREMPUAN');
        var pengMap = getPengaturanMap_(ss);
        var defL = String(pengMap['pass_default_l'] || PASS_DEFAULT_L).trim();
        var defP = String(pengMap['pass_default_p'] || PASS_DEFAULT_P).trim();
        if (!cekPassword_(passwordLama, storedHash, nis)) {
          return { success: false, message: 'Password lama tidak sesuai. (Default: nomor NIS Anda)' };
        }
        sheet.getRange(i + 1, map['Password'] + 1).setNumberFormat('@').setValue(hashPassword_(passwordBaru));
        return { success: true, message: 'Password berhasil diganti.' };
      }
    }
    return { success: false, message: 'Data siswa tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    lock.releaseLock();
  }
}

// Riwayat absen sholat siswa untuk hari ini (map: {Subuh:{...}, ...}).
function getRiwayatHariIni_(ss, nis) {
  var sheet = ss.getSheetByName('AbsenSholat');
  ensureSheetHeaders_(sheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return {};
  var data = sheet.getDataRange().getValues();
  var map = getColumnMap(sheet);
  var hariIni = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  var hasil = {};
  for (var i = data.length - 1; i >= 1; i--) {
    if (strEq_(data[i][map['NIS']], nis) && toTanggalStr_(data[i][map['Tanggal']]) === hariIni) {
      var sh = String(data[i][map['Sholat']]).trim();
      if (!hasil[sh]) {
        hasil[sh] = {
          jam: String(data[i][map['Jam']]).trim(),
          status: String(data[i][map['Status']]).trim(),
          keterangan: String(data[i][map['Keterangan']]).trim(),
          fotoUrl: String(data[i][map['FotoUrl']]).trim()
        };
      }
    }
  }
  return hasil;
}

// Endpoint terpisah agar frontend bisa refresh riwayat.
function getRiwayatSholat(nis) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return { success: true, riwayatHariIni: getRiwayatHariIni_(ss, sanitizeInput(nis, 30)) };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ================= REKAP ADMIN =================
// Dipanggil dari tombol Admin di aplikasi. Butuh PIN (default 1234, ubah di sheet Pengaturan).
function getRekapHariIni(pin) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var pengMap = getPengaturanMap_(ss);
    var adminPin = String(pengMap['admin_pin'] || '1234').trim();
    if (String(pin == null ? '' : pin).trim() !== adminPin) {
      return { success: false, message: 'PIN admin salah.' };
    }
    var sheet = ss.getSheetByName('AbsenSholat');
    ensureSheetHeaders_(sheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);
    var data = sheet.getDataRange().getValues();
    var map = getColumnMap(sheet);
    var hariIni = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    var list = [];
    var ringkasan = { Hadir: 0, Terlambat: 0, Halangan: 0 };
    for (var i = 1; i < data.length; i++) {
      if (!strEq_(data[i][map['Tanggal']], hariIni)) continue;
      var st = String(data[i][map['Status']]).trim();
      if (ringkasan[st] !== undefined) ringkasan[st]++;
      list.push({
        nis: String(data[i][map['NIS']]).trim(),
        nama: String(data[i][map['Nama']]).trim(),
        kelas: String(data[i][map['Kelas']]).trim(),
        sholat: String(data[i][map['Sholat']]).trim(),
        jam: String(data[i][map['Jam']]).trim(),
        status: st,
        keterangan: String(data[i][map['Keterangan']]).trim(),
        mapsLink: String(data[i][map['MapsLink']]).trim(),
        fotoUrl: String(data[i][map['FotoUrl']]).trim()
      });
    }
    list.reverse();
    return { success: true, tanggal: hariIni, total: list.length, ringkasan: ringkasan, data: list };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ================= AUTENTIKASI ADMIN =================
// Login admin (username + password). Kredensial di sheet Pengaturan (admin_user / admin_pass).
function adminLogin(user, pass) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var pengMap = getPengaturanMap_(ss);
    var u = String(pengMap['admin_user'] || 'admin').trim();
    var p = String(pengMap['admin_pass'] || 'admin123').trim();
    if (String(user == null ? '' : user).trim() !== u || String(pass == null ? '' : pass).trim() !== p) {
      return { success: false, message: 'Username atau password admin salah.' };
    }
    var token = Utilities.getUuid();
    CacheService.getScriptCache().put('admTok_' + token, '1', 21600); // berlaku 6 jam
    return { success: true, token: token, namaSekolah: pengMap['nama_sekolah'] || NAMA_SEKOLAH_DEFAULT, logoSekolah: pengMap['logo_sekolah'] || '' };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function cekAdminToken_(token) {
  if (!token) return false;
  return CacheService.getScriptCache().get('admTok_' + String(token).trim()) === '1';
}

// ================= PENGATURAN (ADMIN) =================
// Ambil pengaturan yang dapat diedit admin (password TIDAK dikirim demi keamanan).
function getPengaturan(token) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var m = getPengaturanMap_(ss);
    var out = {};
    ['nama_sekolah', 'logo_sekolah', 'lat_sekolah', 'lng_sekolah', 'radius_meter', 'wajib_dalam_radius', 'admin_user', 'judul_aplikasi', 'tema_warna', 'ukuran_logo', 'ukuran_judul', 'posisi_header', 'tata_letak_header', 'wa_token', 'wa_aktif', 'wa_interval', 'wa_max_kirim', 'wa_template_pesan', 'wa_target_mode', 'wa_target_kelas', 'wa_target_nomor', 'pesan_sukses', 'pesan_sukses_subuh', 'pesan_sukses_dhuha', 'pesan_sukses_dzuhur', 'pesan_sukses_ashar', 'pesan_sukses_maghrib', 'pesan_sukses_isya', 'pass_default_l', 'pass_default_p', 'mode_pass_default'].forEach(function (k) {
      out[k] = String(m[k] == null ? '' : m[k]).trim();
    });
    ['subuh_mulai', 'subuh_selesai', 'dhuha_mulai', 'dhuha_selesai', 'dzuhur_mulai', 'dzuhur_selesai', 'ashar_mulai', 'ashar_selesai',
      'maghrib_mulai', 'maghrib_selesai', 'isya_mulai', 'isya_selesai'].forEach(function (k) {
      out[k] = jamStr_(m[k]);
    });
    return { success: true, pengaturan: out };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Simpan pengaturan. Hanya key yang diizinkan yang diproses. Password hanya diubah bila diisi.
function simpanPengaturan(token, payload) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(8000)) return { success: false, message: 'Server sibuk, coba lagi sesaat.' };
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    payload = payload || {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Pengaturan');
    ensureSheetHeaders_(sheet, ['Parameter', 'Nilai']);

    var jamKeys = { subuh_mulai: 1, subuh_selesai: 1, dhuha_mulai: 1, dhuha_selesai: 1, dzuhur_mulai: 1, dzuhur_selesai: 1, ashar_mulai: 1, ashar_selesai: 1, maghrib_mulai: 1, maghrib_selesai: 1, isya_mulai: 1, isya_selesai: 1 };
    var allowed = ['nama_sekolah', 'logo_sekolah', 'lat_sekolah', 'lng_sekolah', 'radius_meter', 'wajib_dalam_radius', 'admin_user',
      'subuh_mulai', 'subuh_selesai', 'dhuha_mulai', 'dhuha_selesai', 'dzuhur_mulai', 'dzuhur_selesai', 'ashar_mulai', 'ashar_selesai',
      'maghrib_mulai', 'maghrib_selesai', 'isya_mulai', 'isya_selesai',
      'judul_aplikasi', 'tema_warna', 'ukuran_logo', 'ukuran_judul', 'posisi_header', 'tata_letak_header', 'wa_token', 'wa_aktif', 'wa_interval', 'wa_max_kirim', 'wa_template_pesan', 'wa_target_mode', 'wa_target_kelas', 'wa_target_nomor',
      'pesan_sukses', 'pesan_sukses_subuh', 'pesan_sukses_dhuha', 'pesan_sukses_dzuhur', 'pesan_sukses_ashar', 'pesan_sukses_maghrib', 'pesan_sukses_isya',
      'pass_default_l', 'pass_default_p', 'mode_pass_default'];

    var updates = {};
    allowed.forEach(function (k) {
      if (payload[k] === undefined || payload[k] === null) return;
      var v = String(payload[k]).trim();
      if (k === 'nama_sekolah') { if (!v) return; v = sanitizeInput(v, 120).replace(/^Aplikasi untuk Sekolah\s*/i, '').trim(); }
      if (k === 'admin_user') { if (!v) return; v = sanitizeInput(v, 60); }
      if (k === 'wajib_dalam_radius') { v = (v.toUpperCase() === 'YA') ? 'YA' : 'TIDAK'; }
      if (k === 'radius_meter') { var rn = parseFloat(v.replace(',', '.')); if (isNaN(rn) || rn < 0) return; v = String(rn); }
      if (k === 'ukuran_logo' || k === 'ukuran_judul') { var un = parseInt(v, 10); if (!isNaN(un) && un > 0) v = String(un); }
      if (k === 'posisi_header') { if (['left', 'center', 'right'].indexOf(v) === -1) v = 'center'; }
      if (k === 'tata_letak_header') { if (['stacked', 'inline'].indexOf(v) === -1) v = 'stacked'; }
      if (k === 'wa_interval') { var wi = parseInt(v, 10); if (!isNaN(wi) && wi > 0) v = String(wi); }
      if (k === 'wa_max_kirim') { var mk = parseInt(v, 10); if (!isNaN(mk) && mk >= 0) v = String(mk); else v = '2'; }
      if (k === 'wa_template_pesan') { v = sanitizeInput(v, 3000); }
      if (k === 'wa_target_mode') { if (['semua', 'kelas', 'kustom'].indexOf(v) === -1) v = 'semua'; }
      if (k === 'wa_target_kelas') { v = sanitizeInput(v, 500); }
      if (k === 'wa_target_nomor') { v = sanitizeInput(v, 5000); }
      if (k.indexOf('pesan_sukses') === 0) { v = sanitizeInput(v, 3000); }
      if (k === 'pass_default_l' || k === 'pass_default_p') { v = sanitizeInput(v, 40); }
      if (k === 'mode_pass_default') { if (['nis', 'gender', 'custom'].indexOf(v) === -1) v = 'nis'; }
      if (jamKeys[k]) { var mm = v.match(/^(\d{1,2})[:.](\d{2})$/); if (!mm) return; v = ('0' + mm[1]).slice(-2) + ':' + mm[2]; }
      updates[k] = v;
    });
    if (payload.admin_pass !== undefined && String(payload.admin_pass).trim() !== '') {
      updates['admin_pass'] = String(payload.admin_pass).trim();
    }

    // Jika interval atau wa_aktif diubah dan wa_aktif aktif, sesuaikan trigger cron
    var currentMap = getPengaturanMap_(ss);
    var targetAktif = updates['wa_aktif'] !== undefined ? updates['wa_aktif'] : currentMap['wa_aktif'];
    if (targetAktif === 'YA' && (updates['wa_interval'] || updates['wa_aktif'])) {
      var targetInterval = parseInt(updates['wa_interval'] || currentMap['wa_interval'] || 15, 10);
      try { aturTriggerCronWA_(targetInterval); } catch(ex){}
    }

    var data = sheet.getDataRange().getValues();
    var rowByKey = {};
    for (var i = 1; i < data.length; i++) { rowByKey[String(data[i][0]).trim()] = i + 1; }
    Object.keys(updates).forEach(function (k) {
      if (rowByKey[k]) {
        sheet.getRange(rowByKey[k], 2).setNumberFormat('@').setValue(updates[k]);
      } else {
        var r = sheet.getLastRow() + 1;
        sheet.getRange(r, 1).setValue(k);
        sheet.getRange(r, 2).setNumberFormat('@').setValue(updates[k]);
        rowByKey[k] = r;
      }
    });

    try {
      var cache = CacheService.getScriptCache();
      cache.remove('PENGATURAN_MAP_JSON');
      cache.remove('INFO_PUBLIK_JSON');
    } catch(eCache) {}

    return { success: true, message: 'Pengaturan berhasil disimpan.', namaSekolah: updates['nama_sekolah'] };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    lock.releaseLock();
  }
}

// ================= LAPORAN (ADMIN) =================
// Laporan kehadiran sholat per bulan. bulan format 'yyyy-MM'. Filter kelas & nis opsional.
function getLaporan(token, bulan, kelas, nis) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    bulan = sanitizeInput(bulan, 7);
    if (!/^\d{4}-\d{2}$/.test(bulan)) bulan = Utilities.formatDate(new Date(), TZ, 'yyyy-MM');
    kelas = sanitizeInput(kelas, 30);
    nis = sanitizeInput(nis, 30);

    var siswaSheet = ss.getSheetByName('Siswa');
    var sData = siswaSheet.getDataRange().getValues();
    var sMap = getColumnMap(siswaSheet);
    var siswaList = [];
    var kelasSet = {};
    for (var i = 1; i < sData.length; i++) {
      var sn = String(sData[i][sMap['NIS']]).trim();
      if (!sn) continue;
      var sk = String(sData[i][sMap['Kelas']]).trim();
      if (sk) kelasSet[sk] = true;
      if (kelas && !strEq_(sk, kelas)) continue;
      if (nis && !strEq_(sn, nis)) continue;
      siswaList.push({
        nis: sn,
        nama: String(sData[i][sMap['Nama']]).trim(),
        kelas: sk,
        jurusan: String(sData[i][sMap['Jurusan']]).trim(),
        jk: String(sData[i][sMap['JK']]).trim().toUpperCase()
      });
    }

    var aSheet = ss.getSheetByName('AbsenSholat');
    ensureSheetHeaders_(aSheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);
    var aData = aSheet.getDataRange().getValues();
    var aMap = getColumnMap(aSheet);
    var records = [];
    var ringkasan = { Hadir: 0, Terlambat: 0, Halangan: 0, total: 0 };
    for (var j = 1; j < aData.length; j++) {
      var tgl = toTanggalStr_(aData[j][aMap['Tanggal']]);
      if (tgl.indexOf(bulan) !== 0) continue;
      var rk = String(aData[j][aMap['Kelas']]).trim();
      var rn = String(aData[j][aMap['NIS']]).trim();
      if (kelas && !strEq_(rk, kelas)) continue;
      if (nis && !strEq_(rn, nis)) continue;
      var st = String(aData[j][aMap['Status']]).trim();
      if (ringkasan[st] !== undefined) ringkasan[st]++;
      ringkasan.total++;
      records.push({
        tanggal: tgl,
        nis: rn,
        nama: String(aData[j][aMap['Nama']]).trim(),
        kelas: rk,
        sholat: String(aData[j][aMap['Sholat']]).trim(),
        jam: String(aData[j][aMap['Jam']]).trim(),
        status: st,
        keterangan: String(aData[j][aMap['Keterangan']]).trim(),
        jarak: String(aData[j][aMap['Jarak']]).trim(),
        mapsLink: String(aData[j][aMap['MapsLink']]).trim(),
        fotoUrl: String(aData[j][aMap['FotoUrl']]).trim()
      });
    }
    records.sort(function (a, b) {
      if (a.tanggal !== b.tanggal) return a.tanggal < b.tanggal ? 1 : -1;
      return 0;
    });

    var parts = bulan.split('-');
    var jmlHari = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10), 0).getDate();

    return {
      success: true,
      bulan: bulan,
      jumlahHari: jmlHari,
      siswaList: siswaList,
      records: records,
      ringkasan: ringkasan,
      daftarKelas: Object.keys(kelasSet).sort(),
      sholatList: NAMA_SHOLAT
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Laporan harian: detail kehadiran 5 waktu sholat untuk satu tanggal.
function getLaporanHarian(token, tanggal, kelas) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    tanggal = sanitizeInput(tanggal, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) tanggal = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    kelas = sanitizeInput(kelas, 30);

    var siswaSheet = ss.getSheetByName('Siswa');
    var sData = siswaSheet.getDataRange().getValues();
    var sMap = getColumnMap(siswaSheet);
    var kelasSet = {};
    var roster = [];
    for (var i = 1; i < sData.length; i++) {
      var sn = String(sData[i][sMap['NIS']]).trim();
      if (!sn) continue;
      var sk = String(sData[i][sMap['Kelas']]).trim();
      if (sk) kelasSet[sk] = true;
      if (kelas && !strEq_(sk, kelas)) continue;
      roster.push({
        nis: sn,
        nama: String(sData[i][sMap['Nama']]).trim(),
        kelas: sk,
        jurusan: String(sData[i][sMap['Jurusan']]).trim(),
        jk: String(sData[i][sMap['JK']]).trim().toUpperCase()
      });
    }

    var aSheet = ss.getSheetByName('AbsenSholat');
    ensureSheetHeaders_(aSheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);
    var aData = aSheet.getDataRange().getValues();
    var aMap = getColumnMap(aSheet);
    var absenByNis = {};
    for (var j = 1; j < aData.length; j++) {
      if (toTanggalStr_(aData[j][aMap['Tanggal']]) !== tanggal) continue;
      var rn = String(aData[j][aMap['NIS']]).trim();
      var rs = String(aData[j][aMap['Sholat']]).trim();
      if (!absenByNis[rn]) absenByNis[rn] = {};
      absenByNis[rn][rs] = {
        status: String(aData[j][aMap['Status']]).trim(),
        jam: String(aData[j][aMap['Jam']]).trim(),
        keterangan: String(aData[j][aMap['Keterangan']]).trim(),
        jarak: String(aData[j][aMap['Jarak']]).trim(),
        mapsLink: String(aData[j][aMap['MapsLink']]).trim(),
        fotoUrl: String(aData[j][aMap['FotoUrl']]).trim()
      };
    }

    var ringkasan = { Hadir: 0, Terlambat: 0, Halangan: 0, Belum: 0, total: 0 };
    var perSholat = {};
    NAMA_SHOLAT.forEach(function (s) { perSholat[s] = { Hadir: 0, Terlambat: 0, Halangan: 0, Belum: 0 }; });
    var siswaList = roster.map(function (sw) {
      var detail = {};
      NAMA_SHOLAT.forEach(function (s) {
        var rec = (absenByNis[sw.nis] && absenByNis[sw.nis][s]) ? absenByNis[sw.nis][s] : null;
        var st = rec ? rec.status : 'Belum';
        if (ringkasan[st] === undefined) st = 'Hadir';
        ringkasan[st]++;
        ringkasan.total++;
        if (perSholat[s][st] === undefined) perSholat[s][st] = 0;
        perSholat[s][st]++;
        detail[s] = rec ? {
          status: rec.status, jam: rec.jam, keterangan: rec.keterangan,
          jarak: rec.jarak, mapsLink: rec.mapsLink, fotoUrl: rec.fotoUrl
        } : { status: 'Belum', jam: '', keterangan: '', jarak: '', mapsLink: '', fotoUrl: '' };
      });
      return { nis: sw.nis, nama: sw.nama, kelas: sw.kelas, jurusan: sw.jurusan, jk: sw.jk, sholat: detail };
    });

    return {
      success: true,
      tanggal: tanggal,
      sholatList: NAMA_SHOLAT,
      daftarKelas: Object.keys(kelasSet).sort(),
      siswaList: siswaList,
      ringkasan: ringkasan,
      perSholat: perSholat,
      jumlahSiswa: siswaList.length
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ================= DATA SISWA (ADMIN) =================
function getSemuaSiswa(token) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP']);
    var data = sheet.getDataRange().getValues();
    var map = getColumnMap(sheet);
    var list = [];
    for (var i = 1; i < data.length; i++) {
      var nis = String(data[i][map['NIS']]).trim();
      var nama = String(data[i][map['Nama']]).trim();
      if (!nis && !nama) continue;
      var cleanHp = formatNomorHp_(data[i][map['NoHP']]);
      list.push({
        siswaId: String(data[i][map['SiswaID']]).trim(),
        nis: nis,
        nama: nama,
        kelas: String(data[i][map['Kelas']]).trim(),
        jurusan: String(data[i][map['Jurusan']]).trim(),
        jk: String(data[i][map['JK']]).trim().toUpperCase(),
        status: String(data[i][map['Status']]).trim() || 'Aktif',
        hasPassword: !!String(data[i][map['Password']] || '').trim(),
        noHp: cleanHp,
        hp: cleanHp
      });
    }
    return { success: true, data: list, total: list.length };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function simpanSiswa(token, payload) {
  var lock = LockService.getScriptLock();
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP']);
    var map = getColumnMap(sheet);
    var nis = sanitizeInput(payload.nis, 30);
    var nama = sanitizeInput(payload.nama, 100);
    var noHp = formatNomorHp_(payload.noHp);
    if (!nis || !nama) return { success: false, message: 'NIS dan Nama wajib diisi.' };
    var kelas = sanitizeInput(payload.kelas, 30);
    var jurusan = sanitizeInput(payload.jurusan, 30);
    var jk = sanitizeInput(payload.jk, 15).toUpperCase();
    jk = (jk.charAt(0) === 'P') ? 'P' : 'L';
    var status = sanitizeInput(payload.status, 20) || 'Aktif';
    var siswaId = sanitizeInput(payload.siswaId, 30);
    var passwordBaru = String(payload.password == null ? '' : payload.password).trim();
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (strEq_(data[i][map['NIS']], nis) && !strEq_(data[i][map['SiswaID']], siswaId)) {
        return { success: false, message: 'NIS ' + nis + ' sudah digunakan siswa lain.' };
      }
    }
    if (siswaId) {
      for (var r = 1; r < data.length; r++) {
        if (strEq_(data[r][map['SiswaID']], siswaId)) {
          var rowNo = r + 1;
          sheet.getRange(rowNo, map['NIS'] + 1).setNumberFormat('@').setValue(nis);
          sheet.getRange(rowNo, map['Nama'] + 1).setValue(nama);
          sheet.getRange(rowNo, map['Kelas'] + 1).setValue(kelas);
          sheet.getRange(rowNo, map['Jurusan'] + 1).setValue(jurusan);
          sheet.getRange(rowNo, map['JK'] + 1).setValue(jk);
          sheet.getRange(rowNo, map['Status'] + 1).setValue(status);
          sheet.getRange(rowNo, map['NoHP'] + 1).setNumberFormat('@').setValue(noHp);
          if (passwordBaru) {
            if (passwordBaru.length < 4) return { success: false, message: 'Password minimal 4 karakter.' };
            sheet.getRange(rowNo, map['Password'] + 1).setNumberFormat('@').setValue(hashPassword_(passwordBaru));
          }
          invalidateDaftarSiswaCache_();
          return { success: true, message: 'Data siswa diperbarui.' };
        }
      }
      return { success: false, message: 'Data siswa tidak ditemukan.' };
    }
    var newId = 'SIS' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss');
    var pakaiPasswordIsian = passwordBaru && passwordBaru.length >= 4;
    var finalPass = pakaiPasswordIsian ? passwordBaru : nis; // Default adalah NIS siswa
    var passHash = hashPassword_(finalPass);
    var newRow = [];
    var maxCols = Math.max(sheet.getLastColumn(), 9);
    for (var c = 0; c < maxCols; c++) newRow.push('');
    newRow[map['SiswaID']] = newId;
    newRow[map['NIS']] = nis;
    newRow[map['Nama']] = nama;
    newRow[map['Kelas']] = kelas;
    newRow[map['Jurusan']] = jurusan;
    newRow[map['JK']] = jk;
    newRow[map['Status']] = status;
    newRow[map['Password']] = passHash;
    newRow[map['NoHP']] = noHp;
    sheet.appendRow(newRow);
    var lr = sheet.getLastRow();
    sheet.getRange(lr, map['NIS'] + 1).setNumberFormat('@').setValue(nis);
    sheet.getRange(lr, map['Password'] + 1).setNumberFormat('@');
    sheet.getRange(lr, map['NoHP'] + 1).setNumberFormat('@').setValue(noHp);
    var infoPass = pakaiPasswordIsian ? '(sesuai isian)' : ('NIS siswa (' + nis + ')');
    invalidateDaftarSiswaCache_();
    return { success: true, message: 'Siswa baru ditambahkan. Password default: ' + infoPass };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function hapusSiswa(token, siswaId) {
  var lock = LockService.getScriptLock();
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    var map = getColumnMap(sheet);
    var data = sheet.getDataRange().getValues();
    var id = sanitizeInput(siswaId, 30);
    for (var r = data.length - 1; r >= 1; r--) {
      if (strEq_(data[r][map['SiswaID']], id)) {
        sheet.deleteRow(r + 1);
        invalidateDaftarSiswaCache_();
        return { success: true, message: 'Siswa dihapus.' };
      }
    }
    return { success: false, message: 'Data siswa tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

// Import massal siswa. rows: [{nis, nama, kelas, jurusan, jk, hp, password}].
// opsiPassword: { mode: 'excel'|'nis'|'global', globalPassword: '...', timpaPasswordLama: true|false }
function importSiswa(token, rows, opsiPassword) {
  var lock = LockService.getScriptLock();
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    if (!rows || !rows.length) return { success: false, message: 'Tidak ada data untuk diimpor.' };
    lock.waitLock(30000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP']);
    var map = getColumnMap(sheet);
    var data = sheet.getDataRange().getValues();
    var nisRow = {};
    for (var i = 1; i < data.length; i++) {
      var n = String(data[i][map['NIS']]).trim();
      if (n) nisRow[n] = i + 1;
    }

    opsiPassword = opsiPassword || {};
    var passMode = opsiPassword.mode || 'excel'; // 'excel' | 'nis' | 'global' | 'gender'
    var globalPass = String(opsiPassword.globalPassword || '').trim();
    var passL = String(opsiPassword.passL || '').trim();
    var passP = String(opsiPassword.passP || '').trim();
    var timpaLama = !!opsiPassword.timpaPasswordLama;

    var pengMap = getPengaturanMap_(ss);
    var defL = String(pengMap['pass_default_l'] || PASS_DEFAULT_L).trim();
    var defP = String(pengMap['pass_default_p'] || PASS_DEFAULT_P).trim();
    if (!passL) passL = defL;
    if (!passP) passP = defP;

    var ringkasan = { totalBaris: rows.length, ditambah: 0, diperbarui: 0, dilewati: 0, passwordDiupdate: 0 };
    var gagal = [];
    var barisBaru = [];
    for (var k = 0; k < rows.length; k++) {
      var row = rows[k] || {};
      var nis = sanitizeInput(row.nis, 30);
      var nama = sanitizeInput(row.nama, 100);
      if (!nis || !nama) { ringkasan.dilewati++; gagal.push('Baris ' + (k + 2) + ': NIS/Nama kosong'); continue; }
      var kelas = sanitizeInput(row.kelas, 30);
      var jurusan = sanitizeInput(row.jurusan, 30);
      var jk = sanitizeInput(row.jk, 15).toUpperCase();
      jk = (jk.charAt(0) === 'P') ? 'P' : 'L';
      var hp = formatNomorHp_(row.hp || row.nohp || row.noHp || row.HP || row.hp || '');
      var rowPass = String(row.password || row.Password || row.PASSWORD || row['Password (Opsional)'] || row['Password(Opsional)'] || row['Kata Sandi'] || row.KataSandi || row.pass || row.Pass || row.katasandi || '').trim();

      // Tentukan password untuk baris ini: default adalah nomor NIS siswa
      var finalPass = nis;
      if (passMode === 'excel' && rowPass) {
        finalPass = rowPass;
      } else if (passMode === 'global' && globalPass) {
        finalPass = globalPass;
      } else if (passMode === 'gender') {
        finalPass = (jk === 'P') ? passP : passL;
      } else {
        finalPass = nis;
      }

      if (nisRow[nis]) {
        var rr = nisRow[nis];
        sheet.getRange(rr, map['Nama'] + 1).setValue(nama);
        sheet.getRange(rr, map['Kelas'] + 1).setValue(kelas);
        sheet.getRange(rr, map['Jurusan'] + 1).setValue(jurusan);
        sheet.getRange(rr, map['JK'] + 1).setValue(jk);
        if (hp) {
          sheet.getRange(rr, map['NoHP'] + 1).setNumberFormat('@').setValue(hp);
        }

        if (timpaLama) {
          sheet.getRange(rr, map['Password'] + 1).setNumberFormat('@').setValue(hashPassword_(finalPass));
          ringkasan.passwordDiupdate++;
        }
        ringkasan.diperbarui++;
      } else {
        var newId = 'SIS' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + k;
        var newRow = [];
        var maxCols = Math.max(sheet.getLastColumn(), 9);
        for (var c = 0; c < maxCols; c++) newRow.push('');
        newRow[map['SiswaID']] = newId;
        newRow[map['NIS']] = nis;
        newRow[map['Nama']] = nama;
        newRow[map['Kelas']] = kelas;
        newRow[map['Jurusan']] = jurusan;
        newRow[map['JK']] = jk;
        newRow[map['Status']] = 'Aktif';
        newRow[map['Password']] = hashPassword_(finalPass);
        newRow[map['NoHP']] = hp;
        barisBaru.push(newRow);
        nisRow[nis] = -1;
        ringkasan.ditambah++;
        ringkasan.passwordDiupdate++;
      }
    }
    if (barisBaru.length) {
      var startRow = sheet.getLastRow() + 1;
      var totalCols = barisBaru[0].length;
      sheet.getRange(startRow, 1, barisBaru.length, totalCols).setValues(barisBaru);
      sheet.getRange(startRow, map['NIS'] + 1, barisBaru.length, 1).setNumberFormat('@');
      sheet.getRange(startRow, map['Password'] + 1, barisBaru.length, 1).setNumberFormat('@');
      sheet.getRange(startRow, map['NoHP'] + 1, barisBaru.length, 1).setNumberFormat('@');
    }
    invalidateDaftarSiswaCache_();
    return { success: true, ringkasan: ringkasan, gagal: gagal };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

// Reset password siswa oleh Admin perorangan. Jika passwordBaru kosong, sistem membuat password acak 6 digit.
function resetPasswordSiswa(token, siswaId, passwordBaru) {
  var lock = LockService.getScriptLock();
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password']);
    var map = getColumnMap(sheet);
    var data = sheet.getDataRange().getValues();
    var id = sanitizeInput(siswaId, 30);
    passwordBaru = String(passwordBaru == null ? '' : passwordBaru).trim();
    if (passwordBaru && passwordBaru.length < 4) return { success: false, message: 'Password minimal 4 karakter.' };
    for (var i = 1; i < data.length; i++) {
      if (strEq_(data[i][map['SiswaID']], id)) {
        var sNis = String(data[i][map['NIS']]).trim();
        var finalPass = passwordBaru || sNis; // Default adalah nomor NIS siswa
        sheet.getRange(i + 1, map['Password'] + 1).setNumberFormat('@').setValue(hashPassword_(finalPass));
        return { success: true, message: 'Password berhasil direset ke nomor NIS: ' + finalPass, passwordBaru: finalPass, nis: sNis, nama: String(data[i][map['Nama']]).trim() };
      }
    }
    return { success: false, message: 'Data siswa tidak ditemukan.' };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

// Reset password massal / global untuk banyak siswa sekaligus (seluruh siswa, per kelas, atau per gender).
// payload: { scopeKelas: ''|'X RPL', targetGender: ''|'L'|'P', mode: 'nis'|'custom'|'random'|'gender', passwordBaru: '...', passL: '...', passP: '...', simpanSebagaiDefault: true|false }
function resetPasswordGlobal(token, payload) {
  var lock = LockService.getScriptLock();
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    lock.waitLock(15000);
    payload = payload || {};
    var scopeKelas = sanitizeInput(payload.scopeKelas, 30);
    var targetGender = sanitizeInput(payload.targetGender, 10).toUpperCase(); // '' | 'L' | 'P'
    var mode = payload.mode || 'gender'; // 'gender' | 'nis' | 'custom' | 'random'
    var customPass = String(payload.passwordBaru || '').trim();
    var passL = String(payload.passL || '').trim();
    var passP = String(payload.passP || '').trim();
    if (mode === 'custom' && customPass.length < 4) {
      return { success: false, message: 'Password serentak minimal 4 karakter.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    ensureSheetHeaders_(sheet, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP']);
    var map = getColumnMap(sheet);
    var data = sheet.getDataRange().getValues();

    var pengMap = getPengaturanMap_(ss);
    if (!passL) passL = String(pengMap['pass_default_l'] || PASS_DEFAULT_L).trim();
    if (!passP) passP = String(pengMap['pass_default_p'] || PASS_DEFAULT_P).trim();

    // Simpan ke pengaturan bila diminta
    if (payload.simpanSebagaiDefault) {
      var pengSheet = ss.getSheetByName('Pengaturan');
      var pData = pengSheet.getDataRange().getValues();
      var rowMap = {};
      for (var pi = 1; pi < pData.length; pi++) rowMap[String(pData[pi][0]).trim()] = pi + 1;
      if (passL && rowMap['pass_default_l']) pengSheet.getRange(rowMap['pass_default_l'], 2).setNumberFormat('@').setValue(passL);
      if (passP && rowMap['pass_default_p']) pengSheet.getRange(rowMap['pass_default_p'], 2).setNumberFormat('@').setValue(passP);
    }

    var hasil = [];
    var count = 0;
    var countL = 0;
    var countP = 0;

    for (var i = 1; i < data.length; i++) {
      var sId = String(data[i][map['SiswaID']]).trim();
      var nis = String(data[i][map['NIS']]).trim();
      var nama = String(data[i][map['Nama']]).trim();
      var kelas = String(data[i][map['Kelas']]).trim();
      if (!nis || !nama) continue;

      var jk = String(data[i][map['JK']]).trim().toUpperCase();
      var isPerempuan = isPerempuan_(jk);

      if (targetGender === 'L' && isPerempuan) continue;
      if (targetGender === 'P' && !isPerempuan) continue;
      if (scopeKelas && !strEq_(kelas, scopeKelas)) continue;

      var finalPass = nis;
      if (mode === 'custom') {
        finalPass = customPass;
      } else if (mode === 'gender') {
        var rawG = isPerempuan ? passP : passL;
        finalPass = (rawG && rawG.toUpperCase() !== 'NIS') ? rawG : nis;
      } else if (mode === 'random') {
        finalPass = buatPasswordAcak_();
      } else if (mode === 'nis') {
        finalPass = nis;
      }

      sheet.getRange(i + 1, map['Password'] + 1).setNumberFormat('@').setValue(hashPassword_(finalPass));
      count++;
      if (isPerempuan) countP++; else countL++;
      hasil.push({
        nis: nis,
        nama: nama,
        kelas: kelas,
        jk: isPerempuan ? 'P' : 'L',
        passwordBaru: finalPass
      });
    }

    var genderInfo = targetGender === 'L' ? ' (Khusus Laki-laki)' : (targetGender === 'P' ? ' (Khusus Perempuan)' : ' (' + countL + ' Laki-laki, ' + countP + ' Perempuan)');
    var msg = 'Berhasil mereset password untuk ' + count + ' siswa' + genderInfo + (scopeKelas ? ' di kelas ' + scopeKelas : '') + '.';
    return {
      success: true,
      total: count,
      totalL: countL,
      totalP: countP,
      targetGender: targetGender,
      scopeKelas: scopeKelas,
      mode: mode,
      message: msg,
      hasil: hasil
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

// Reset 1-klik semua siswa ke password default nomor NIS masing-masing
function resetSemuaPasswordDefaultGender(token) {
  return resetPasswordGlobal(token, {
    mode: 'nis',
    scopeKelas: '',
    targetGender: ''
  });
}

// ================= CATAT ABSEN SHOLAT =================
function catatSholat(payload) {
  try {
    payload = payload || {};
    var nis = sanitizeInput(payload.nis, 30);
    if (!nis) return { success: false, message: 'Sesi tidak valid, silakan login ulang.' };

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var siswaSheet = ss.getSheetByName('Siswa');
    var siswaData = siswaSheet.getDataRange().getValues();
    var siswaMap = getColumnMap(siswaSheet);
    var siswaRow = null;
    for (var i = 1; i < siswaData.length; i++) {
      if (strEq_(siswaData[i][siswaMap['NIS']], nis)) { siswaRow = siswaData[i]; break; }
    }
    if (!siswaRow) return { success: false, message: 'Data siswa tidak ditemukan.' };

    var nama = String(siswaRow[siswaMap['Nama']]).trim();
    var kelas = String(siswaRow[siswaMap['Kelas']]).trim();
    var jk = String(siswaRow[siswaMap['JK']]).trim().toUpperCase();
    var isPerempuan = isPerempuan_(jk);

    var sholat = sanitizeInput(payload.sholat, 20);
    if (NAMA_SHOLAT.indexOf(sholat) === -1) return { success: false, message: 'Nama sholat tidak valid.' };

    var isHalangan = payload.status === 'Halangan';
    if (isHalangan && !isPerempuan) {
      return { success: false, message: 'Pilihan Halangan hanya untuk siswi (perempuan).' };
    }

    var pengMap = getPengaturanMap_(ss);
    var now = new Date();
    var tgl = Utilities.formatDate(now, TZ, 'yyyy-MM-dd');
    var jam = Utilities.formatDate(now, TZ, 'HH:mm:ss');

    // 1. Validasi GPS di luar lock
    var lat = '-', lng = '-', jarak = '-', mapsLink = '-', fotoUrl = '-';
    var status, keterangan = '';
    var diluarRadius = false;
    if (payload.lat && payload.lng && payload.lat !== '-' && payload.lng !== '-') {
      lat = sanitizeInput(payload.lat, 50);
      lng = sanitizeInput(payload.lng, 50);
      mapsLink = 'https://www.google.com/maps?q=' + lat + ',' + lng;
      jarak = hitungJarakMeter_(lat, lng, pengMap['lat_sekolah'], pengMap['lng_sekolah']);
      var radius = parseFloat(String(pengMap['radius_meter'] || '100').replace(',', '.'));
      if (isNaN(radius) || radius <= 0) radius = 100;
      diluarRadius = (jarak !== null && jarak > radius);
      if (!isHalangan && diluarRadius && strEq_(pengMap['wajib_dalam_radius'], 'YA')) {
        return { success: false, message: 'Kamu berada ' + jarak + ' m dari sekolah (maks ' + radius + ' m). Absen ditolak.' };
      }
    } else if (!isHalangan && strEq_(pengMap['wajib_dalam_radius'], 'YA')) {
      return { success: false, message: 'Lokasi GPS belum aktif. Izinkan akses lokasi lalu coba lagi.' };
    }

    // 2. Upload Foto ke Drive di luar lock (DriveApp thread-safe, tidak memblokir antrean sheet)
    if (!payload.fotoBase64) {
      if (!isHalangan) {
        return { success: false, message: 'Foto selfie wajib disertakan. Silakan ambil foto terlebih dahulu.' };
      }
      fotoUrl = '-';
    } else {
      var fotoMatch = String(payload.fotoBase64).match(/^data:(image\/[a-zA-Z0-9\.\+-]+)(?:;[a-zA-Z0-9\.\+-=]+)*;base64,(.+)$/);
      if (!fotoMatch) {
        if (!isHalangan) {
          return { success: false, message: 'Format foto tidak valid. Ambil ulang foto selfie.' };
        }
        fotoUrl = '-';
      } else {
        try {
          var mime = fotoMatch[1];
          var b64 = fotoMatch[2];
          var ext = mime.split('/')[1] || 'jpg';
          var blob = Utilities.newBlob(Utilities.base64Decode(b64), mime, 'sholat_' + sholat + '_' + nis + '_' + now.getTime() + '.' + ext);
          var folder = getFolderFotoAbsen_();
          var file = folder.createFile(blob);
          try {
            file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (eShare) {
            console.warn('Set sharing failed: ' + eShare);
          }
          fotoUrl = 'https://drive.google.com/thumbnail?sz=w400&id=' + file.getId();
        } catch (eFoto) {
          if (!isHalangan) {
            return { success: false, message: 'Gagal menyimpan foto ke Drive: ' + eFoto.toString() };
          }
          fotoUrl = '-';
        }
      }
    }

    if (isHalangan) {
      status = 'Halangan';
      var ketH = sanitizeInput(payload.keterangan, 200);
      keterangan = ketH ? ('Berhalangan - ' + ketH) : 'Berhalangan';
    } else {
      var key = sholat.toLowerCase();
      var selesai = parseJamKeMenit_(pengMap[key + '_selesai']);
      var menitSekarang = now.getHours() * 60 + now.getMinutes();
      status = (selesai !== null && menitSekarang > selesai) ? 'Terlambat' : 'Hadir';
      keterangan = diluarRadius ? ('Di luar radius (' + jarak + ' m)') : ('Jarak ' + (jarak === null ? '-' : jarak + ' m'));
    }

    // 3. KUNCI HANYA SAAT PENULISAN SPREADSHEET (< 50ms)
    var lock = LockService.getScriptLock();
    var lockSuccess = false;
    try {
      lockSuccess = lock.tryLock(25000); // Tunggu hingga 25 detik agar tidak terjadi 'Server sibuk'
    } catch(eLock) {
      lockSuccess = false;
    }
    if (!lockSuccess) {
      return { success: false, message: 'Antrean server sedang penuh. Silakan coba klik Simpan sekali lagi.' };
    }

    try {
      var absenSheet = ss.getSheetByName('AbsenSholat');
      ensureSheetHeaders_(absenSheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);

      var absenData = absenSheet.getDataRange().getValues();
      var absenMap = getColumnMap(absenSheet);
      for (var j = 1; j < absenData.length; j++) {
        if (strEq_(absenData[j][absenMap['NIS']], nis) &&
            toTanggalStr_(absenData[j][absenMap['Tanggal']]) === tgl &&
            strEq_(absenData[j][absenMap['Sholat']], sholat)) {
          return { success: false, message: 'Kamu sudah absen ' + sholat + ' hari ini.' };
        }
      }

      var barisBaru_ = absenSheet.getLastRow() + 1;
      absenSheet.getRange(barisBaru_, 6, 1, 1).setNumberFormat('@');
      absenSheet.getRange(barisBaru_, 8, 1, 1).setNumberFormat('@');
      absenSheet.getRange(barisBaru_, 11, 1, 2).setNumberFormat('@');
      absenSheet.appendRow([
        'ABS' + now.getTime(), nis, nama, kelas, jk, tgl, sholat, jam,
        status, keterangan, lat, lng, (jarak === null ? '-' : jarak), mapsLink, fotoUrl
      ]);
    } finally {
      lock.releaseLock();
    }

    var sholatKey = 'pesan_sukses_' + String(sholat || '').toLowerCase();
    var pesanSuksesSholat = pengMap[sholatKey] || pengMap['pesan_sukses'] || '';

    return {
      success: true,
      sholat: sholat,
      status: status,
      jam: jam,
      keterangan: keterangan,
      fotoUrl: fotoUrl,
      pesanSukses: pesanSuksesSholat,
      riwayatHariIni: getRiwayatHariIni_(ss, nis)
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Tandai Halangan untuk seluruh waktu sholat hari ini yang belum diabsen (khusus siswi).
// Satu kali foto + GPS opsional berlaku untuk semua baris yang dibuat.
function catatHalanganSemua(payload) {
  try {
    payload = payload || {};
    var nis = sanitizeInput(payload.nis, 30);
    if (!nis) return { success: false, message: 'Sesi tidak valid, silakan login ulang.' };

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var siswaSheet = ss.getSheetByName('Siswa');
    var siswaData = siswaSheet.getDataRange().getValues();
    var siswaMap = getColumnMap(siswaSheet);
    var siswaRow = null;
    for (var i = 1; i < siswaData.length; i++) {
      if (strEq_(siswaData[i][siswaMap['NIS']], nis)) { siswaRow = siswaData[i]; break; }
    }
    if (!siswaRow) return { success: false, message: 'Data siswa tidak ditemukan.' };

    var nama = String(siswaRow[siswaMap['Nama']]).trim();
    var kelas = String(siswaRow[siswaMap['Kelas']]).trim();
    var jk = String(siswaRow[siswaMap['JK']]).trim().toUpperCase();
    var isPerempuan = isPerempuan_(jk);
    if (!isPerempuan) return { success: false, message: 'Menu Halangan hanya untuk siswi (perempuan).' };

    var now = new Date();
    var tgl = Utilities.formatDate(now, TZ, 'yyyy-MM-dd');
    var jam = Utilities.formatDate(now, TZ, 'HH:mm:ss');

    // 1. Simpan foto ke Drive di luar lock jika ada
    var fotoUrl = '-';
    if (payload.fotoBase64) {
      var fotoMatch = String(payload.fotoBase64).match(/^data:(image\/[a-zA-Z0-9\.\+-]+)(?:;[a-zA-Z0-9\.\+-=]+)*;base64,(.+)$/);
      if (fotoMatch) {
        try {
          var mime = fotoMatch[1];
          var b64 = fotoMatch[2];
          var ext = mime.split('/')[1] || 'jpg';
          var blob = Utilities.newBlob(Utilities.base64Decode(b64), mime, 'halangan_' + nis + '_' + now.getTime() + '.' + ext);
          var folder = getFolderFotoAbsen_();
          var file = folder.createFile(blob);
          try {
            file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (eShare) {
            console.warn('Set sharing failed: ' + eShare);
          }
          fotoUrl = 'https://drive.google.com/thumbnail?sz=w400&id=' + file.getId();
        } catch (eFoto) {
          console.warn('Gagal menyimpan foto halangan ke Drive: ' + eFoto.toString());
          fotoUrl = '-';
        }
      }
    }

    var lat = '-', lng = '-', mapsLink = '-';
    if (payload.lat && payload.lng && payload.lat !== '-' && payload.lng !== '-') {
      lat = sanitizeInput(payload.lat, 50);
      lng = sanitizeInput(payload.lng, 50);
      mapsLink = 'https://www.google.com/maps?q=' + lat + ',' + lng;
    }
    var ketH = sanitizeInput(payload.keterangan, 200);
    var keterangan = ketH ? ('Berhalangan - ' + ketH) : 'Berhalangan';

    // 2. KUNCI HANYA SAAT CEK SISA SHOLAT DAN MENULIS KE SHEET (< 50ms)
    var lock = LockService.getScriptLock();
    var lockSuccess = false;
    try {
      lockSuccess = lock.tryLock(25000);
    } catch(eLock) {
      lockSuccess = false;
    }
    if (!lockSuccess) {
      return { success: false, message: 'Antrean server sedang penuh. Silakan coba klik Simpan sekali lagi.' };
    }

    var rows = [];
    var sisaSholat = [];
    try {
      var absenSheet = ss.getSheetByName('AbsenSholat');
      ensureSheetHeaders_(absenSheet, ['AbsenID', 'NIS', 'Nama', 'Kelas', 'JK', 'Tanggal', 'Sholat', 'Jam', 'Status', 'Keterangan', 'Latitude', 'Longitude', 'Jarak', 'MapsLink', 'FotoUrl']);

      var absenData = absenSheet.getDataRange().getValues();
      var absenMap = getColumnMap(absenSheet);
      var sudahAbsen = {};
      for (var j = 1; j < absenData.length; j++) {
        if (strEq_(absenData[j][absenMap['NIS']], nis) && toTanggalStr_(absenData[j][absenMap['Tanggal']]) === tgl) {
          sudahAbsen[String(absenData[j][absenMap['Sholat']]).trim()] = true;
        }
      }
      sisaSholat = NAMA_SHOLAT.filter(function (s) { return !sudahAbsen[s]; });
      if (!sisaSholat.length) return { success: false, message: 'Semua waktu sholat hari ini sudah tercatat.' };

      rows = sisaSholat.map(function (s) {
        return ['ABS' + now.getTime() + '_' + s, nis, nama, kelas, jk, tgl, s, jam, 'Halangan', keterangan, lat, lng, '-', mapsLink, fotoUrl];
      });
      var startRow = absenSheet.getLastRow() + 1;
      absenSheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
      absenSheet.getRange(startRow, 6, rows.length, 1).setNumberFormat('@');
      absenSheet.getRange(startRow, 8, rows.length, 1).setNumberFormat('@');
      absenSheet.getRange(startRow, 11, rows.length, 2).setNumberFormat('@');
    } finally {
      lock.releaseLock();
    }

    var pengMap = getPengaturanMap_(ss);
    return {
      success: true,
      jumlah: rows.length,
      sholat: sisaSholat,
      pesanSukses: pengMap['pesan_sukses'] || '',
      riwayatHariIni: getRiwayatHariIni_(ss, nis)
    };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ================= NOTIFIKASI WHATSAPP =================
function aturTriggerCronWA_(interval) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'notifikasiSholatCron') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  interval = parseInt(interval, 10) || 15;
  if (interval === 60) {
    ScriptApp.newTrigger('notifikasiSholatCron').timeBased().everyHours(1).create();
  } else {
    var valid = [1, 5, 10, 15, 30];
    var chosen = valid.indexOf(interval) > -1 ? interval : 15;
    ScriptApp.newTrigger('notifikasiSholatCron').timeBased().everyMinutes(chosen).create();
    interval = chosen;
  }
  return interval;
}

function toggleCronWA(token, aktif, interval) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir.' };
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var pengMap = getPengaturanMap_(ss);
    var chosenInterval = interval ? parseInt(interval, 10) : (parseInt(pengMap['wa_interval'], 10) || 15);
    
    // Hapus semua trigger notifikasiSholatCron yang ada
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'notifikasiSholatCron') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    
    if (aktif) {
      chosenInterval = aturTriggerCronWA_(chosenInterval);
    }
    
    // Update setting di sheet Pengaturan
    var peng = ss.getSheetByName('Pengaturan');
    var pData = peng.getDataRange().getValues();
    var foundAktif = false, foundInterval = false;
    for (var i = 1; i < pData.length; i++) {
      var param = String(pData[i][0]).trim();
      if (param === 'wa_aktif') {
        peng.getRange(i + 1, 2).setValue(aktif ? 'YA' : 'TIDAK');
        foundAktif = true;
      } else if (param === 'wa_interval') {
        peng.getRange(i + 1, 2).setValue(String(chosenInterval));
        foundInterval = true;
      }
    }
    if (!foundAktif) peng.appendRow(['wa_aktif', aktif ? 'YA' : 'TIDAK']);
    if (!foundInterval) peng.appendRow(['wa_interval', String(chosenInterval)]);
    
    return {
      success: true,
      message: aktif ? ('Pengingat WA diaktifkan (Cron jalan setiap ' + chosenInterval + ' menit).') : 'Pengingat WA dimatikan.',
      interval: chosenInterval
    };
  } catch (e) {
    return { success: false, message: 'Gagal mengatur cron: ' + e.toString() + ' (Mungkin butuh otorisasi ulang)' };
  }
}

function notifikasiSholatCron() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var peng = getPengaturanMap_(ss);
    if (peng['wa_aktif'] !== 'YA' || !peng['wa_token']) return; // WA tidak aktif atau token kosong

    var now = new Date();
    var menit = now.getHours() * 60 + now.getMinutes();

    // Cari semua sholat wajib yang sedang dalam jendela waktu aktif
    // (Dhuha sunnah dikecualikan dari notifikasi WhatsApp otomatis)
    var waSholatList = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
    var activeSholats = [];
    for (var ws = 0; ws < waSholatList.length; ws++) {
      var sName = waSholatList[ws];
      var k = sName.toLowerCase();
      var m = parseJamKeMenit_(peng[k + '_mulai']);
      var s = parseJamKeMenit_(peng[k + '_selesai']);
      if (m !== null && s !== null) {
        var inWindow = (m <= s) ? (menit >= m && menit <= s) : (menit >= m || menit <= s);
        if (inWindow) activeSholats.push(sName);
      }
    }

    if (activeSholats.length === 0) return; // Tidak ada jadwal sholat WA yang aktif saat ini

    var maxKirim = parseInt(peng['wa_max_kirim'] != null && peng['wa_max_kirim'] !== '' ? peng['wa_max_kirim'] : '2', 10);
    var targetMode = peng['wa_target_mode'] || 'semua';
    var targetKelas = (peng['wa_target_kelas'] || '').split(',').map(function(s){ return s.trim().toUpperCase(); }).filter(Boolean);
    var targetNomorRaw = (peng['wa_target_nomor'] || '').split(/[\n,;]+/).map(function(s){ return s.trim(); }).filter(Boolean);

    // Ambil data siswa
    var sheetSiswa = ss.getSheetByName('Siswa');
    var sData = sheetSiswa.getDataRange().getValues();
    var sMap = getColumnMap(sheetSiswa);
    var roster = [];

    for (var i = 1; i < sData.length; i++) {
      var st = String(sData[i][sMap['Status']]).trim();
      var hp = String(sData[i][sMap['NoHP']] || '').trim();
      var nis = String(sData[i][sMap['NIS']]).trim();
      var nama = String(sData[i][sMap['Nama']]).trim();
      var kls = String(sData[i][sMap['Kelas']]).trim();

      if (st !== 'Aktif' || !hp || hp.length < 9) continue;

      // Filter Target Penerima
      if (targetMode === 'kelas') {
        if (targetKelas.length > 0 && targetKelas.indexOf(kls.toUpperCase()) === -1) {
          continue;
        }
      } else if (targetMode === 'kustom') {
        var cleanHp = hp.replace(/\D/g, '');
        var matched = false;
        for (var k = 0; k < targetNomorRaw.length; k++) {
          var tn = targetNomorRaw[k].replace(/\D/g, '');
          if (targetNomorRaw[k] === nis || cleanHp === tn || (tn.length >= 8 && cleanHp.indexOf(tn) !== -1)) {
            matched = true;
            break;
          }
        }
        if (!matched) continue;
      }

      roster.push({
        nis: nis,
        nama: nama,
        kelas: kls,
        hp: hp
      });
    }

    if (roster.length === 0) return;

    // Ambil data absen hari ini
    var tgl = Utilities.formatDate(now, TZ, 'yyyy-MM-dd');
    var aSheet = ss.getSheetByName('AbsenSholat');
    var aData = aSheet.getDataRange().getValues();
    var aMap = getColumnMap(aSheet);

    // Sheet Log Notifikasi WA untuk membatasi pengulangan
    var logSheet = ss.getSheetByName('LogNotifWA');
    if (!logSheet) {
      logSheet = ss.insertSheet('LogNotifWA');
      logSheet.appendRow(['Tanggal', 'Sholat', 'NIS', 'Nama', 'NoHP', 'KirimKe', 'WaktuKirim', 'Status']);
    }
    var logData = logSheet.getDataRange().getValues();

    var templatePesan = peng['wa_template_pesan'] || '';
    if (!templatePesan.trim()) {
      templatePesan = "Assalamu'alaikum *{nama}*,\n\n" +
                      "Waktu sholat *{sholat}* sedang berlangsung.\n" +
                      "Segera laksanakan sholat dan lakukan absen di aplikasi {sekolah}.\n\n" +
                      "_(Pesan otomatis pengingat ibadah)_";
    }

    var namaSekolah = peng['nama_sekolah'] || NAMA_SEKOLAH_DEFAULT;
    var jamSekarang = Utilities.formatDate(now, TZ, 'HH:mm');

    // Kirim notifikasi untuk masing-masing waktu sholat yang sedang aktif
    for (var act = 0; act < activeSholats.length; act++) {
      var currentSholat = activeSholats[act];

      var sudahAbsen = {};
      for (var j = 1; j < aData.length; j++) {
        if (toTanggalStr_(aData[j][aMap['Tanggal']]) === tgl) {
          var rn = String(aData[j][aMap['NIS']]).trim();
          var rs = String(aData[j][aMap['Sholat']]).trim();
          if (rs === currentSholat) {
            sudahAbsen[rn] = true;
          }
        }
      }

      var kirimCount = {};
      for (var l = 1; l < logData.length; l++) {
        var lTgl = toTanggalStr_(logData[l][0]);
        var lSholat = String(logData[l][1]).trim();
        var lNis = String(logData[l][2]).trim();
        if (lTgl === tgl && lSholat === currentSholat) {
          kirimCount[lNis] = (kirimCount[lNis] || 0) + 1;
        }
      }

      var targetList = [];
      var logRowsToAdd = [];

      for (var i = 0; i < roster.length; i++) {
        var s = roster[i];
        if (sudahAbsen[s.nis]) continue; // Sudah absen

        var prevSent = kirimCount[s.nis] || 0;
        if (maxKirim > 0 && prevSent >= maxKirim) {
          continue; // Sudah mencapai batas pengulangan untuk sholat ini
        }

        var kirimKe = prevSent + 1;
        var msg = templatePesan
          .replace(/\{nama\}/gi, s.nama)
          .replace(/\{nis\}/gi, s.nis)
          .replace(/\{kelas\}/gi, s.kelas)
          .replace(/\{sholat\}/gi, currentSholat)
          .replace(/\{sekolah\}/gi, namaSekolah)
          .replace(/\{jam\}/gi, jamSekarang)
          .replace(/\{ke\}/gi, String(kirimKe))
          .replace(/\{kirim_ke\}/gi, String(kirimKe));

        targetList.push({ target: s.hp, message: msg });
        logRowsToAdd.push([tgl, currentSholat, s.nis, s.nama, s.hp, kirimKe, jamSekarang + ' WIB', 'Terkirim']);
      }

      if (targetList.length > 0) {
        kirimNotifikasiFonnte(peng['wa_token'], targetList);
        for (var r = 0; r < logRowsToAdd.length; r++) {
          logSheet.appendRow(logRowsToAdd[r]);
        }
      }
    }
  } catch (e) {
    console.error("Error Cron WA: " + e.toString());
  }
}

function testKirimWA(token, noHp, pesan) {
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var peng = getPengaturanMap_(ss);
    var waToken = peng['wa_token'];
    if (!waToken) return { success: false, message: 'Token API Fonnte belum diisi di Pengaturan.' };
    noHp = String(noHp || '').trim();
    if (!noHp) return { success: false, message: 'Nomor WhatsApp tujuan wajib diisi.' };

    var finalMsg = pesan || peng['wa_template_pesan'] || '';
    if (!finalMsg.trim()) {
      finalMsg = "Assalamu'alaikum *{nama}*,\n\nIni adalah pesan uji coba integrasi WhatsApp dari sistem {sekolah}.\nStatus: Berhasil Terhubung! ✅";
    }
    finalMsg = finalMsg
      .replace(/\{nama\}/gi, 'Siswa Percobaan')
      .replace(/\{nis\}/gi, '12345')
      .replace(/\{kelas\}/gi, 'X RPL')
      .replace(/\{sholat\}/gi, 'Dzuhur')
      .replace(/\{sekolah\}/gi, peng['nama_sekolah'] || NAMA_SEKOLAH_DEFAULT)
      .replace(/\{jam\}/gi, Utilities.formatDate(new Date(), TZ, 'HH:mm'))
      .replace(/\{ke\}/gi, '1')
      .replace(/\{kirim_ke\}/gi, '1');

    var options = {
      method: 'post',
      headers: { 'Authorization': waToken },
      payload: {
        target: noHp,
        message: finalMsg
      },
      muteHttpExceptions: true
    };
    var res = UrlFetchApp.fetch('https://api.fonnte.com/send', options);
    var respText = res.getContentText();
    var parsed = {};
    try { parsed = JSON.parse(respText); } catch(ex){}
    if (parsed.status === true || (parsed.target && parsed.target.length)) {
      return { success: true, message: 'Pesan uji coba berhasil terkirim ke ' + noHp, detail: parsed };
    } else {
      return { success: false, message: 'Fonnte merespons: ' + (parsed.reason || respText), detail: parsed };
    }
  } catch(err) {
    return { success: false, message: 'Gagal mengirim pesan uji coba: ' + err.toString() };
  }
}

function kirimNotifikasiFonnte(token, targetList) {
  try {
    // Fonnte accepts individual or bulk send.
    for (var i = 0; i < targetList.length; i++) {
      var options = {
        method: 'post',
        headers: { 'Authorization': token },
        payload: {
          target: targetList[i].target,
          message: targetList[i].message
        },
        muteHttpExceptions: true
      };
      UrlFetchApp.fetch('https://api.fonnte.com/send', options);
    }
  } catch (e) {
    console.error("Fonnte error: " + e.toString());
  }
}

// ================= SINKRONISASI DATA SISWA, NOMOR HP, & PENGATURAN =================
function sinkronkanDataDanNoHp(token) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return { success: false, message: 'Server sedang sibuk, silakan coba beberapa saat lagi.' };
  try {
    if (!cekAdminToken_(token)) return { success: false, message: 'Sesi admin berakhir. Silakan login ulang.' };
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Pastikan Sheet Pengaturan ada dan semua parameter terdaftar
    var pengSheet = ss.getSheetByName('Pengaturan');
    if (!pengSheet) {
      pengSheet = ss.insertSheet('Pengaturan');
      pengSheet.appendRow(['Parameter', 'Nilai']);
    } else {
      ensureSheetHeaders_(pengSheet, ['Parameter', 'Nilai']);
    }
    var pengMap = getPengaturanMap_(ss);

    // 2. Pastikan Sheet Siswa ada
    var sheetSiswa = ss.getSheetByName('Siswa');
    if (!sheetSiswa) {
      return { success: false, message: 'Sheet Siswa tidak ditemukan dalam Spreadsheet.' };
    }

    // Pastikan header Siswa aman & tidak tertimpa salah urutan
    ensureSheetHeaders_(sheetSiswa, ['SiswaID', 'NIS', 'Nama', 'Kelas', 'Jurusan', 'JK', 'Status', 'Password', 'NoHP']);
    var map = getColumnMap(sheetSiswa);
    var data = sheetSiswa.getDataRange().getValues();

    // 3. Kumpulkan nomor HP cadangan/historis dari LogNotifWA jika ada siswa yang no HP-nya kosong
    var noHpHistoris = {};
    var logSheet = ss.getSheetByName('LogNotifWA');
    if (logSheet) {
      var lData = logSheet.getDataRange().getValues();
      var lMap = getColumnMap(logSheet);
      if (lMap['NIS'] !== undefined && lMap['NoHP'] !== undefined) {
        for (var m = 1; m < lData.length; m++) {
          var lNis = String(lData[m][lMap['NIS']]).trim();
          var lHp = formatNomorHp_(lData[m][lMap['NoHP']]);
          if (lNis && lHp && lHp.length >= 9 && !noHpHistoris[lNis]) {
            noHpHistoris[lNis] = lHp;
          }
        }
      }
    }

    // 4. Deteksi apakah ada kolom alternatif di Siswa yang menyimpan nomor HP
    // (misal user punya kolom "No WA", "WhatsApp", "HP", atau kolom lain dengan angka HP)
    var headers = sheetSiswa.getRange(1, 1, 1, sheetSiswa.getLastColumn()).getValues()[0];
    var altHpCols = [];
    for (var c = 0; c < headers.length; c++) {
      if (c === map['NoHP']) continue;
      var hName = String(headers[c] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (['nohp', 'hp', 'nowa', 'wa', 'whatsapp', 'telepon', 'telp', 'notelp', 'kontak', 'nohandphone', 'handphone'].indexOf(hName) !== -1) {
        altHpCols.push(c);
      }
    }

    var totalSiswa = 0;
    var totalBerHp = 0;
    var diperbaruiCount = 0;
    var listSiswa = [];
    var targetColNoHp = map['NoHP'] + 1;

    for (var i = 1; i < data.length; i++) {
      var nis = String(data[i][map['NIS']]).trim();
      var nama = String(data[i][map['Nama']]).trim();
      if (!nis && !nama) continue;
      totalSiswa++;

      var rowIdx = i + 1;
      var rawHp = data[i][map['NoHP']];
      var cleanHp = formatNomorHp_(rawHp);

      // Jika NoHP di kolom utama kosong, coba cari dari kolom alternatif di baris yang sama
      if ((!cleanHp || cleanHp.length < 9) && altHpCols.length > 0) {
        for (var ac = 0; ac < altHpCols.length; ac++) {
          var testAlt = formatNomorHp_(data[i][altHpCols[ac]]);
          if (testAlt && testAlt.length >= 9) {
            cleanHp = testAlt;
            break;
          }
        }
      }

      // Jika masih kosong, cari apakah ada di log notifikasi sebelumnya
      if ((!cleanHp || cleanHp.length < 9) && noHpHistoris[nis]) {
        cleanHp = noHpHistoris[nis];
      }

      // Jika ada nomor HP yang diformat atau baru ditemukan, tulis kembali ke kolom NoHP sheet Siswa
      if (cleanHp) {
        totalBerHp++;
        if (String(rawHp).trim() !== cleanHp) {
          sheetSiswa.getRange(rowIdx, targetColNoHp).setNumberFormat('@').setValue(cleanHp);
          diperbaruiCount++;
        }
      }

      listSiswa.push({
        siswaId: String(data[i][map['SiswaID']]).trim(),
        nis: nis,
        nama: nama,
        kelas: String(data[i][map['Kelas']]).trim(),
        jurusan: String(data[i][map['Jurusan']]).trim(),
        jk: String(data[i][map['JK']]).trim().toUpperCase(),
        status: String(data[i][map['Status']]).trim() || 'Aktif',
        hasPassword: !!String(data[i][map['Password']] || '').trim(),
        noHp: cleanHp,
        hp: cleanHp
      });
    }

    // Pastikan seluruh kolom NoHP memiliki format teks '@' agar leading zero '08...' tidak hilang
    if (sheetSiswa.getLastRow() > 1) {
      sheetSiswa.getRange(2, targetColNoHp, sheetSiswa.getLastRow() - 1, 1).setNumberFormat('@');
      sheetSiswa.getRange(2, map['NIS'] + 1, sheetSiswa.getLastRow() - 1, 1).setNumberFormat('@');
    }

    return {
      success: true,
      message: 'Sinkronisasi berhasil! ' + totalSiswa + ' siswa terverifikasi (' + totalBerHp + ' memiliki No HP). ' + (diperbaruiCount > 0 ? diperbaruiCount + ' nomor HP disinkronkan & diperbaiki formatnya.' : 'Semua nomor HP sudah sinkron.'),
      totalSiswa: totalSiswa,
      totalBerHp: totalBerHp,
      diperbaruiCount: diperbaruiCount,
      dataSiswa: listSiswa,
      pengaturan: pengMap
    };
  } catch (err) {
    return { success: false, message: 'Gagal sinkronisasi data: ' + err.toString() };
  } finally {
    try { lock.releaseLock(); } catch(e){}
  }
}