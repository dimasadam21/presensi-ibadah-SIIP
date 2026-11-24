/**
 * TAHSIN & TILAWAH Al-Qur\'an MODULE - SI IPIN
 * Sistem Informasi Ibadah Pelajar (SIIP)
 * Terintegrasi penuh dengan Presensi Ibadah Pelajar
 */

(function () {
  'use strict';

  // 1. DATA MATERI TAHSIN RESMI SI IPIN (15 MATERI LENGKAP & MANDIRI)
  var DEFAULT_TAHSIN_MATERI = [
    // --- LEVEL DASAR ---
    {
      id: 'mvgt4kms91qf',
      level: 'Dasar',
      judul: 'Mulai Belajar Huruf Hijaiyyah Bersambung',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Panduan Praktis Mengenal Huruf Hijaiyyah:\n• Huruf Hijaiyyah berjumlah 28 huruf utama.\n• Terdapat 6 huruf yang TIDAK BISA disambung dengan huruf setelahnya: Alif (ا), Dal (د), Dzal (ذ), Ra (ر), Zai (ز), dan Wawu (و).\n• Huruf lainnya memiliki bentuk di awal, di tengah, dan di akhir kata.\n• Perhatikan letak titik dan lengkungan agar tidak tertukar antara Ba (ب), Ta (ت), Tsa (ث), Nun (ن), dan Ya (ي).'
    },
    {
      id: 'mvt1brm9qjda',
      level: 'Dasar',
      judul: 'Huruf Hijaiyyah Berbaris Atas (Fathah)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvt1brm9qjda.jpg',
      isi: 'Harakat Fathah (ـَ) melambangkan vokal "A". Pelajari bagaimana bunyi setiap huruf hijaiyyah saat diberi baris fathah dengan membuka rongga mulut secukupnya secara fasih dan jelas.'
    },
    {
      id: 'mvt1qhkl0dr7',
      level: 'Dasar',
      judul: 'Huruf Hijaiyyah Berbaris Bawah (Kasroh)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvt1qhkl0dr7.jpg',
      isi: 'Harakat Kasrah (ـِ) melambangkan vokal "I". Perhatikan posisi bibir yang ditarik ke bawah saat melafalkan huruf hijaiyyah berbaris kasrah agar makhraj dan suaranya tepat tidak miring.'
    },
    {
      id: 'mvt23v38uqba',
      level: 'Dasar',
      judul: 'Huruf Hijaiyyah Berbaris Depan (Dhamma)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvt23v38uqba.jpg',
      isi: 'Harakat Dhammah (ـُ) melambangkan vokal "U". Perhatikan posisi kedua bibir yang dimonyongkan (membuat bulatan sempurna) saat melafalkan huruf berbaris dhammah.'
    },
    {
      id: 'mvtpelt91w5d',
      level: 'Dasar',
      judul: 'Rumus Kilat Memahami Harakat Dasar',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Rumus Kilat 3 Harakat Pokok:\n1. Fathah (ـَ): Garis miring di atas huruf, berbunyi vokal "A" dengan membuka mulut wajar (contoh: دَ = Da).\n2. Kasrah (ـِ): Garis miring di bawah huruf, berbunyi vokal "I" dengan menurunkan bibir bawah (contoh: دِ = Di).\n3. Dhammah (ـُ): Tanda seperti koma/wawu kecil di atas huruf, berbunyi vokal "U" dengan membulatkan kedua bibir (contoh: دُ = Du).'
    },
    {
      id: 'mvtqgexijn94',
      level: 'Dasar',
      judul: 'Huruf Hijaiyyah Berbaris Tanwin (Bagian 1)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvtqgexijn94.jpg',
      isi: 'Mengenal tanda baca Tanwin: Fathatain (-an), Kasratain (-in), dan Dhammatain (-un) serta cara pelafalannya dengan nun sukun di akhir bunyi kata.'
    },
    {
      id: 'mvtqsc06hmj2',
      level: 'Dasar',
      judul: 'Praktik Membaca Baris Tanwin & Kaidah Waqaf',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Kaidah Baris Tanwin (Bunyi "N" di akhir kata):\n• Fathatain (ـً): Menghasilkan bunyi "AN" (contoh: كِتَابًا = Kitāban). Biasanya didampingi huruf alif di akhir.\n• Kasratain (ـٍ): Menghasilkan bunyi "IN" (contoh: كِتَابٍ = Kitābin).\n• Dhammatain (ـٌ): Menghasilkan bunyi "UN" (contoh: كِتَابٌ = Kitābun).\n• PENTING: Jika berhenti (waqaf) pada fathatain, bunyinya berubah menjadi mad 2 harakat (Kitābā), bukan "an".'
    },
    {
      id: 'mvtriiymnjlh',
      level: 'Dasar',
      judul: 'Huruf Hijaiyyah Berbaris Sukun dan Tasydid',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvtriiymnjlh.jpg',
      isi: 'Panduan lengkap membaca huruf mati (Sukun ـْ) dan huruf bertekanan ganda (Tasydid/Syaddah ـّ) beserta contoh penerapannya dalam ayat suci Al-Qur\'an.'
    },

    // --- LEVEL MENENGAH ---
    {
      id: 'mvj8anwjk3p9',
      level: 'Menengah',
      judul: 'Hukum Mad Thabi\'i (Mad Asli 2 Harakat)',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Kaidah Membaca Mad Thabi\'i (Panjang 2 Harakat / 1 Alif):\n1. Huruf Alif (ا) didahului harakat Fathah (ـَ). Contoh: قَالَ (Qōla).\n2. Huruf Ya Sukun (يْ) didahului harakat Kasrah (ـِ). Contoh: قِيْلَ (Qīla).\n3. Huruf Wawu Sukun (وْ) didahului harakat Dhammah (ـُ). Contoh: يَقُوْلُ (Yaqūlu).\n\nKetukan mad harus stabil: tepat 2 hitungan, tidak boleh kurang (terbaca pendek) dan tidak boleh berlebih.'
    },
    {
      id: 'mvi4imdg783v',
      level: 'Menengah',
      judul: 'Bacaan Huruf Hijaiyyah dibaca panjang / Mad (Alif Mad)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvi4imdg783v.jpg',
      isi: 'Bagan dan contoh pelafalan Alif Mad setelah harakat fathah. Pastikan durasi pemanjangan stabil tepat 2 ketukan.'
    },
    {
      id: 'mvi4pgbvbmfi',
      level: 'Menengah',
      judul: 'Bacaan Huruf Hijaiyyah dibaca panjang / Mad (Ya Mad)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvi4pgbvbmfi.jpg',
      isi: 'Bagan dan contoh pelafalan Ya Mad (يْ) sesudah harakat kasrah. Pelajari posisi rongga mulut agar suara mad terdengar jernih dan fasih.'
    },
    {
      id: 'mvi4rgfag5b2',
      level: 'Menengah',
      judul: 'Bacaan Huruf Hijaiyyah dibaca panjang / Mad (Waw Mad)',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvi4rgfag5b2.jpg',
      isi: 'Bagan dan contoh pelafalan Waw Mad (وْ) sesudah harakat dhammah. Perhatikan posisi bibir saat memanjangkan suara.'
    },
    {
      id: 'mvj8epo1hj51',
      level: 'Menengah',
      judul: 'Praktik Mad Thabi\'i dalam Kata Al-Qur\'an',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Contoh Praktik Pemanjangan Suara 2 Harakat:\n• نوحيها (Nū-hī-hā): Menggabungkan ketiga huruf mad sekaligus (Waw mad, Ya mad, dan Alif mad).\n• الرحيم (Ar-Rahīm): Ya sukun setelah kasrah.\n• الصابرين (Ash-Shōbirīn): Alif setelah shad dan Ya sukun setelah ra.\n\nTips SI IPIN: Latih ayunan suara dengan ketukan jari yang rata dan teratur.'
    },
    {
      id: 'mvj8gxgahdnb',
      level: 'Menengah',
      judul: 'Kaidah Menjaga Konsistensi Panjang Mad',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Cara Menjaga Ketukan Mad:\n• Hindari membaca terlalu terburu-buru yang menyebabkan huruf mad terpotong.\n• Hindari menyeret suara mad melebihi 2 harakat pada mad thabi\'i.\n• Pastikan aliran nafas lembut dan rongga mulut terbuka secara proporsional sesuai makhraj huruf.'
    },
    {
      id: 'mvj8i55dx35x',
      level: 'Menengah',
      judul: 'Hukum Nun Sukun dan Tanwin Lengkap',
      kategori: "Al-Qur\'an",
      tipe: 'Gambar',
      url: '',
      localImg: 'assets/tahsin/tahsin_mvj8i55dx35x.jpg',
      isi: 'Infografis master tajwid: 1. Izhar Halqi (jelas), 2. Idgham Bighunnah (dengung), 3. Idgham Bilaghunnah (tanpa dengung), 4. Iqlab (menukar jadi mim), 5. Ikhfa Haqiqi (samar dengung).'
    },

    // --- LEVEL LANJUTAN ---
    {
      id: 'lanjutan_makharij_1',
      level: 'Lanjutan',
      judul: 'Makharijul Huruf: 5 Tempat Utama Keluarnya Huruf',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Makhraj huruf terbagi menjadi 5 tempat utama:\n1. Al-Jauf (Rongga Mulut & Tenggorokan): Tempat keluarnya huruf-huruf Mad (Alif, Waw, Ya).\n2. Al-Halq (Tenggorokan): Pangkal (ء, هـ), Tengah (ع, ح), Ujung (غ, خ).\n3. Al-Lisan (Lidah): Terbagi menjadi pangkal lidah (ق, ك), tengah lidah (ج, ش, ي), tepi lidah (ض), ujung lidah (ل, ن, ر, ط, د, ت, ص, ز, س, ظ, ذ, ث).\n4. Asy-Syafatain (Dua Bibir): Bibir bawah dengan ujung gigi atas (ف), kedua bibir bersama (ب, م, و).\n5. Al-Khaisyum (Pangkal Hidung): Tempat keluarnya suara dengung (Ghunnah).'
    },
    {
      id: 'lanjutan_sifat_huruf',
      level: 'Lanjutan',
      judul: 'Sifat-Sifat Huruf Hijaiyyah yang Berlawanan & Tunggal',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Sifat huruf terbagi menjadi dua:\n1. Sifat Berpasangan: Hams (nafas berhembus: فحثه شخص سكت) vs Jahr (nafas tertahan); Syiddah (suara tertahan: أجد قط بكت) vs Rakhawah (suara terlepas) vs Bainiyyah (pertengahan: لن عمر); Isti\'la (pangkal lidah terangkat: خص ضغط قظ) vs Istifal (lidah turun); Ithbaq (menempel langit-langit: ص, ض, ط, ظ) vs Infitah.\n2. Sifat Tidak Berpasangan: Shafir (suara desis: ص, ز, س), Qalqalah (pantulan: قطب جد), Layyin (lembut: و, ي), Inhiraf (condong: ل, ر), Takrir (bergetar: ر), Tafasysyi (angin menyebar: ش), Istithalah (memanjang: ض).'
    },
    {
      id: 'lanjutan_mim_sukun',
      level: 'Lanjutan',
      judul: 'Hukum Mim Sukun (مْ) & Lam Ta\'rif',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Hukum Mim Sukun (مْ) memiliki 3 aturan:\n1. Ikhfa Syafawi: Mim sukun bertemu Ba (ب), dibaca samar dengan dengung 2 harakat.\n2. Idgham Mimi (Mutamatsilain): Mim sukun bertemu sesama Mim (م), dibaca melebur disertai dengung 2 harakat.\n3. Izhar Syafawi: Mim sukun bertemu 26 huruf hijaiyyah selain Mim dan Ba, dibaca jelas di bibir tanpa dengung.\n\nHukum Alif Lam Ta\'rif (ال):\n- Al-Qamariyah (Izhar Qamari): Dibaca jelas jika bertemu 14 huruf (ابغ حجك وخف عقيمه).\n- Asy-Syamsiyah (Idgham Syamsi): Dibaca melebur ke huruf berikutnya bertasydid.'
    },
    {
      id: 'lanjutan_waqaf_ibtida',
      level: 'Lanjutan',
      judul: 'Waqaf, Ibtida\' & Tanda Baca Perhentian Al-Qur\'an',
      kategori: "Al-Qur\'an",
      tipe: 'Teks',
      url: '',
      localImg: '',
      isi: 'Kaidah Berhenti (Waqaf) dan Memulai Kembali (Ibtida\'):\n- Tanda (م): Waqaf Lazim (Harus berhenti).\n- Tanda (لا): Waqaf Mamnu\' (Dilarang berhenti di tengah makna).\n- Tanda (ج): Waqaf Jaiz (Boleh berhenti, boleh lanjut).\n- Tanda (صلى): Al-Washlu Aula (Lebih utama lanjut terus).\n- Tanda (قلى): Al-Waqfu Aula (Lebih utama berhenti).\n- Tanda (∴ ∴): Waqaf Mua\'naqah (Berhenti di salah satu dari dua titik bertiga, tidak boleh berhenti di keduanya).'
    }
  ];

  // 2. DAFTAR 5 GAME EDUKASI SI IPIN
  var TAHSIN_GAMES_INFO = [
    {
      id: 'mv9mjw4l6x6f',
      judul: 'Petualangan SI IPIN',
      ikon: '🤖',
      level: 'Semua',
      deskripsi: 'Uji kemampuan baca tulis Al-Qur\'an dan tajwid bersama maskot SI IPIN interaktif.'
    },
    {
      id: 'mvby0olsh0ha',
      judul: 'BALAP TAJWID',
      ikon: '🏎️',
      level: 'Semua',
      deskripsi: 'Game balap drag cepat! Jawab hukum tajwid dengan benar dan cepat untuk memacu laju mobil ke garis finish.'
    },
    {
      id: 'mvf6way1i58a',
      judul: 'LABIRIN TAJWID',
      ikon: '🌀',
      level: 'Semua',
      deskripsi: 'Jelajahi labirin teka-teki tajwid bersama SI IPIN, hindari jalan buntu dan kumpulkan bintang pemahaman.'
    },
    {
      id: 'mvgtzmwv03ic',
      judul: 'Petualangan Hijaiyyah',
      ikon: '🎧',
      level: 'Dasar',
      deskripsi: 'Belajar menyimak bacaan audio huruf dasar hijaiyyah dan tebak huruf yang bersuara dengan tepat.'
    },
    {
      id: 'mvi5wpkj2w8h',
      judul: 'Puzzle Huruf Hijaiyyah',
      ikon: '🧩',
      level: 'Dasar',
      deskripsi: 'Mencocokkan pelafalan suara, harakat, dan bentuk huruf hijaiyyah dalam puzzle interaktif.'
    }
  ];

  // 3. STORAGE KEY & STATE
  var STORAGE_KEY_TAHSIN = 'SIIP_TAHSIN_DATA_V2';
  var TAHSIN_STATE = {
    activeTab: 'Dasar',
    materi: DEFAULT_TAHSIN_MATERI,
    completedIds: {},
    studentLevel: 'Dasar',
    studentProgres: 0
  };

  // 4. PERSISTENCE HELPERS
  function loadTahsinState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_TAHSIN);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed.completedIds) TAHSIN_STATE.completedIds = parsed.completedIds;
        if (parsed.studentLevel) TAHSIN_STATE.studentLevel = parsed.studentLevel;
        if (Array.isArray(parsed.customMateri) && parsed.customMateri.length > 0) {
          var map = {};
          DEFAULT_TAHSIN_MATERI.forEach(function (m) { map[m.id] = m; });
          parsed.customMateri.forEach(function (m) { map[m.id] = m; });
          var merged = [];
          Object.keys(map).forEach(function (k) { merged.push(map[k]); });
          TAHSIN_STATE.materi = merged;
        }
      }
    } catch (e) {
      console.warn('Gagal memuat Tahsin state:', e);
    }
    syncWithCurrentStudent();
  }

  function saveTahsinState() {
    try {
      var toSave = {
        completedIds: TAHSIN_STATE.completedIds,
        studentLevel: TAHSIN_STATE.studentLevel,
        customMateri: TAHSIN_STATE.materi
      };
      localStorage.setItem(STORAGE_KEY_TAHSIN, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Gagal menyimpan Tahsin state:', e);
    }
  }

  function getStudentNisKey() {
    if (window.SISWA && window.SISWA.nis) return String(window.SISWA.nis);
    if (window.ME && window.ME.nis) return String(window.ME.nis);
    return 'GUEST';
  }

  function syncWithCurrentStudent() {
    var nis = getStudentNisKey();
    if (!TAHSIN_STATE.completedIds[nis]) {
      TAHSIN_STATE.completedIds[nis] = [];
    }
    if (window.SISWA && window.SISWA.tahsin_level) {
      TAHSIN_STATE.studentLevel = window.SISWA.tahsin_level;
    }
    recalculateProgress();
  }

  function recalculateProgress() {
    var nis = getStudentNisKey();
    var list = TAHSIN_STATE.completedIds[nis] || [];
    var totalMateri = TAHSIN_STATE.materi.length;
    if (totalMateri === 0) {
      TAHSIN_STATE.studentProgres = 0;
      return;
    }
    var doneCount = 0;
    TAHSIN_STATE.materi.forEach(function (m) {
      if (list.indexOf(m.id) !== -1) doneCount++;
    });
    var pct = Math.round((doneCount / totalMateri) * 100);
    TAHSIN_STATE.studentProgres = Math.min(100, Math.max(0, pct));

    var dasarTotal = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Dasar'; }).length;
    var dasarDone = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Dasar' && list.indexOf(m.id) !== -1; }).length;
    var menengahTotal = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Menengah'; }).length;
    var menengahDone = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Menengah' && list.indexOf(m.id) !== -1; }).length;

    if (dasarDone >= Math.ceil(dasarTotal * 0.8) && TAHSIN_STATE.studentLevel === 'Dasar') {
      TAHSIN_STATE.studentLevel = 'Menengah';
    }
    if (menengahDone >= Math.ceil(menengahTotal * 0.8) && TAHSIN_STATE.studentLevel === 'Menengah') {
      TAHSIN_STATE.studentLevel = 'Lanjutan';
    }
  }

  // 5. MODAL TAMPILAN TAHSIN
  function bukaModalTahsin(targetTab) {
    loadTahsinState();
    if (targetTab) TAHSIN_STATE.activeTab = targetTab;

    var modal = document.getElementById('modalTahsin');
    if (!modal) {
      buatStrukturModalTahsin();
      modal = document.getElementById('modalTahsin');
    }
    if (modal) {
      modal.classList.remove('hidden');
      renderTahsinContent();
      document.body.style.overflow = 'hidden';
    }
  }

  function tutupModalTahsin() {
    var modal = document.getElementById('modalTahsin');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function setTahsinTab(tabName) {
    TAHSIN_STATE.activeTab = tabName;
    renderTahsinContent();
  }

  function toggleMateriSelesai(materiId) {
    var nis = getStudentNisKey();
    if (!TAHSIN_STATE.completedIds[nis]) TAHSIN_STATE.completedIds[nis] = [];
    var idx = TAHSIN_STATE.completedIds[nis].indexOf(materiId);
    if (idx === -1) {
      TAHSIN_STATE.completedIds[nis].push(materiId);
      if (typeof window.toast === 'function') {
        window.toast('Alhamdulillah! Materi ditandai selesai.', 'ok');
      }
    } else {
      TAHSIN_STATE.completedIds[nis].splice(idx, 1);
    }
    recalculateProgress();
    saveTahsinState();
    renderTahsinContent();
  }

  // 6. RENDER KONTEN TAHSIN
  function renderTahsinContent() {
    var container = document.getElementById('tahsinContentBody');
    var progressEl = document.getElementById('tahsinProgressValue');
    var progressBarEl = document.getElementById('tahsinProgressBar');
    var levelBadgeEl = document.getElementById('tahsinLevelBadge');

    if (progressEl) progressEl.textContent = TAHSIN_STATE.studentProgres + '%';
    if (progressBarEl) progressBarEl.style.width = TAHSIN_STATE.studentProgres + '%';
    if (levelBadgeEl) {
      levelBadgeEl.textContent = 'Level ' + TAHSIN_STATE.studentLevel;
      levelBadgeEl.className = 'tahsin-badge-level ' + (
        TAHSIN_STATE.studentLevel === 'Dasar' ? 'badge-dasar' :
        TAHSIN_STATE.studentLevel === 'Menengah' ? 'badge-menengah' : 'badge-lanjutan'
      );
    }

    var tabs = ['Dasar', 'Menengah', 'Lanjutan', 'Game'];
    tabs.forEach(function (t) {
      var btn = document.getElementById('tahsinTabBtn_' + t);
      if (btn) {
        if (t === TAHSIN_STATE.activeTab) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });

    if (!container) return;

    var nis = getStudentNisKey();
    var doneList = TAHSIN_STATE.completedIds[nis] || [];

    if (TAHSIN_STATE.activeTab === 'Game') {
      var gHtml = '<div class="tahsin-game-grid">';
      TAHSIN_GAMES_INFO.forEach(function (g) {
        gHtml += '<div class="tahsin-game-card">' +
          '<div class="game-card-icon">' + g.ikon + '</div>' +
          '<div class="game-card-info">' +
            '<div class="game-card-header">' +
              '<h4 class="game-card-title">' + escapeHtml(g.judul) + '</h4>' +
              '<span class="game-level-tag">' + escapeHtml(g.level) + '</span>' +
            '</div>' +
            '<p class="game-card-desc">' + escapeHtml(g.deskripsi) + '</p>' +
            '<button type="button" class="btn-play-game" onclick="mainkanGameTahsin(\'' + g.id + '\')">' +
              '▶ Mainkan Game' +
            '</button>' +
          '</div>' +
        '</div>';
      });
      gHtml += '</div>';
      container.innerHTML = gHtml;
      return;
    }

    var currentLevel = TAHSIN_STATE.activeTab;
    var listMateri = TAHSIN_STATE.materi.filter(function (m) {
      return m.level === currentLevel;
    });

    if (listMateri.length === 0) {
      container.innerHTML = '<div class="tahsin-empty-state">Belum ada materi untuk Level ' + escapeHtml(currentLevel) + '.</div>';
      return;
    }

    var mHtml = '<div class="tahsin-materi-list">';
    listMateri.forEach(function (m, idx) {
      var isDone = doneList.indexOf(m.id) !== -1;
      mHtml += '<div class="tahsin-materi-card ' + (isDone ? 'materi-done' : '') + '">' +
        '<div class="materi-header">' +
          '<div class="materi-title-wrap">' +
            '<span class="materi-number">' + (idx + 1) + '</span>' +
            '<h4 class="materi-title">' + escapeHtml(m.judul) + '</h4>' +
          '</div>' +
          '<span class="materi-type-tag ' + (m.tipe === 'Gambar' ? 'tag-img' : 'tag-text') + '">' +
            (m.tipe === 'Gambar' ? '🖼️ Bagan Tajwid' : '📄 Panduan Tajwid') +
          '</span>' +
        '</div>' +

        '<div class="materi-body">' +
          '<p class="materi-desc">' + escapeHtml(m.isi).replace(/\n/g, '<br/>') + '</p>' +
          renderMateriMedia(m) +
        '</div>' +

        '<div class="materi-footer">' +
          '<button type="button" class="btn-tahsin-status ' + (isDone ? 'status-done' : 'status-pending') + '" onclick="toggleMateriSelesai(\'' + m.id + '\')">' +
            (isDone ? '✓ Sudah Dipelajari' : '○ Tandai Sudah Dipelajari') +
          '</button>' +
        '</div>' +
      '</div>';
    });
    mHtml += '</div>';
    container.innerHTML = mHtml;
  }

  function renderMateriMedia(m) {
    if (m.tipe === 'Gambar' && m.localImg) {
      var imgSrc = m.localImg;
      return '<div class="tahsin-img-wrapper" onclick="bukaLightboxTahsin(\'' + escapeHtml(imgSrc) + '\', \'\', \'' + escapeHtml(m.judul) + '\')">' +
        '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(m.judul) + '" loading="lazy" />' +
        '<div class="img-zoom-tip">🔍 Ketuk untuk memperbesar bagan</div>' +
      '</div>';
    }
    return '';
  }

  // 7. LIGHTBOX IMAGE PREVIEW
  function bukaLightboxTahsin(src, fallback, title) {
    var lb = document.getElementById('tahsinLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'tahsinLightbox';
      lb.className = 'tahsin-lightbox-modal';
      lb.innerHTML = '<div class="lightbox-overlay" onclick="tutupLightboxTahsin()"></div>' +
        '<div class="lightbox-content">' +
          '<div class="lightbox-bar">' +
            '<span id="lightboxTitle"></span>' +
            '<button type="button" class="lightbox-close-btn" onclick="tutupLightboxTahsin()">✕</button>' +
          '</div>' +
          '<div class="lightbox-img-wrap">' +
            '<img id="lightboxImg" src="" alt="Bagan Tahsin" />' +
          '</div>' +
        '</div>';
      document.body.appendChild(lb);
    }
    var imgEl = document.getElementById('lightboxImg');
    var titleEl = document.getElementById('lightboxTitle');
    if (imgEl) imgEl.src = src;
    if (titleEl) titleEl.textContent = title || 'Bagan Tajwid';
    lb.classList.add('active');
  }

  function tutupLightboxTahsin() {
    var lb = document.getElementById('tahsinLightbox');
    if (lb) lb.classList.remove('active');
  }

  // 8. GAME SANDBOX RUNNER
  function mainkanGameTahsin(gameId) {
    var gameCode = (window.TAHSIN_GAMES_CODE && window.TAHSIN_GAMES_CODE[gameId]) || null;
    var gameInfo = TAHSIN_GAMES_INFO.filter(function (g) { return g.id === gameId; })[0] || { judul: 'Game Edukasi SI IPIN' };

    var modal = document.getElementById('modalGameTahsin');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalGameTahsin';
      modal.className = 'game-tahsin-modal hidden';
      modal.innerHTML = '<div class="game-modal-header">' +
        '<div class="game-header-left">' +
          '<span class="game-header-icon">🤖</span>' +
          '<h3 id="gameModalTitle" class="game-header-title">Game Edukasi SI IPIN</h3>' +
        '</div>' +
        '<button type="button" class="btn-close-game" onclick="tutupGameTahsin()">✕ Tutup Game</button>' +
      '</div>' +
      '<div class="game-iframe-wrapper">' +
        '<iframe id="gameTahsinFrame" sandbox="allow-scripts allow-popups allow-forms allow-modals" allow="autoplay; fullscreen"></iframe>' +
      '</div>';
      document.body.appendChild(modal);
    }

    var titleEl = document.getElementById('gameModalTitle');
    var frameEl = document.getElementById('gameTahsinFrame');

    if (titleEl) titleEl.textContent = gameInfo.judul;
    if (frameEl) {
      if (gameCode) {
        frameEl.srcdoc = gameCode;
      } else {
        frameEl.srcdoc = '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#333;"><h3>Memuat file game edukasi SI IPIN...</h3></body></html>';
      }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function tutupGameTahsin() {
    var modal = document.getElementById('modalGameTahsin');
    var frameEl = document.getElementById('gameTahsinFrame');
    if (frameEl) frameEl.srcdoc = '';
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // 9. BUAT STRUKTUR DOM MODAL TAHSIN
  function buatStrukturModalTahsin() {
    if (document.getElementById('modalTahsin')) return;

    var el = document.createElement('div');
    el.id = 'modalTahsin';
    el.className = 'tahsin-modal hidden';
    el.innerHTML = '<div class="tahsin-modal-backdrop" onclick="tutupModalTahsin()"></div>' +
      '<div class="tahsin-modal-box">' +
        '<!-- TOP APP BAR -->' +
        '<div class="tahsin-appbar">' +
          '<div class="tahsin-appbar-info">' +
            '<div class="tahsin-appbar-icon">🤖</div>' +
            '<div>' +
              '<h3 class="tahsin-appbar-title">Tahsin Al-Qur\'an</h3>' +
              '<p class="tahsin-appbar-sub">Sistem Informasi Ibadah Pelajar (SIIP)</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="tahsin-close-btn" onclick="tutupModalTahsin()" title="Tutup">✕</button>' +
        '</div>' +

        '<!-- PROGRESS & LEVEL BANNER -->' +
        '<div class="tahsin-banner-progress">' +
          '<div class="tahsin-progress-header">' +
            '<div class="tahsin-level-wrap">' +
              '<span class="tahsin-level-label">Tingkat Capaian:</span>' +
              '<span id="tahsinLevelBadge" class="tahsin-badge-level badge-dasar">Level Dasar</span>' +
            '</div>' +
            '<div class="tahsin-percent-wrap">' +
              '<span class="tahsin-percent-label">Progres Tilawah:</span>' +
              '<b id="tahsinProgressValue" class="tahsin-percent-value">0%</b>' +
            '</div>' +
          '</div>' +
          '<div class="tahsin-progress-track">' +
            '<div id="tahsinProgressBar" class="tahsin-progress-fill" style="width:0%"></div>' +
          '</div>' +
          '<p class="tahsin-progress-hint">💡 Selesaikan materi & game pada tiap level untuk menguasai kaidah tajwid secara fasih dan bertahap.</p>' +
        '</div>' +

        '<!-- TAB NAVIGATION -->' +
        '<div class="tahsin-tab-nav">' +
          '<button type="button" id="tahsinTabBtn_Dasar" class="tahsin-tab-btn active" onclick="setTahsinTab(\'Dasar\')">🟢 Dasar</button>' +
          '<button type="button" id="tahsinTabBtn_Menengah" class="tahsin-tab-btn" onclick="setTahsinTab(\'Menengah\')">🟡 Menengah</button>' +
          '<button type="button" id="tahsinTabBtn_Lanjutan" class="tahsin-tab-btn" onclick="setTahsinTab(\'Lanjutan\')">🔴 Lanjutan</button>' +
          '<button type="button" id="tahsinTabBtn_Game" class="tahsin-tab-btn" onclick="setTahsinTab(\'Game\')">🎮 Game Edukasi</button>' +
        '</div>' +

        '<!-- CONTENT BODY -->' +
        '<div id="tahsinContentBody" class="tahsin-content-scroll">' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);
  }

  // 10. FITUR ADMIN TAHSIN & GAME SI IPIN
  var ADMIN_TAHSIN_TAB = 'materi';
  var ADMIN_TAHSIN_LEVEL_FILTER = 'Semua';

  function renderAdminTahsin() {
    var c = document.getElementById('tahsinAdminContainer');
    if (!c) return;

    loadTahsinState();

    var siswaList = [];
    if (typeof window.getDaftarSiswaAktif === 'function') {
      siswaList = window.getDaftarSiswaAktif();
    } else if (Array.isArray(window.DATA_SISWA)) {
      siswaList = window.DATA_SISWA;
    }

    var totalMateri = TAHSIN_STATE.materi.length;
    var dasarCount = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Dasar'; }).length;
    var menengahCount = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Menengah'; }).length;
    var lanjutanCount = TAHSIN_STATE.materi.filter(function (m) { return m.level === 'Lanjutan'; }).length;

    var html = '<div class="tahsin-admin-wrap">' +
      '<!-- STATS CARDS -->' +
      '<div class="tahsin-stats-grid">' +
        '<div class="tahsin-stat-card">' +
          '<div class="tahsin-stat-icon" style="background:#ecfdf5;color:#047857;">📖</div>' +
          '<div class="tahsin-stat-info">' +
            '<span class="tahsin-stat-label">Total Materi</span>' +
            '<b class="tahsin-stat-val">' + totalMateri + '</b>' +
            '<span class="tahsin-stat-sub">' + dasarCount + ' Dasar · ' + menengahCount + ' Menengah · ' + lanjutanCount + ' Lanjutan</span>' +
          '</div>' +
        '</div>' +
        '<div class="tahsin-stat-card">' +
          '<div class="tahsin-stat-icon" style="background:#eff6ff;color:#1d4ed8;">🎮</div>' +
          '<div class="tahsin-stat-info">' +
            '<span class="tahsin-stat-label">Game Edukasi</span>' +
            '<b class="tahsin-stat-val">' + TAHSIN_GAMES_INFO.length + '</b>' +
            '<span class="tahsin-stat-sub">SI IPIN Interactive Games</span>' +
          '</div>' +
        '</div>' +
        '<div class="tahsin-stat-card">' +
          '<div class="tahsin-stat-icon" style="background:#fef3c7;color:#b45309;">🤖</div>' +
          '<div class="tahsin-stat-info">' +
            '<span class="tahsin-stat-label">Kurikulum</span>' +
            '<b class="tahsin-stat-val">3 Level</b>' +
            '<span class="tahsin-stat-sub">Dasar ➔ Menengah ➔ Lanjutan</span>' +
          '</div>' +
        '</div>' +
        '<div class="tahsin-stat-card">' +
          '<div class="tahsin-stat-icon" style="background:#fdf2f8;color:#be185d;">👥</div>' +
          '<div class="tahsin-stat-info">' +
            '<span class="tahsin-stat-label">Siswa Terdaftar</span>' +
            '<b class="tahsin-stat-val">' + (siswaList.length || 0) + '</b>' +
            '<span class="tahsin-stat-sub">Progres Terpantau</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<!-- ADMIN SUB-TABS -->' +
      '<div class="tahsin-admin-tabs">' +
        '<button type="button" class="tahsin-admin-tab-btn ' + (ADMIN_TAHSIN_TAB === 'materi' ? 'active' : '') + '" onclick="setAdminTahsinTab(\'materi\')">📖 Kelola Materi Belajar (' + totalMateri + ')</button>' +
        '<button type="button" class="tahsin-admin-tab-btn ' + (ADMIN_TAHSIN_TAB === 'game' ? 'active' : '') + '" onclick="setAdminTahsinTab(\'game\')">🎮 Game Edukasi SI IPIN (' + TAHSIN_GAMES_INFO.length + ')</button>' +
        '<button type="button" class="tahsin-admin-tab-btn ' + (ADMIN_TAHSIN_TAB === 'siswa' ? 'active' : '') + '" onclick="setAdminTahsinTab(\'siswa\')">👥 Progres & Level Siswa</button>' +
      '</div>';

    if (ADMIN_TAHSIN_TAB === 'materi') {
      html += renderAdminMateriTab();
    } else if (ADMIN_TAHSIN_TAB === 'game') {
      html += renderAdminGameTab();
    } else {
      html += renderAdminSiswaTab(siswaList);
    }

    html += '</div>';
    c.innerHTML = html;
  }

  function setAdminTahsinTab(tab) {
    ADMIN_TAHSIN_TAB = tab;
    renderAdminTahsin();
  }

  function setAdminTahsinLevelFilter(lvl) {
    ADMIN_TAHSIN_LEVEL_FILTER = lvl;
    renderAdminTahsin();
  }

  function renderAdminMateriTab() {
    var searchVal = (document.getElementById('cariMateriTahsinAdmin') ? document.getElementById('cariMateriTahsinAdmin').value : '').toLowerCase().trim();
    var list = TAHSIN_STATE.materi.filter(function (m) {
      if (ADMIN_TAHSIN_LEVEL_FILTER !== 'Semua' && m.level !== ADMIN_TAHSIN_LEVEL_FILTER) return false;
      if (searchVal && m.judul.toLowerCase().indexOf(searchVal) === -1 && m.isi.toLowerCase().indexOf(searchVal) === -1) return false;
      return true;
    });

    var h = '<div class="tahsin-admin-toolbar">' +
      '<div class="tahsin-admin-filters">' +
        '<button type="button" class="tahsin-filter-btn ' + (ADMIN_TAHSIN_LEVEL_FILTER === 'Semua' ? 'active' : '') + '" onclick="setAdminTahsinLevelFilter(\'Semua\')">Semua Level</button>' +
        '<button type="button" class="tahsin-filter-btn ' + (ADMIN_TAHSIN_LEVEL_FILTER === 'Dasar' ? 'active' : '') + '" onclick="setAdminTahsinLevelFilter(\'Dasar\')">Level Dasar</button>' +
        '<button type="button" class="tahsin-filter-btn ' + (ADMIN_TAHSIN_LEVEL_FILTER === 'Menengah' ? 'active' : '') + '" onclick="setAdminTahsinLevelFilter(\'Menengah\')">Level Menengah</button>' +
        '<button type="button" class="tahsin-filter-btn ' + (ADMIN_TAHSIN_LEVEL_FILTER === 'Lanjutan' ? 'active' : '') + '" onclick="setAdminTahsinLevelFilter(\'Lanjutan\')">Level Lanjutan</button>' +
      '</div>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">' +
        '<input type="text" id="cariMateriTahsinAdmin" placeholder="Cari materi..." value="' + escapeHtml(searchVal) + '" oninput="renderAdminTahsin()" style="padding:7px 12px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:12.5px;max-width:200px;" />' +
        '<button type="button" class="btn sm" onclick="bukaModalTahsin()" style="background:#059669;color:#fff;border-radius:10px;padding:7px 14px;font-weight:700;">👁️ Buka Tampilan Siswa</button>' +
      '</div>' +
    '</div>' +

    '<div class="table-responsive" style="margin-top:12px;background:#fff;border-radius:14px;border:1px solid #e2e8f0;overflow:hidden;">' +
      '<table class="table" style="width:100%;border-collapse:collapse;font-size:13px;">' +
        '<thead>' +
          '<tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0;text-align:left;">' +
            '<th style="padding:10px 14px;width:40px;">No</th>' +
            '<th style="padding:10px 14px;">Judul Materi</th>' +
            '<th style="padding:10px 14px;width:100px;">Level</th>' +
            '<th style="padding:10px 14px;width:120px;">Tipe</th>' +
            '<th style="padding:10px 14px;width:110px;">Aksi</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>';

    if (list.length === 0) {
      h += '<tr><td colspan="5" style="text-align:center;padding:24px;color:#64748b;">Tidak ada materi yang sesuai filter.</td></tr>';
    } else {
      list.forEach(function (m, idx) {
        h += '<tr style="border-bottom:1px solid #f1f5f9;">' +
          '<td style="padding:10px 14px;color:#64748b;font-weight:600;">' + (idx + 1) + '</td>' +
          '<td style="padding:10px 14px;">' +
            '<b>' + escapeHtml(m.judul) + '</b>' +
            '<div style="font-size:11.5px;color:#64748b;margin-top:2px;">' + escapeHtml(m.isi).slice(0, 85) + '...</div>' +
          '</td>' +
          '<td style="padding:10px 14px;">' +
            '<span class="tahsin-badge-level ' + (m.level === 'Dasar' ? 'badge-dasar' : m.level === 'Menengah' ? 'badge-menengah' : 'badge-lanjutan') + '">' + escapeHtml(m.level) + '</span>' +
          '</td>' +
          '<td style="padding:10px 14px;">' +
            '<span class="materi-type-tag ' + (m.tipe === 'Gambar' ? 'tag-img' : 'tag-text') + '">' + (m.tipe === 'Gambar' ? '🖼️ Bagan' : '📄 Panduan') + '</span>' +
          '</td>' +
          '<td style="padding:10px 14px;">' +
            '<button type="button" class="btn sm" onclick="bukaModalTahsin(\'' + m.level + '\')" style="padding:4px 8px;font-size:11px;border-radius:6px;background:#f0fdf4;color:#047857;border:1px solid #86efac;">Preview</button>' +
          '</td>' +
        '</tr>';
      });
    }

    h += '</tbody></table></div>';
    return h;
  }

  function renderAdminGameTab() {
    var h = '<div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;">';
    TAHSIN_GAMES_INFO.forEach(function (g) {
      h += '<div style="background:#fff;border:1.5px solid #a7f3d0;border-radius:16px;padding:16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);display:flex;flex-direction:column;justify-content:space-between;">' +
        '<div>' +
          '<div style="font-size:32px;margin-bottom:8px;">' + g.ikon + '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
            '<h4 style="margin:0;font-size:15px;color:#064e3b;font-weight:700;">' + escapeHtml(g.judul) + '</h4>' +
            '<span class="tahsin-badge-level badge-dasar">' + escapeHtml(g.level) + '</span>' +
          '</div>' +
          '<p style="margin:0 0 14px 0;font-size:12px;color:#475569;line-height:1.45;">' + escapeHtml(g.deskripsi) + '</p>' +
        '</div>' +
        '<button type="button" class="btn-play-game" onclick="mainkanGameTahsin(\'' + g.id + '\')">▶ Uji / Mainkan Game</button>' +
      '</div>';
    });
    h += '</div>';
    return h;
  }

  function renderAdminSiswaTab(siswaList) {
    var h = '<div class="table-responsive" style="margin-top:14px;background:#fff;border-radius:14px;border:1px solid #e2e8f0;overflow:hidden;">' +
      '<table class="table" style="width:100%;border-collapse:collapse;font-size:13px;">' +
        '<thead>' +
          '<tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0;text-align:left;">' +
            '<th style="padding:10px 14px;width:40px;">No</th>' +
            '<th style="padding:10px 14px;">NIS</th>' +
            '<th style="padding:10px 14px;">Nama Siswa</th>' +
            '<th style="padding:10px 14px;">Kelas</th>' +
            '<th style="padding:10px 14px;">Level Tahsin</th>' +
            '<th style="padding:10px 14px;">Progres</th>' +
            '<th style="padding:10px 14px;width:120px;">Aksi</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>';

    if (!siswaList || siswaList.length === 0) {
      h += '<tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b;">Belum ada data siswa.</td></tr>';
    } else {
      siswaList.forEach(function (s, idx) {
        var nisStr = String(s.nis || s.id || '');
        var doneArr = TAHSIN_STATE.completedIds[nisStr] || [];
        var total = TAHSIN_STATE.materi.length || 1;
        var pct = Math.min(100, Math.round((doneArr.length / total) * 100));
        var lvl = s.tahsin_level || (pct >= 80 ? 'Lanjutan' : pct >= 40 ? 'Menengah' : 'Dasar');

        h += '<tr style="border-bottom:1px solid #f1f5f9;">' +
          '<td style="padding:10px 14px;color:#64748b;">' + (idx + 1) + '</td>' +
          '<td style="padding:10px 14px;font-family:monospace;font-weight:600;">' + escapeHtml(nisStr) + '</td>' +
          '<td style="padding:10px 14px;font-weight:700;">' + escapeHtml(s.nama || '-') + '</td>' +
          '<td style="padding:10px 14px;">' + escapeHtml(s.kelas || '-') + '</td>' +
          '<td style="padding:10px 14px;">' +
            '<span class="tahsin-badge-level ' + (lvl === 'Dasar' ? 'badge-dasar' : lvl === 'Menengah' ? 'badge-menengah' : 'badge-lanjutan') + '">' + lvl + '</span>' +
          '</td>' +
          '<td style="padding:10px 14px;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              '<div style="width:80px;height:7px;background:#e2e8f0;border-radius:10px;overflow:hidden;">' +
                '<div style="width:' + pct + '%;height:100%;background:#10b981;"></div>' +
              '</div>' +
              '<b style="font-size:11.5px;color:#047857;">' + pct + '%</b>' +
            '</div>' +
          '</td>' +
          '<td style="padding:10px 14px;">' +
            '<button type="button" class="btn sm ghost" onclick="adminUbahLevelSiswa(\'' + escapeHtml(nisStr) + '\', \'' + lvl + '\')" style="padding:4px 8px;font-size:11px;border-radius:6px;">Ubah Level</button>' +
          '</td>' +
        '</tr>';
      });
    }

    h += '</tbody></table></div>';
    return h;
  }

  function adminUbahLevelSiswa(nis, currentLvl) {
    var p = prompt('Pilih Level Tahsin untuk siswa (NIS: ' + nis + '):\nKetik: Dasar / Menengah / Lanjutan', currentLvl || 'Dasar');
    if (!p) return;
    p = p.trim();
    if (['Dasar', 'Menengah', 'Lanjutan'].indexOf(p) === -1) {
      alert('Level tidak valid. Harus salah satu dari: Dasar, Menengah, atau Lanjutan.');
      return;
    }
    if (Array.isArray(window.DATA_SISWA)) {
      var s = window.DATA_SISWA.filter(function (x) { return String(x.nis || x.id) === String(nis); })[0];
      if (s) {
        s.tahsin_level = p;
        if (typeof window.simpanDataSiswaLocal === 'function') window.simpanDataSiswaLocal();
      }
    }
    renderAdminTahsin();
    if (typeof window.toast === 'function') window.toast('Level Tahsin siswa berhasil diubah ke ' + p, 'ok');
  }

  // 11. UTILITIES
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 12. EXPOSE GLOBAL APIS
  window.bukaModalTahsin = bukaModalTahsin;
  window.tutupModalTahsin = tutupModalTahsin;
  window.setTahsinTab = setTahsinTab;
  window.toggleMateriSelesai = toggleMateriSelesai;
  window.bukaLightboxTahsin = bukaLightboxTahsin;
  window.tutupLightboxTahsin = tutupLightboxTahsin;
  window.mainkanGameTahsin = mainkanGameTahsin;
  window.tutupGameTahsin = tutupGameTahsin;
  window.renderAdminTahsin = renderAdminTahsin;
  window.setAdminTahsinTab = setAdminTahsinTab;
  window.setAdminTahsinLevelFilter = setAdminTahsinLevelFilter;
  window.adminUbahLevelSiswa = adminUbahLevelSiswa;
  window.DEFAULT_TAHSIN_MATERI = DEFAULT_TAHSIN_MATERI;
  window.TAHSIN_GAMES_INFO = TAHSIN_GAMES_INFO;
  window.TAHSIN_STATE = TAHSIN_STATE;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTahsinState);
  } else {
    loadTahsinState();
  }
})();
