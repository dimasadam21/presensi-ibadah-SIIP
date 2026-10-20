/**
 * ==============================================================================
 * FITUR BULAN RAMADHAN TERPADU - PRESENSI IBADAH (EDISI KLONING)
 * ==============================================================================
 * Fitur Lengkap:
 * 1. 30 Judul Kegiatan Ramadhan (Bisa diubah/diedit oleh Admin & Tersinkronisasi)
 * 2. Pengaturan Tanggal Mulai Ramadhan (Otomatis hitung kalender 30 hari)
 * 3. Form Input Siswa:
 *    - Judul Kegiatan Ramadhan (Hari ke-1 s/d Hari ke-30)
 *    - Dimana (Lokasi kegiatan)
 *    - Dampak (Hikmah, refleksi & manfaat yang dirasakan)
 *    - Bukti (Upload File Gambar / Foto atau Dokumen PDF)
 * 4. Menu Admin:
 *    - Edit 30 Judul & Panduan Kegiatan Ramadhan
 *    - Ubah Tanggal Mulai Ramadhan & Status Fitur
 *    - Cek & Verifikasi Hasil Siswa (Filter Hari, Kelas, Status, Preview Foto/PDF)
 *    - Ekspor Rekapitulasi Lengkap ke Excel (XLSX)
 * ==============================================================================
 */

// ==============================================================================
// 1. DATA MASTER DEFAULT 30 KEGIATAN RAMADHAN
// ==============================================================================
var DEFAULT_RAMADHAN_KEGIATAN = [
  {
    hari_ke: 1,
    judul: "Niat & Puasa Pertama Ramadhan",
    deskripsi: "Meneguhkan niat puasa sebulan penuh karena Allah SWT, sahur bersama keluarga, dan menyambut hari pertama dengan hati bersih."
  },
  {
    hari_ke: 2,
    judul: "Menjaga Sholat Fardhu Berjamaah",
    deskripsi: "Membiasakan sholat lima waktu tepat waktu dan diutamakan berjamaah di masjid/musholla atau bersama keluarga di rumah."
  },
  {
    hari_ke: 3,
    judul: "Tadarus Al-Qur'an (Target Khatam)",
    deskripsi: "Membaca Al-Qur'an secara tartil minimal 1 juz atau beberapa maqra' dan menghayati terjemahannya."
  },
  {
    hari_ke: 4,
    judul: "Sedekah Subuh & Kepedulian Sosial",
    deskripsi: "Menyisihkan sebagian uang saku ke kotak infak masjid atau berbagi makanan ringan kepada tetangga di pagi hari."
  },
  {
    hari_ke: 5,
    judul: "Muroja'ah Hafalan Surat Pendek",
    deskripsi: "Mengulang hafalan surat-surat Juz 30 (Juz 'Amma) dan memperbagus tajwid serta makhrajul huruf."
  },
  {
    hari_ke: 6,
    judul: "Sholat Sunnah Rawatib & Dhuha",
    deskripsi: "Menunaikan sholat Dhuha minimal 2 rakaat di pagi hari dan menjaga sholat rawatib qabliyah maupun ba'diyah."
  },
  {
    hari_ke: 7,
    judul: "Berbakti Kepada Orang Tua (Birrul Walidain)",
    deskripsi: "Membantu orang tua menyiapkan hidangan sahur atau berbuka, serta memohon doa restu dan keridhoan mereka."
  },
  {
    hari_ke: 8,
    judul: "Menuntut Ilmu Agama / Menyimak Kultum",
    deskripsi: "Mengikuti kajian Ramadhan, mendengarkan ceramah tarawih atau kultum ba'da subuh, serta mencatat hikmahnya."
  },
  {
    hari_ke: 9,
    judul: "Berbagi Takjil Buka Puasa",
    deskripsi: "Menyiapkan dan membagikan takjil berbuka kepada orang yang berpuasa, musafir, atau jamaah di masjid terdekat."
  },
  {
    hari_ke: 10,
    judul: "Muhasabah Diri di 10 Hari Pertama",
    deskripsi: "Mengevaluasi ibadah 10 hari pertama (Fase Rahmat), memohon curahan rahmat Allah, dan memperbarui semangat ibadah."
  },
  {
    hari_ke: 11,
    judul: "Menjaga Lisan & Menghindari Sia-Sia",
    deskripsi: "Menjauhkan diri dari ghibah, dusta, kata kasar, serta membatasi waktu bermain gawai (HP/gadget) yang tidak bermanfaat."
  },
  {
    hari_ke: 12,
    judul: "Silaturahmi Kerabat & Sahabat",
    deskripsi: "Menyambung tali persaudaraan dengan menelepon, mengunjungi kakek-nenek/kerabat, atau menyapa teman yang lama tidak bertemu."
  },
  {
    hari_ke: 13,
    judul: "Menjaga Kebersihan Masjid & Lingkungan",
    deskripsi: "Membersihkan tempat wudhu, merapikan sajadah musholla/masjid, atau membersihkan kamar dan rumah demi kenyamanan ibadah."
  },
  {
    hari_ke: 14,
    judul: "Meneladani Akhlak Kedermawanan Nabi SAW",
    deskripsi: "Membaca sirah nabawiyah tentang sifat dermawan Rasulullah SAW di bulan Ramadhan dan menerapkannya dalam pergaulan."
  },
  {
    hari_ke: 15,
    judul: "Berdoa Khusyuk Menjelang Berbuka",
    deskripsi: "Memanfaatkan waktu 15 menit sebelum adzan maghrib (waktu mustajab doa) untuk memanjatkan hajat, doa orang tua, dan ampunan."
  },
  {
    hari_ke: 16,
    judul: "Memperbanyak Istighfar & Dzikir Harian",
    deskripsi: "Membasahi bibir dengan dzikir tasbih, tahmid, tahlil, takbir, dan memperbanyak Sayyidul Istighfar sepanjang hari."
  },
  {
    hari_ke: 17,
    judul: "Peringatan Nuzulul Qur'an & Tadabbur",
    deskripsi: "Merenungi keagungan malam turunnya Al-Qur'an, membaca tafsir surat favorit, dan bertekad mengamalkannya dalam hidup."
  },
  {
    hari_ke: 18,
    judul: "Menolong Teman & Menebar Senyum Salam",
    deskripsi: "Membantu teman sekolah yang sedang kesulitan belajar, menebarkan senyum ramah, serta mengucap salam kepada siapa pun."
  },
  {
    hari_ke: 19,
    judul: "Membaca & Memahami Hadits Pilihan",
    deskripsi: "Mempelajari hadits shahih tentang keutamaan puasa, adab pergaulan, dan kejujuran dalam beramal."
  },
  {
    hari_ke: 20,
    judul: "Muhasabah Fase Maghfirah (10 Hari Kedua)",
    deskripsi: "Memohon ampunan sebesar-besarnya atas segala dosa yang lalu di penghujung 10 hari kedua Ramadhan."
  },
  {
    hari_ke: 21,
    judul: "Menyambut 10 Malam Terakhir Ramadhan",
    deskripsi: "Memulai perburuan malam-malam istimewa dengan memperpanjang sholat malam (tahajjud dan witir) dengan khusyuk."
  },
  {
    hari_ke: 22,
    judul: "Memburu Keutamaan Malam Lailatul Qadar",
    deskripsi: "Melafalkan doa: 'Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni' sebanyak-banyaknya di malam-malam ganjil."
  },
  {
    hari_ke: 23,
    judul: "I'tikaf Sejenak di Masjid",
    deskripsi: "Berdiam diri di masjid dengan niat i'tikaf, memperbanyak tilawah Qur'an, dzikir, serta merenungi makna kehidupan."
  },
  {
    hari_ke: 24,
    judul: "Menunaikan Zakat Fitrah & Infak Peduli",
    deskripsi: "Menunaikan zakat fitrah tepat waktu untuk membersihkan jiwa dan berbagi kebahagiaan menyambut hari raya dengan kaum dhuafa."
  },
  {
    hari_ke: 25,
    judul: "Memperbanyak Shalawat Nabi SAW",
    deskripsi: "Membaca shalawat kepada Rasulullah SAW minimal 100 kali sebagai wujud kecintaan mendalam kepada junjungan nabi."
  },
  {
    hari_ke: 26,
    judul: "Peduli Anak Yatim & Kaum Dhuafa",
    deskripsi: "Menyalurkan santunan atau bingkisan makanan kepada anak yatim, lansia, atau pekerja kebersihan sekitar."
  },
  {
    hari_ke: 27,
    judul: "Menjaga Kebersihan Hati & Memaafkan",
    deskripsi: "Memaafkan kesalahan orang lain sebelum diminta, membuang rasa dengki, dan melapangkan dada menyambut Idul Fitri."
  },
  {
    hari_ke: 28,
    judul: "Mempersiapkan Diri Menyambut Hari Raya",
    deskripsi: "Membersihkan rumah, menyiapkan pakaian terbaik yang rapi dan sopan, serta membantu orang tua berkemas."
  },
  {
    hari_ke: 29,
    judul: "Khatam Al-Qur'an & Doa Khotmil Qur'an",
    deskripsi: "Menuntaskan bacaan Al-Qur'an 30 Juz dan memanjatkan doa khotmil Qur'an memohon keberkahan ilmu dan petunjuk hidup."
  },
  {
    hari_ke: 30,
    judul: "Refleksi Akhir Ramadhan & Malam Takbiran",
    deskripsi: "Mengumandangkan takbir mengagungkan asma Allah SWT, bersyukur atas nikmat Ramadhan, serta bertekad istiqomah pasca Ramadhan."
  }
];

// Default Ramadhan Config
var DEFAULT_RAMADHAN_CONFIG = {
  tgl_mulai: "2026-02-18", // Default 1 Ramadhan 1447 H / disesuaikan admin
  aktif: "YA",
  judul: "Jurnal Kegiatan Ramadhan"
};

// State global memory
var RAMADHAN_KEGIATAN_LIST = [];
var RAMADHAN_CONFIG = Object.assign({}, DEFAULT_RAMADHAN_CONFIG);
var RAMADHAN_SISWA_SUBMISSIONS = {}; // Cache hasil siswa login: { [hari_ke]: record }
var RAMADHAN_ADMIN_SUBMISSIONS = []; // Semua hasil siswa untuk admin
var RAMADHAN_SELECTED_HARI = 1;
var RAMADHAN_TEMP_FILE = null; // { blob, base64, type: 'image'|'pdf', name, size }

// ==============================================================================
// 2. INJEKSI STYLE CSS MEWAH FITUR RAMADHAN
// ==============================================================================
(function injectRamadhanStyles() {
  if (document.getElementById('style-fitur-ramadhan')) return;
  var style = document.createElement('style');
  style.id = 'style-fitur-ramadhan';
  style.textContent = `
    /* ================= RAMADHAN THEME LUXURY STYLES ================= */
    :root {
      --ramadhan-gold: #f59e0b;
      --ramadhan-gold-light: #fef3c7;
      --ramadhan-gold-glow: rgba(245, 158, 11, 0.35);
      --ramadhan-emerald: #059669;
      --ramadhan-emerald-dark: #064e3b;
      --ramadhan-emerald-light: #d1fae5;
    }

    /* Banner Spesial Ramadhan di Dashboard Siswa */
    .card-ramadhan-hero {
      position: relative;
      overflow: hidden;
      margin-bottom: 14px;
      padding: 16px 18px;
      border-radius: 20px;
      background: linear-gradient(135deg, #062822 0%, #0d4a3e 50%, #092c24 100%);
      border: 1.5px solid rgba(245, 158, 11, 0.45);
      box-shadow: 0 10px 28px -6px rgba(5, 150, 105, 0.35), 0 0 20px rgba(245, 158, 11, 0.15);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-ramadhan-hero:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 34px -6px rgba(5, 150, 105, 0.5), 0 0 28px rgba(245, 158, 11, 0.3);
      border-color: rgba(245, 158, 11, 0.8);
    }
    .card-ramadhan-hero::before {
      content: '';
      position: absolute;
      top: -40%;
      right: -20%;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .ramadhan-banner-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      position: relative;
      z-index: 1;
    }
    .ramadhan-banner-left {
      flex: 1;
      min-width: 0;
    }
    .ramadhan-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 20px;
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.5);
      color: #fbbf24;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.2px;
      margin-bottom: 6px;
    }
    .ramadhan-banner-title {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 4px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }
    .ramadhan-banner-sub {
      font-size: 12px;
      color: #a7f3d0;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ramadhan-prog-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ramadhan-mini-track {
      flex: 1;
      height: 7px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.15);
      overflow: hidden;
    }
    .ramadhan-mini-bar {
      height: 100%;
      border-radius: 10px;
      background: linear-gradient(90deg, #10b981, #f59e0b);
      transition: width 0.4s ease;
    }
    .ramadhan-prog-text {
      font-size: 11px;
      font-weight: 800;
      color: #fef3c7;
      white-space: nowrap;
    }
    .ramadhan-banner-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .ramadhan-moon-ic {
      font-size: 38px;
      filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.6));
      animation: pulseMoon 3s ease-in-out infinite alternate;
    }
    @keyframes pulseMoon {
      0% { transform: scale(1) rotate(-5deg); }
      100% { transform: scale(1.08) rotate(5deg); }
    }
    .btn-ramadhan-go {
      background: #f59e0b;
      color: #78350f;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 10px;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }

    /* Kalender 30 Hari Ramadhan Siswa */
    .ramadhan-days-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    @media (max-width: 600px) {
      .ramadhan-days-grid {
        grid-template-columns: 1fr;
      }
    }
    .ramadhan-day-card {
      background: rgba(13, 22, 40, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      position: relative;
      transition: all 0.22s ease;
    }
    .ramadhan-day-card:hover {
      background: rgba(18, 30, 56, 0.95);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateY(-2px);
    }
    .ramadhan-day-card.is-today {
      border: 1.8px solid #f59e0b;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(6, 78, 59, 0.2));
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
    }
    .ramadhan-day-card.is-done {
      border-color: rgba(16, 185, 129, 0.5);
      background: linear-gradient(135deg, rgba(6, 78, 59, 0.35), rgba(13, 22, 40, 0.85));
    }
    .day-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .day-num-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 800;
      color: #a7f3d0;
      background: rgba(16, 185, 129, 0.16);
      padding: 3px 10px;
      border-radius: 12px;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .day-card-status {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 8px;
    }
    .status-badge-done {
      background: #059669;
      color: #ecfdf5;
    }
    .status-badge-today {
      background: #f59e0b;
      color: #78350f;
      animation: pulseBadge 2s infinite alternate;
    }
    @keyframes pulseBadge {
      0% { opacity: 0.85; transform: scale(0.98); }
      100% { opacity: 1; transform: scale(1.02); }
    }
    .status-badge-pending {
      background: rgba(255, 255, 255, 0.08);
      color: var(--muted);
    }
    .day-card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.35;
      margin: 2px 0;
    }
    .day-card-date {
      font-size: 11px;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .day-card-preview {
      font-size: 11.5px;
      color: #6ee7b7;
      background: rgba(5, 150, 105, 0.12);
      border-radius: 8px;
      padding: 6px 10px;
      border-left: 2px solid #10b981;
    }

    /* Modal Form Pengisian Siswa */
    .ramadhan-form-group {
      margin-bottom: 14px;
    }
    .ramadhan-form-group label {
      display: block;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 6px;
    }
    .ramadhan-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .ramadhan-chip {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--muted);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .ramadhan-chip:hover {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: rgba(52, 211, 153, 0.4);
    }

    /* Upload Box Bukti Gambar/PDF */
    .ramadhan-upload-box {
      border: 2px dashed rgba(52, 211, 153, 0.4);
      border-radius: 14px;
      padding: 18px;
      text-align: center;
      background: rgba(6, 78, 59, 0.12);
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .ramadhan-upload-box:hover {
      background: rgba(6, 78, 59, 0.22);
      border-color: #34d399;
    }
    .ramadhan-preview-zone {
      margin-top: 10px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.25);
      position: relative;
    }
    .preview-img-box img {
      width: 100%;
      max-height: 240px;
      object-fit: contain;
      display: block;
      background: #000;
    }
    .preview-pdf-box {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);
      border: 1px solid #c084fc;
      border-radius: 12px;
    }
    .preview-pdf-icon {
      font-size: 32px;
      color: #ef4444;
    }
    .preview-pdf-meta {
      flex: 1;
      text-align: left;
    }
    .preview-pdf-name {
      font-size: 13px;
      font-weight: 700;
      color: #f8fafc;
      word-break: break-all;
    }
    .preview-pdf-size {
      font-size: 11px;
      color: #cbd5e1;
      margin-top: 2px;
    }

    /* Admin Sub Tabs */
    .admin-subtabs {
      display: flex;
      gap: 8px;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .admin-subtab-btn {
      background: none;
      border: none;
      padding: 10px 16px;
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .admin-subtab-btn.active {
      color: #f59e0b;
      border-bottom-color: #f59e0b;
    }

    /* KPI Summary Cards */
    .ramadhan-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .ramadhan-kpi-card {
      background: rgba(13, 21, 38, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ramadhan-kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .ramadhan-kpi-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--text);
      line-height: 1.1;
    }
    .ramadhan-kpi-label {
      font-size: 11px;
      color: var(--muted);
      margin-top: 2px;
    }
  `;
  document.head.appendChild(style);
})();

// ==============================================================================
// 3. HELPER TANGGAL & KALENDER 30 HARI RAMADHAN
// ==============================================================================
function getRamadhanStartDate() {
  var tglStr = RAMADHAN_CONFIG.tgl_mulai || DEFAULT_RAMADHAN_CONFIG.tgl_mulai;
  var parts = tglStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date();
}

function getTanggalRamadhanByHari(hariKe) {
  var start = getRamadhanStartDate();
  var d = new Date(start.getTime() + (hariKe - 1) * 86400000);
  return d;
}

function formatTanggalIndo(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return '-';
  var hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var bulanArr = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return hariArr[dateObj.getDay()] + ', ' + dateObj.getDate() + ' ' + bulanArr[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
}

function formatDateISO(dateObj) {
  var y = dateObj.getFullYear();
  var m = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  var d = ('0' + dateObj.getDate()).slice(-2);
  return y + '-' + m + '-' + d;
}

function getHariRamadhanSaatIni() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var start = getRamadhanStartDate();
  start.setHours(0, 0, 0, 0);
  var diffDays = Math.floor((today.getTime() - start.getTime()) / 86400000) + 1;
  if (diffDays >= 1 && diffDays <= 30) return diffDays;
  if (diffDays < 1) return 1; // Belum mulai, default sorot hari 1
  return 30; // Sudah lewat, default sorot hari 30
}

// ==============================================================================
// 4. SINKRONISASI DATA KEGIATAN & PENGATURAN RAMADHAN
// ==============================================================================
async function muatPengaturanRamadhan() {
  try {
    if (typeof sbFetch === 'function') {
      var res = await sbFetch('pengaturan?select=parameter,nilai');
      var list = await res.json();
      if (Array.isArray(list)) {
        list.forEach(function (row) {
          if (row.parameter === 'ramadhan_tgl_mulai' && row.nilai) {
            RAMADHAN_CONFIG.tgl_mulai = row.nilai;
          } else if (row.parameter === 'ramadhan_aktif' && row.nilai) {
            RAMADHAN_CONFIG.aktif = row.nilai;
          } else if (row.parameter === 'ramadhan_judul' && row.nilai) {
            RAMADHAN_CONFIG.judul = row.nilai;
          }
        });
      }
    }
  } catch (e) {
    console.warn('Gagal membaca pengaturan Ramadhan dari Supabase, menggunakan lokal:', e);
    var localCfg = klonStorage.getItem('ramadhan_config');
    if (localCfg) {
      try { RAMADHAN_CONFIG = Object.assign(RAMADHAN_CONFIG, JSON.parse(localCfg)); } catch (err) {}
    }
  }
}

async function simpanPengaturanRamadhanKeSupabase(newCfg) {
  RAMADHAN_CONFIG = Object.assign(RAMADHAN_CONFIG, newCfg);
  klonStorage.setItem('ramadhan_config', JSON.stringify(RAMADHAN_CONFIG));

  if (typeof sbFetch === 'function') {
    var params = [
      { parameter: 'ramadhan_tgl_mulai', nilai: RAMADHAN_CONFIG.tgl_mulai, deskripsi: 'Tanggal mulai 1 Ramadhan' },
      { parameter: 'ramadhan_aktif', nilai: RAMADHAN_CONFIG.aktif, deskripsi: 'Status aktif fitur Ramadhan (YA/TIDAK)' },
      { parameter: 'ramadhan_judul', nilai: RAMADHAN_CONFIG.judul, deskripsi: 'Judul utama program Ramadhan' }
    ];
    for (var i = 0; i < params.length; i++) {
      try {
        await sbFetch('pengaturan', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(params[i])
        });
      } catch (err) {
        console.warn('Simpan parameter ' + params[i].parameter + ' gagal:', err);
      }
    }
  }
}

async function muatDaftarKegiatanRamadhan() {
  // Cek cache lokal dulu
  var localList = klonStorage.getItem('ramadhan_kegiatan_30');
  if (localList) {
    try {
      var parsed = JSON.parse(localList);
      if (Array.isArray(parsed) && parsed.length === 30) {
        RAMADHAN_KEGIATAN_LIST = parsed;
      }
    } catch (e) {}
  }
  if (!RAMADHAN_KEGIATAN_LIST || RAMADHAN_KEGIATAN_LIST.length !== 30) {
    RAMADHAN_KEGIATAN_LIST = JSON.parse(JSON.stringify(DEFAULT_RAMADHAN_KEGIATAN));
  }

  // Coba ambil dari database Supabase (tabel kloning_ramadhan_kegiatan)
  try {
    if (typeof sbFetch === 'function') {
      var res = await sbFetch('ramadhan_kegiatan?order=hari_ke.asc');
      var dbList = await res.json();
      if (Array.isArray(dbList) && dbList.length > 0) {
        // Merge dengan list
        dbList.forEach(function (row) {
          var idx = RAMADHAN_KEGIATAN_LIST.findIndex(function (k) { return k.hari_ke === row.hari_ke; });
          if (idx !== -1) {
            RAMADHAN_KEGIATAN_LIST[idx].judul = row.judul || RAMADHAN_KEGIATAN_LIST[idx].judul;
            RAMADHAN_KEGIATAN_LIST[idx].deskripsi = row.deskripsi || RAMADHAN_KEGIATAN_LIST[idx].deskripsi;
          }
        });
        klonStorage.setItem('ramadhan_kegiatan_30', JSON.stringify(RAMADHAN_KEGIATAN_LIST));
      } else {
        // Belum ada data di database, seed otomatis jika memungkinkan
        seedKegiatanRamadhanKeSupabase();
      }
    }
  } catch (err) {
    console.warn('Gagal memuat kegiatan Ramadhan dari Supabase:', err);
  }

  return RAMADHAN_KEGIATAN_LIST;
}

async function seedKegiatanRamadhanKeSupabase() {
  if (typeof sbFetch !== 'function') return;
  try {
    var payload = RAMADHAN_KEGIATAN_LIST.map(function (item) {
      return {
        hari_ke: item.hari_ke,
        judul: item.judul,
        deskripsi: item.deskripsi
      };
    });
    await sbFetch('ramadhan_kegiatan', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Abaikan jika tabel belum ada di Supabase
  }
}

async function simpanSatuKegiatanRamadhan(hariKe, judul, deskripsi) {
  hariKe = parseInt(hariKe, 10);
  var idx = RAMADHAN_KEGIATAN_LIST.findIndex(function (k) { return k.hari_ke === hariKe; });
  if (idx !== -1) {
    RAMADHAN_KEGIATAN_LIST[idx].judul = judul;
    RAMADHAN_KEGIATAN_LIST[idx].deskripsi = deskripsi;
  }
  klonStorage.setItem('ramadhan_kegiatan_30', JSON.stringify(RAMADHAN_KEGIATAN_LIST));

  if (typeof sbFetch === 'function') {
    try {
      await sbFetch('ramadhan_kegiatan', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({
          hari_ke: hariKe,
          judul: judul,
          deskripsi: deskripsi
        })
      });
    } catch (e) {
      console.warn('Gagal menyimpan kegiatan ke Supabase:', e);
    }
  }
}

// ==============================================================================
// 5. PENANGANAN FILE BUKTI (GAMBAR & PDF)
// ==============================================================================
function kompresGambarCanvas(file, maxDimension, quality) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = reject;
    reader.onload = function (e) {
      var img = new Image();
      img.onerror = reject;
      img.onload = function () {
        var width = img.width;
        var height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg', quality || 0.82);
        canvas.toBlob(function (blob) {
          resolve({ blob: blob, dataUrl: dataUrl });
        }, 'image/jpeg', quality || 0.82);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadFileRamadhanKeStorage(fileOrBlob, fileName, mimeType) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Konfigurasi Supabase tidak ditemukan.');
  }

  var uploadUrl = SUPABASE_URL + '/storage/v1/object/' + SUPABASE_STORAGE_BUCKET + '/' + fileName;
  var res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': mimeType || 'application/octet-stream'
    },
    body: fileOrBlob
  });

  if (!res.ok) {
    var err = await res.text();
    throw new Error('Gagal mengunggah file ke cloud: ' + err);
  }

  return SUPABASE_URL + '/storage/v1/object/public/' + SUPABASE_STORAGE_BUCKET + '/' + fileName;
}

// ==============================================================================
// 6. MODAL & FITUR SISWA (BULAN RAMADHAN)
// ==============================================================================
async function bukaModalRamadhan() {
  var modal = document.getElementById('modalRamadhan');
  if (!modal) {
    buatElemenModalRamadhan();
    modal = document.getElementById('modalRamadhan');
  }

  await muatPengaturanRamadhan();
  await muatDaftarKegiatanRamadhan();

  // Muat submission siswa jika sedang login
  if (typeof SISWA !== 'undefined' && SISWA && SISWA.nis) {
    await muatSubmissionsSiswaRamadhan(SISWA.nis);
  }

  renderKalenderRamadhanSiswa();
  updateBannerRamadhanSiswa();

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function tutupModalRamadhan() {
  var modal = document.getElementById('modalRamadhan');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
  updateBannerRamadhanSiswa();
}

async function muatSubmissionsSiswaRamadhan(nis) {
  RAMADHAN_SISWA_SUBMISSIONS = {};
  var local = klonStorage.getItem('ramadhan_sub_' + nis);
  if (local) {
    try { RAMADHAN_SISWA_SUBMISSIONS = JSON.parse(local) || {}; } catch (e) {}
  }

  if (typeof sbFetch === 'function') {
    try {
      var res = await sbFetch('ramadhan_siswa?nis=eq.' + encodeURIComponent(nis));
      var rows = await res.json();
      if (Array.isArray(rows)) {
        rows.forEach(function (r) {
          RAMADHAN_SISWA_SUBMISSIONS[r.hari_ke] = r;
        });
        klonStorage.setItem('ramadhan_sub_' + nis, JSON.stringify(RAMADHAN_SISWA_SUBMISSIONS));
      }
    } catch (err) {
      console.warn('Gagal memuat hasil Ramadhan siswa dari Supabase:', err);
    }
  }
}

function renderKalenderRamadhanSiswa() {
  var container = document.getElementById('ramadhanDaysListContainer');
  if (!container) return;

  var hariAktifIni = getHariRamadhanSaatIni();
  var totalSelesai = Object.keys(RAMADHAN_SISWA_SUBMISSIONS).length;
  var persen = Math.round((totalSelesai / 30) * 100);

  // Update header progress
  var elCount = document.getElementById('ramadhanProgCountText');
  var elBar = document.getElementById('ramadhanProgBarFill');
  var elSub = document.getElementById('ramadhanModalSub');
  if (elCount) elCount.textContent = totalSelesai + ' dari 30 Hari Selesai (' + persen + '%)';
  if (elBar) elBar.style.width = persen + '%';
  if (elSub) {
    var startTgl = getTanggalRamadhanByHari(1);
    elSub.textContent = '1 Ramadhan Dimulai: ' + formatTanggalIndo(startTgl);
  }

  var html = '';
  for (var i = 1; i <= 30; i++) {
    var k = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === i; }) || {
      hari_ke: i,
      judul: 'Kegiatan Hari ke-' + i,
      deskripsi: ''
    };
    var tgl = getTanggalRamadhanByHari(i);
    var sub = RAMADHAN_SISWA_SUBMISSIONS[i];
    var isDone = !!sub;
    var isToday = (i === hariAktifIni);

    var cardCls = 'ramadhan-day-card' + (isDone ? ' is-done' : '') + (isToday ? ' is-today' : '');
    var badgeStatusHtml = '';

    if (isDone) {
      badgeStatusHtml = '<span class="day-card-status status-badge-done">✓ Selesai</span>';
    } else if (isToday) {
      badgeStatusHtml = '<span class="day-card-status status-badge-today">⚡ Hari Ini</span>';
    } else if (i < hariAktifIni) {
      badgeStatusHtml = '<span class="day-card-status status-badge-pending" style="color:#f87171;background:rgba(239,68,68,0.15);">⚠️ Terlewat</span>';
    } else {
      badgeStatusHtml = '<span class="day-card-status status-badge-pending">🕒 Akan Datang</span>';
    }

    var previewHtml = '';
    if (isDone) {
      var iconBukti = (sub.file_type === 'pdf' ? '📄 PDF' : '📷 Foto');
      previewHtml = '<div class="day-card-preview">' +
        '📍 <b>' + escHtml(sub.dimana || 'Lokasi') + '</b> • ' + iconBukti +
        (sub.status_verifikasi ? ' • <span style="color:#fde047;">' + escHtml(sub.status_verifikasi) + '</span>' : '') +
      '</div>';
    } else {
      previewHtml = '<div style="font-size:11.5px;color:var(--muted);">' + escHtml(k.deskripsi ? (k.deskripsi.substring(0, 75) + '...') : 'Ketuk untuk mengisi jurnal.') + '</div>';
    }

    html += '<div class="' + cardCls + '" onclick="bukaFormJurnalRamadhan(' + i + ')">' +
      '<div class="day-card-head">' +
        '<span class="day-num-badge">🌙 Hari ke-' + i + '</span>' +
        badgeStatusHtml +
      '</div>' +
      '<div class="day-card-title">' + escHtml(k.judul) + '</div>' +
      '<div class="day-card-date">📅 ' + formatTanggalIndo(tgl) + '</div>' +
      previewHtml +
    '</div>';
  }

  container.innerHTML = html;
}

function updateBannerRamadhanSiswa() {
  var banner = document.getElementById('bannerRamadhanCard');
  if (!banner) return;

  if (RAMADHAN_CONFIG.aktif === 'TIDAK') {
    banner.classList.add('hidden');
    return;
  }
  banner.classList.remove('hidden');

  var hariIni = getHariRamadhanSaatIni();
  var tglHariIni = getTanggalRamadhanByHari(hariIni);
  var totalSelesai = Object.keys(RAMADHAN_SISWA_SUBMISSIONS).length;
  var persen = Math.round((totalSelesai / 30) * 100);

  var kNow = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === hariIni; });
  var judulHariIni = kNow ? kNow.judul : 'Ibadah Ramadhan';

  var elTitle = document.getElementById('bannerRamadhanJudul');
  var elStatus = document.getElementById('bannerRamadhanStatus');
  var elBar = document.getElementById('bannerRamadhanBar');
  var elProgText = document.getElementById('bannerRamadhanProgText');

  if (elTitle) elTitle.textContent = RAMADHAN_CONFIG.judul || 'Jurnal Kegiatan Ramadhan';
  if (elStatus) elStatus.textContent = 'Hari ke-' + hariIni + ' (' + formatTanggalIndo(tglHariIni) + ') • ' + judulHariIni;
  if (elBar) elBar.style.width = persen + '%';
  if (elProgText) elProgText.textContent = totalSelesai + '/30 Hari (' + persen + '%)';
}

// ==============================================================================
// 7. FORM PENGISIAN JURNAL RAMADHAN SISWA (JUDUL, DIMANA, DAMPAK, BUKTI GAMBAR/PDF)
// ==============================================================================
function bukaFormJurnalRamadhan(hariKe) {
  hariKe = parseInt(hariKe, 10);
  RAMADHAN_SELECTED_HARI = hariKe;
  RAMADHAN_TEMP_FILE = null;

  var k = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === hariKe; }) || {
    hari_ke: hariKe,
    judul: 'Kegiatan Hari ke-' + hariKe,
    deskripsi: ''
  };
  var tgl = getTanggalRamadhanByHari(hariKe);

  document.getElementById('formRamadhanHariBadge').textContent = '🌙 Hari ke-' + hariKe;
  document.getElementById('formRamadhanTanggalText').textContent = '📅 ' + formatTanggalIndo(tgl);
  document.getElementById('formRamadhanJudulKegiatan').textContent = k.judul;
  document.getElementById('formRamadhanDeskripsi').textContent = k.deskripsi || '-';

  var sub = RAMADHAN_SISWA_SUBMISSIONS[hariKe];
  var inputLokasi = document.getElementById('ramadhanInputLokasi');
  var inputDampak = document.getElementById('ramadhanInputDampak');
  var previewZone = document.getElementById('ramadhanPreviewZone');
  var fileInput = document.getElementById('ramadhanFileInput');
  if (fileInput) fileInput.value = '';

  if (sub) {
    inputLokasi.value = sub.dimana || '';
    inputDampak.value = sub.dampak || '';
    // Tampilkan preview file yang sudah diunggah
    tampilkanPreviewBuktiExisting(sub.bukti_url, sub.file_type, sub.file_name);
    document.getElementById('btnSimpanJurnalRamadhan').textContent = '💾 Perbarui Jurnal Ramadhan';
  } else {
    inputLokasi.value = '';
    inputDampak.value = '';
    previewZone.innerHTML = '';
    previewZone.classList.add('hidden');
    document.getElementById('btnSimpanJurnalRamadhan').textContent = '💾 Simpan & Kirim Jurnal';
  }

  var modal = document.getElementById('modalFormJurnalRamadhan');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function tutupFormJurnalRamadhan() {
  var modal = document.getElementById('modalFormJurnalRamadhan');
  if (modal) modal.classList.add('hidden');
}

function setChipLokasi(lokasi) {
  var input = document.getElementById('ramadhanInputLokasi');
  if (input) {
    input.value = lokasi;
    input.focus();
  }
}

function handlePilihFileBukti(inputEl) {
  if (!inputEl.files || !inputEl.files[0]) return;
  var file = inputEl.files[0];
  var isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  var isImg = file.type.startsWith('image/');

  if (!isPdf && !isImg) {
    alert('File tidak didukung. Mohon pilih file foto (JPG, PNG) atau dokumen PDF.');
    inputEl.value = '';
    return;
  }

  // Batas ukuran 10MB
  if (file.size > 10 * 1024 * 1024) {
    alert('Ukuran file terlalu besar (maksimal 10MB).');
    inputEl.value = '';
    return;
  }

  var previewZone = document.getElementById('ramadhanPreviewZone');
  previewZone.classList.remove('hidden');
  previewZone.innerHTML = '<div style="padding:20px;text-align:center;color:var(--muted);">⏳ Memproses pratinjau file...</div>';

  if (isImg) {
    // Kompresi otomatis gambar agar upload secepat kilat
    kompresGambarCanvas(file, 1280, 0.82)
      .then(function (res) {
        RAMADHAN_TEMP_FILE = {
          blob: res.blob,
          dataUrl: res.dataUrl,
          type: 'image',
          name: file.name,
          size: res.blob.size
        };
        previewZone.innerHTML = '<div class="preview-img-box">' +
          '<img src="' + res.dataUrl + '" alt="Bukti Foto">' +
          '<div style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);">' +
            '<span style="font-size:12px;color:#fff;">📷 ' + escHtml(file.name) + ' (' + Math.round(res.blob.size / 1024) + ' KB)</span>' +
            '<button type="button" class="btn btn-sm btn-ghost" onclick="hapusFileBuktiTemp()" style="color:#f87171;">✕ Hapus</button>' +
          '</div>' +
        '</div>';
      })
      .catch(function (err) {
        console.error('Gagal memproses gambar:', err);
        alert('Gagal memproses gambar: ' + err.message);
        hapusFileBuktiTemp();
      });
  } else if (isPdf) {
    RAMADHAN_TEMP_FILE = {
      blob: file,
      dataUrl: null,
      type: 'pdf',
      name: file.name,
      size: file.size
    };
    var sizeStr = file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(file.size / 1024) + ' KB';
    previewZone.innerHTML = '<div class="preview-pdf-box">' +
      '<div class="preview-pdf-icon">📄</div>' +
      '<div class="preview-pdf-meta">' +
        '<div class="preview-pdf-name">' + escHtml(file.name) + '</div>' +
        '<div class="preview-pdf-size">Dokumen PDF • ' + sizeStr + ' • Siap Diunggah</div>' +
      '</div>' +
      '<button type="button" class="btn btn-sm btn-ghost" onclick="hapusFileBuktiTemp()" style="color:#f87171;">✕ Hapus</button>' +
    '</div>';
  }
}

function tampilkanPreviewBuktiExisting(url, fileType, fileName) {
  var previewZone = document.getElementById('ramadhanPreviewZone');
  if (!previewZone || !url) return;
  previewZone.classList.remove('hidden');

  if (fileType === 'pdf' || url.toLowerCase().indexOf('.pdf') !== -1) {
    previewZone.innerHTML = '<div class="preview-pdf-box">' +
      '<div class="preview-pdf-icon">📄</div>' +
      '<div class="preview-pdf-meta">' +
        '<div class="preview-pdf-name">' + escHtml(fileName || 'Dokumen_Bukti.pdf') + '</div>' +
        '<div class="preview-pdf-size">Dokumen PDF Tersimpan</div>' +
      '</div>' +
      '<a href="' + url + '" target="_blank" class="btn btn-sm btn-outline" style="color:#38bdf8;border-color:#38bdf8;">👁️ Buka PDF</a>' +
    '</div>';
  } else {
    previewZone.innerHTML = '<div class="preview-img-box">' +
      '<img src="' + url + '" alt="Bukti Foto Tersimpan">' +
      '<div style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);">' +
        '<span style="font-size:12px;color:#fff;">📷 Bukti Foto Tersimpan</span>' +
        '<a href="' + url + '" target="_blank" class="btn btn-sm btn-outline" style="color:#34d399;border-color:#34d399;">🔍 Lihat Full</a>' +
      '</div>' +
    '</div>';
  }
}

function hapusFileBuktiTemp() {
  RAMADHAN_TEMP_FILE = null;
  var fileInput = document.getElementById('ramadhanFileInput');
  if (fileInput) fileInput.value = '';
  var previewZone = document.getElementById('ramadhanPreviewZone');
  if (previewZone) {
    previewZone.innerHTML = '';
    previewZone.classList.add('hidden');
  }
}

async function simpanJurnalRamadhanSiswa() {
  if (typeof SISWA === 'undefined' || !SISWA || !SISWA.nis) {
    alert('Anda harus login sebagai siswa terlebih dahulu.');
    return;
  }

  var hariKe = RAMADHAN_SELECTED_HARI;
  var k = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === hariKe; });
  var judulKegiatan = k ? k.judul : ('Kegiatan Ramadhan Hari ke-' + hariKe);
  var tglObj = getTanggalRamadhanByHari(hariKe);
  var tglStr = formatDateISO(tglObj);

  var lokasi = (document.getElementById('ramadhanInputLokasi').value || '').trim();
  var dampak = (document.getElementById('ramadhanInputDampak').value || '').trim();

  if (!lokasi) {
    alert('Mohon isi kolom "Dimana" (lokasi pelaksanaan kegiatan).');
    document.getElementById('ramadhanInputLokasi').focus();
    return;
  }
  if (!dampak) {
    alert('Mohon isi kolom "Dampak" (hikmah & refleksi kegiatan).');
    document.getElementById('ramadhanInputDampak').focus();
    return;
  }

  var existingSub = RAMADHAN_SISWA_SUBMISSIONS[hariKe];
  var buktiUrl = existingSub ? existingSub.bukti_url : '';
  var fileType = existingSub ? (existingSub.file_type || 'image') : 'image';
  var fileName = existingSub ? (existingSub.file_name || '') : '';

  if (!RAMADHAN_TEMP_FILE && !buktiUrl) {
    alert('Mohon unggah bukti kegiatan berupa Foto/Gambar atau Dokumen PDF.');
    return;
  }

  var btn = document.getElementById('btnSimpanJurnalRamadhan');
  var origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳ Mengunggah Jurnal...';

  try {
    // Unggah file jika ada file baru yang dipilih
    if (RAMADHAN_TEMP_FILE) {
      btn.textContent = '⏳ Mengunggah File Bukti...';
      var ext = RAMADHAN_TEMP_FILE.type === 'pdf' ? 'pdf' : 'jpg';
      var uploadName = 'ramadhan_' + SISWA.nis + '_h' + hariKe + '_' + Date.now() + '.' + ext;
      var mime = RAMADHAN_TEMP_FILE.type === 'pdf' ? 'application/pdf' : 'image/jpeg';

      try {
        buktiUrl = await uploadFileRamadhanKeStorage(RAMADHAN_TEMP_FILE.blob, uploadName, mime);
        fileType = RAMADHAN_TEMP_FILE.type;
        fileName = RAMADHAN_TEMP_FILE.name;
      } catch (uploadErr) {
        console.warn('Gagal unggah ke storage bucket, gunakan fallback dataUrl/lokal:', uploadErr);
        if (RAMADHAN_TEMP_FILE.dataUrl) {
          buktiUrl = RAMADHAN_TEMP_FILE.dataUrl;
          fileType = 'image';
          fileName = RAMADHAN_TEMP_FILE.name;
        } else {
          throw uploadErr;
        }
      }
    }

    var record = {
      id: existingSub ? existingSub.id : ('RAM_' + Date.now() + '_' + Math.floor(Math.random() * 9000 + 1000)),
      nis: SISWA.nis,
      nama: SISWA.nama,
      kelas: SISWA.kelas,
      hari_ke: hariKe,
      tanggal: tglStr,
      judul_kegiatan: judulKegiatan,
      dimana: lokasi,
      dampak: dampak,
      bukti_url: buktiUrl,
      file_type: fileType,
      file_name: fileName,
      status_verifikasi: existingSub ? existingSub.status_verifikasi : 'Menunggu',
      catatan_guru: existingSub ? (existingSub.catatan_guru || '') : '',
      updated_at: new Date().toISOString()
    };

    // Simpan ke Supabase (tabel kloning_ramadhan_siswa)
    if (typeof sbFetch === 'function') {
      btn.textContent = '⏳ Menyimpan ke Database...';
      await sbFetch('ramadhan_siswa', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify(record)
      });
    }

    // Simpan ke cache memori & localStorage
    RAMADHAN_SISWA_SUBMISSIONS[hariKe] = record;
    klonStorage.setItem('ramadhan_sub_' + SISWA.nis, JSON.stringify(RAMADHAN_SISWA_SUBMISSIONS));

    tutupFormJurnalRamadhan();
    renderKalenderRamadhanSiswa();
    updateBannerRamadhanSiswa();

    if (typeof toast === 'function') {
      toast('Jurnal Ramadhan Hari ke-' + hariKe + ' berhasil disimpan! 🌙', 'ok');
    } else {
      alert('Jurnal Ramadhan Hari ke-' + hariKe + ' berhasil disimpan! 🌙');
    }
  } catch (err) {
    console.error('Gagal menyimpan jurnal Ramadhan:', err);
    alert('Terjadi kendala saat menyimpan jurnal: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = origText;
  }
}

// ==============================================================================
// 8. PANEL ADMIN: KELOLA 30 KEGIATAN & PANTAU HASIL SISWA
// ==============================================================================
async function initAdminRamadhan() {
  await muatPengaturanRamadhan();
  await muatDaftarKegiatanRamadhan();

  // Set input tanggal & status admin
  var elTgl = document.getElementById('adminRamadhanTglMulai');
  var elStatus = document.getElementById('adminRamadhanStatus');
  var elJudul = document.getElementById('adminRamadhanJudul');

  if (elTgl) elTgl.value = RAMADHAN_CONFIG.tgl_mulai || DEFAULT_RAMADHAN_CONFIG.tgl_mulai;
  if (elStatus) elStatus.value = RAMADHAN_CONFIG.aktif || 'YA';
  if (elJudul) elJudul.value = RAMADHAN_CONFIG.judul || 'Jurnal Kegiatan Ramadhan';

  renderAdminTabelKegiatan30();
  renderAdminFilterKelasRamadhan();
  await muatAdminHasilSiswaRamadhan();
}

function switchAdminRamadhanSubTab(tabName) {
  var isKegiatan = tabName === 'kegiatan';
  var paneKegiatan = document.getElementById('adminRamadhanPaneKegiatan');
  var paneHasil = document.getElementById('adminRamadhanPaneHasil');
  var btnKegiatan = document.getElementById('btnSubTabKegiatan');
  var btnHasil = document.getElementById('btnSubTabHasil');

  if (paneKegiatan) paneKegiatan.classList.toggle('hidden', !isKegiatan);
  if (paneHasil) paneHasil.classList.toggle('hidden', isKegiatan);
  if (btnKegiatan) btnKegiatan.classList.toggle('active', isKegiatan);
  if (btnHasil) btnHasil.classList.toggle('active', !isKegiatan);

  if (!isKegiatan) {
    muatAdminHasilSiswaRamadhan();
  }
}

function renderAdminTabelKegiatan30() {
  var tbody = document.getElementById('tbodyAdminKegiatanRamadhan');
  if (!tbody) return;

  var q = (document.getElementById('cariKegiatanRamadhanAdmin') ? document.getElementById('cariKegiatanRamadhanAdmin').value : '').toLowerCase().trim();

  var html = '';
  for (var i = 1; i <= 30; i++) {
    var k = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === i; }) || {
      hari_ke: i,
      judul: 'Kegiatan Hari ke-' + i,
      deskripsi: ''
    };
    var tgl = getTanggalRamadhanByHari(i);

    if (q) {
      var match = k.judul.toLowerCase().includes(q) || (k.deskripsi && k.deskripsi.toLowerCase().includes(q)) || ('hari ' + i).includes(q);
      if (!match) continue;
    }

    html += '<tr>' +
      '<td style="text-align:center;font-weight:800;color:#f59e0b;">' + i + '</td>' +
      '<td style="font-size:12px;color:var(--muted);white-space:nowrap;">' + formatTanggalIndo(tgl) + '</td>' +
      '<td>' +
        '<div style="font-weight:700;color:var(--text);font-size:13.5px;">' + escHtml(k.judul) + '</div>' +
        '<div style="font-size:11.5px;color:var(--muted);margin-top:2px;line-height:1.4;">' + escHtml(k.deskripsi || '-') + '</div>' +
      '</td>' +
      '<td style="text-align:center;white-space:nowrap;">' +
        '<button class="btn btn-sm btn-outline" onclick="bukaModalEditKegiatanRamadhan(' + i + ')" style="padding:4px 10px;">✏️ Edit</button>' +
      '</td>' +
    '</tr>';
  }

  tbody.innerHTML = html || '<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--muted);">Tidak ada kegiatan yang cocok.</td></tr>';
}

function bukaModalEditKegiatanRamadhan(hariKe) {
  hariKe = parseInt(hariKe, 10);
  var k = RAMADHAN_KEGIATAN_LIST.find(function (item) { return item.hari_ke === hariKe; }) || {
    hari_ke: hariKe,
    judul: '',
    deskripsi: ''
  };
  var tgl = getTanggalRamadhanByHari(hariKe);

  document.getElementById('editKegiatanHariKe').value = hariKe;
  document.getElementById('editKegiatanModalTitle').textContent = 'Edit Kegiatan Hari ke-' + hariKe;
  document.getElementById('editKegiatanTglText').textContent = 'Tanggal Pelaksanaan: ' + formatTanggalIndo(tgl);
  document.getElementById('editKegiatanJudul').value = k.judul || '';
  document.getElementById('editKegiatanDeskripsi').value = k.deskripsi || '';

  var modal = document.getElementById('modalEditKegiatanRamadhan');
  if (modal) modal.classList.remove('hidden');
}

function tutupModalEditKegiatanRamadhan() {
  var modal = document.getElementById('modalEditKegiatanRamadhan');
  if (modal) modal.classList.add('hidden');
}

async function simpanEditKegiatanRamadhan() {
  var hariKe = parseInt(document.getElementById('editKegiatanHariKe').value, 10);
  var judul = (document.getElementById('editKegiatanJudul').value || '').trim();
  var deskripsi = (document.getElementById('editKegiatanDeskripsi').value || '').trim();

  if (!judul) {
    alert('Judul kegiatan Ramadhan tidak boleh kosong.');
    return;
  }

  await simpanSatuKegiatanRamadhan(hariKe, judul, deskripsi);
  tutupModalEditKegiatanRamadhan();
  renderAdminTabelKegiatan30();

  if (typeof toast === 'function') {
    toast('Kegiatan Hari ke-' + hariKe + ' berhasil diperbarui!', 'ok');
  } else {
    alert('Kegiatan Hari ke-' + hariKe + ' berhasil diperbarui!');
  }
}

async function simpanPengaturanUmumRamadhanAdmin() {
  var tglMulai = (document.getElementById('adminRamadhanTglMulai').value || '').trim();
  var status = document.getElementById('adminRamadhanStatus').value;
  var judul = (document.getElementById('adminRamadhanJudul').value || '').trim();

  if (!tglMulai) {
    alert('Tanggal mulai Ramadhan harus ditentukan.');
    return;
  }

  await simpanPengaturanRamadhanKeSupabase({
    tgl_mulai: tglMulai,
    aktif: status,
    judul: judul || 'Jurnal Kegiatan Ramadhan'
  });

  renderAdminTabelKegiatan30();
  updateBannerRamadhanSiswa();

  if (typeof toast === 'function') {
    toast('Pengaturan Ramadhan berhasil disimpan!', 'ok');
  } else {
    alert('Pengaturan Ramadhan berhasil disimpan!');
  }
}

async function resetSemuaKegiatanRamadhanDefault() {
  if (!confirm('Apakah Anda yakin ingin mengembalikan seluruh 30 judul kegiatan Ramadhan ke standar Kemenag? Seluruh kustomisasi judul akan direset.')) {
    return;
  }

  RAMADHAN_KEGIATAN_LIST = JSON.parse(JSON.stringify(DEFAULT_RAMADHAN_KEGIATAN));
  klonStorage.setItem('ramadhan_kegiatan_30', JSON.stringify(RAMADHAN_KEGIATAN_LIST));
  await seedKegiatanRamadhanKeSupabase();

  renderAdminTabelKegiatan30();
  if (typeof toast === 'function') {
    toast('30 Kegiatan Ramadhan berhasil direset ke standar!', 'ok');
  } else {
    alert('30 Kegiatan Ramadhan berhasil direset ke standar!');
  }
}

// ==============================================================================
// 9. PANEL ADMIN: PANTAU & CEK HASIL SISWA (REKAPITULASI)
// ==============================================================================
async function muatAdminHasilSiswaRamadhan() {
  var tbody = document.getElementById('tbodyAdminHasilRamadhan');
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--muted);">⏳ Memuat seluruh data hasil siswa...</td></tr>';
  }

  try {
    if (typeof sbFetchAll === 'function') {
      RAMADHAN_ADMIN_SUBMISSIONS = await sbFetchAll('ramadhan_siswa?order=hari_ke.desc,created_at.desc');
    } else if (typeof sbFetch === 'function') {
      var res = await sbFetch('ramadhan_siswa?order=hari_ke.desc,created_at.desc&limit=1000');
      RAMADHAN_ADMIN_SUBMISSIONS = await res.json();
    }
  } catch (err) {
    console.warn('Gagal memuat hasil siswa dari Supabase:', err);
    RAMADHAN_ADMIN_SUBMISSIONS = [];
  }

  if (!Array.isArray(RAMADHAN_ADMIN_SUBMISSIONS)) {
    RAMADHAN_ADMIN_SUBMISSIONS = [];
  }

  renderAdminKpiRamadhan();
  renderAdminTabelHasilRamadhan();
}

function renderAdminFilterKelasRamadhan() {
  var select = document.getElementById('adminFilterRamadhanKelas');
  if (!select) return;

  var currentVal = select.value;
  var classes = [];
  if (typeof SISWA_ADMIN !== 'undefined' && Array.isArray(SISWA_ADMIN)) {
    SISWA_ADMIN.forEach(function (s) {
      if (s.kelas && !classes.includes(s.kelas)) classes.push(s.kelas);
    });
  }
  classes.sort();

  var optHtml = '<option value="all">🌟 Semua Kelas (' + classes.length + ' Kelas)</option>';
  classes.forEach(function (c) {
    optHtml += '<option value="' + escHtml(c) + '">' + escHtml(c) + '</option>';
  });
  select.innerHTML = optHtml;
  if (currentVal) select.value = currentVal;
}

function renderAdminKpiRamadhan() {
  var totalSiswa = (typeof SISWA_ADMIN !== 'undefined' && Array.isArray(SISWA_ADMIN) && SISWA_ADMIN.length) ? SISWA_ADMIN.length : 182;
  var totalJurnal = RAMADHAN_ADMIN_SUBMISSIONS.length;

  var hariIni = getHariRamadhanSaatIni();
  var submitHariIni = RAMADHAN_ADMIN_SUBMISSIONS.filter(function (r) { return r.hari_ke === hariIni; }).length;

  var uniqueSiswa = [];
  RAMADHAN_ADMIN_SUBMISSIONS.forEach(function (r) {
    if (!uniqueSiswa.includes(r.nis)) uniqueSiswa.push(r.nis);
  });
  var partisipasi = totalSiswa > 0 ? Math.round((uniqueSiswa.length / totalSiswa) * 100) : 0;

  var elTotSiswa = document.getElementById('kpiTotalSiswaRamadhan');
  var elTotJurnal = document.getElementById('kpiTotalJurnalRamadhan');
  var elHariIni = document.getElementById('kpiJurnalHariIniRamadhan');
  var elPartisipasi = document.getElementById('kpiPartisipasiRamadhan');

  if (elTotSiswa) elTotSiswa.textContent = totalSiswa;
  if (elTotJurnal) elTotJurnal.textContent = totalJurnal;
  if (elHariIni) elHariIni.textContent = submitHariIni + ' Siswa';
  if (elPartisipasi) elPartisipasi.textContent = partisipasi + '%';
}

function renderAdminTabelHasilRamadhan() {
  var tbody = document.getElementById('tbodyAdminHasilRamadhan');
  if (!tbody) return;

  var filterHari = document.getElementById('adminFilterRamadhanHari') ? document.getElementById('adminFilterRamadhanHari').value : 'all';
  var filterKelas = document.getElementById('adminFilterRamadhanKelas') ? document.getElementById('adminFilterRamadhanKelas').value : 'all';
  var filterStatus = document.getElementById('adminFilterRamadhanStatus') ? document.getElementById('adminFilterRamadhanStatus').value : 'all';
  var q = (document.getElementById('adminSearchRamadhan') ? document.getElementById('adminSearchRamadhan').value : '').toLowerCase().trim();

  var filtered = RAMADHAN_ADMIN_SUBMISSIONS.filter(function (r) {
    if (filterHari !== 'all' && String(r.hari_ke) !== filterHari) return false;
    if (filterKelas !== 'all' && r.kelas !== filterKelas) return false;
    if (filterStatus !== 'all' && (r.status_verifikasi || 'Menunggu') !== filterStatus) return false;
    if (q) {
      var match = (r.nama && r.nama.toLowerCase().includes(q)) ||
                  (r.nis && String(r.nis).includes(q)) ||
                  (r.dimana && r.dimana.toLowerCase().includes(q)) ||
                  (r.judul_kegiatan && r.judul_kegiatan.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  var countEl = document.getElementById('adminHasilRamadhanCount');
  if (countEl) countEl.textContent = 'Menampilkan ' + filtered.length + ' jurnal siswa';

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:28px;color:var(--muted);">Tidak ada jurnal Ramadhan yang sesuai dengan filter.</td></tr>';
    return;
  }

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var r = filtered[i];
    var isPdf = r.file_type === 'pdf' || (r.bukti_url && r.bukti_url.toLowerCase().indexOf('.pdf') !== -1);
    var buktiBtnHtml = '';

    if (r.bukti_url) {
      if (isPdf) {
        buktiBtnHtml = '<a href="' + r.bukti_url + '" target="_blank" class="btn btn-sm btn-outline" style="color:#ef4444;border-color:#fca5a5;padding:3px 8px;font-size:11px;" title="Buka Dokumen PDF">📄 PDF</a>';
      } else {
        buktiBtnHtml = '<img src="' + r.bukti_url + '" onclick="bukaModalPratinjauGambar(\'' + r.bukti_url + '\')" style="width:36px;height:36px;object-fit:cover;border-radius:6px;cursor:pointer;border:1px solid #10b981;" title="Klik untuk memperbesar">';
      }
    } else {
      buktiBtnHtml = '<span style="color:var(--muted);font-size:11px;">-</span>';
    }

    var stVerif = r.status_verifikasi || 'Menunggu';
    var stBadgeStyle = 'background:rgba(255,255,255,0.08);color:var(--muted);';
    if (stVerif === 'Disetujui') stBadgeStyle = 'background:#059669;color:#fff;';
    else if (stVerif === 'Perlu Revisi') stBadgeStyle = 'background:#dc2626;color:#fff;';
    else if (stVerif === 'Menunggu') stBadgeStyle = 'background:#d97706;color:#fff;';

    html += '<tr>' +
      '<td style="text-align:center;font-weight:700;">' + (i + 1) + '</td>' +
      '<td>' +
        '<span class="day-num-badge" style="font-size:11px;">🌙 H-' + r.hari_ke + '</span>' +
        '<div style="font-size:11px;color:var(--muted);margin-top:2px;">' + escHtml(r.tanggal || '-') + '</div>' +
      '</td>' +
      '<td>' +
        '<div style="font-weight:700;color:var(--text);">' + escHtml(r.nama) + '</div>' +
        '<div style="font-size:11px;color:var(--muted);">' + escHtml(r.nis) + ' • <b style="color:var(--primary);">' + escHtml(r.kelas) + '</b></div>' +
      '</td>' +
      '<td>' +
        '<div style="font-weight:600;font-size:12.5px;color:var(--text);">' + escHtml(r.judul_kegiatan || '-') + '</div>' +
      '</td>' +
      '<td>' +
        '<span style="font-size:12px;color:#a7f3d0;font-weight:600;">📍 ' + escHtml(r.dimana || '-') + '</span>' +
      '</td>' +
      '<td>' +
        '<div style="font-size:12px;color:var(--muted);max-width:240px;line-height:1.35;" title="' + escHtml(r.dampak || '') + '">' +
          escHtml(r.dampak ? (r.dampak.length > 70 ? r.dampak.substring(0, 70) + '...' : r.dampak) : '-') +
        '</div>' +
      '</td>' +
      '<td style="text-align:center;">' + buktiBtnHtml + '</td>' +
      '<td style="text-align:center;">' +
        '<span style="font-size:10.5px;font-weight:800;padding:3px 8px;border-radius:12px;' + stBadgeStyle + '">' + escHtml(stVerif) + '</span>' +
      '</td>' +
      '<td style="text-align:center;white-space:nowrap;">' +
        '<button class="btn btn-sm btn-outline" onclick="bukaModalPeriksaHasilRamadhan(\'' + r.id + '\')" style="padding:4px 10px;">🔍 Periksa</button>' +
      '</td>' +
    '</tr>';
  }

  tbody.innerHTML = html;
}

function bukaModalPeriksaHasilRamadhan(id) {
  var r = RAMADHAN_ADMIN_SUBMISSIONS.find(function (item) { return item.id === id; });
  if (!r) return;

  var modal = document.getElementById('modalDetailHasilRamadhanAdmin');
  if (!modal) return;

  document.getElementById('detailAdminId').value = r.id;
  document.getElementById('detailAdminNama').textContent = r.nama + ' (' + r.nis + ')';
  document.getElementById('detailAdminKelas').textContent = r.kelas;
  document.getElementById('detailAdminHari').textContent = '🌙 Hari ke-' + r.hari_ke + ' (' + (r.tanggal || '-') + ')';
  document.getElementById('detailAdminJudul').textContent = r.judul_kegiatan || '-';
  document.getElementById('detailAdminLokasi').textContent = r.dimana || '-';
  document.getElementById('detailAdminDampak').textContent = r.dampak || '-';
  document.getElementById('detailAdminCatatan').value = r.catatan_guru || '';

  // Set status verifikasi radio
  var st = r.status_verifikasi || 'Menunggu';
  var radio = modal.querySelector('input[name="verifStatus"][value="' + st + '"]');
  if (radio) radio.checked = true;

  // Preview Bukti File
  var buktiBox = document.getElementById('detailAdminBuktiContainer');
  var isPdf = r.file_type === 'pdf' || (r.bukti_url && r.bukti_url.toLowerCase().indexOf('.pdf') !== -1);
  if (r.bukti_url) {
    if (isPdf) {
      buktiBox.innerHTML = '<div class="preview-pdf-box" style="margin-top:6px;">' +
        '<div class="preview-pdf-icon">📄</div>' +
        '<div class="preview-pdf-meta">' +
          '<div class="preview-pdf-name">' + escHtml(r.file_name || 'Dokumen_Siswa.pdf') + '</div>' +
          '<div class="preview-pdf-size">Dokumen Bukti PDF Siswa</div>' +
        '</div>' +
        '<a href="' + r.bukti_url + '" target="_blank" class="btn btn-sm btn-primary">Buka Dokumen PDF ↗</a>' +
      '</div>';
    } else {
      buktiBox.innerHTML = '<div style="margin-top:6px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);">' +
        '<img src="' + r.bukti_url + '" style="width:100%;max-height:360px;object-fit:contain;background:#000;display:block;">' +
        '<div style="padding:8px 12px;background:rgba(0,0,0,0.6);display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-size:12px;color:#cbd5e1;">📷 Bukti Foto Siswa</span>' +
          '<a href="' + r.bukti_url + '" target="_blank" class="btn btn-sm btn-outline">Lihat Gambar Penuh ↗</a>' +
        '</div>' +
      '</div>';
    }
  } else {
    buktiBox.innerHTML = '<div style="color:var(--muted);font-size:12px;padding:12px;">Siswa tidak melampirkan file bukti.</div>';
  }

  modal.classList.remove('hidden');
}

function tutupModalPeriksaHasilRamadhan() {
  var modal = document.getElementById('modalDetailHasilRamadhanAdmin');
  if (modal) modal.classList.add('hidden');
}

async function simpanVerifikasiHasilRamadhan() {
  var id = document.getElementById('detailAdminId').value;
  var catatan = (document.getElementById('detailAdminCatatan').value || '').trim();
  var radio = document.querySelector('#modalDetailHasilRamadhanAdmin input[name="verifStatus"]:checked');
  var status = radio ? radio.value : 'Disetujui';

  var r = RAMADHAN_ADMIN_SUBMISSIONS.find(function (item) { return item.id === id; });
  if (r) {
    r.status_verifikasi = status;
    r.catatan_guru = catatan;
    r.updated_at = new Date().toISOString();
  }

  if (typeof sbFetch === 'function') {
    try {
      await sbFetch('ramadhan_siswa?id=eq.' + encodeURIComponent(id), {
        method: 'PATCH',
        body: JSON.stringify({
          status_verifikasi: status,
          catatan_guru: catatan,
          updated_at: new Date().toISOString()
        })
      });
    } catch (e) {
      console.warn('Gagal menyimpan verifikasi ke Supabase:', e);
    }
  }

  tutupModalPeriksaHasilRamadhan();
  renderAdminTabelHasilRamadhan();

  if (typeof toast === 'function') {
    toast('Hasil jurnal siswa berhasil diverifikasi! (' + status + ')', 'ok');
  } else {
    alert('Hasil jurnal siswa berhasil diverifikasi!');
  }
}

// ==============================================================================
// 10. EKSPOR REKAPITULASI HASIL RAMADHAN KE EXCEL (XLSX)
// ==============================================================================
function eksporRekapRamadhanKeExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Library Excel (XLSX) belum siap. Silakan muat ulang halaman.');
    return;
  }

  if (!RAMADHAN_ADMIN_SUBMISSIONS || RAMADHAN_ADMIN_SUBMISSIONS.length === 0) {
    alert('Belum ada data jurnal Ramadhan siswa untuk diekspor.');
    return;
  }

  var filterHari = document.getElementById('adminFilterRamadhanHari') ? document.getElementById('adminFilterRamadhanHari').value : 'all';
  var filterKelas = document.getElementById('adminFilterRamadhanKelas') ? document.getElementById('adminFilterRamadhanKelas').value : 'all';

  var dataToExport = RAMADHAN_ADMIN_SUBMISSIONS.filter(function (r) {
    if (filterHari !== 'all' && String(r.hari_ke) !== filterHari) return false;
    if (filterKelas !== 'all' && r.kelas !== filterKelas) return false;
    return true;
  });

  if (dataToExport.length === 0) {
    alert('Tidak ada data yang memenuhi kriteria filter saat ini.');
    return;
  }

  // Header Excel
  var rows = [
    ['REKAPITULASI JURNAL IBADAH BULAN RAMADHAN'],
    ['Waktu Ekspor:', new Date().toLocaleString('id-ID')],
    ['Total Catatan:', dataToExport.length],
    [],
    [
      'No',
      'Hari Ke',
      'Tanggal Pelaksanaan',
      'NIS',
      'Nama Siswa',
      'Kelas',
      'Judul Kegiatan',
      'Dimana (Lokasi)',
      'Dampak (Hikmah & Refleksi)',
      'Tipe Bukti',
      'Link Bukti Dokumen/Foto',
      'Status Verifikasi',
      'Catatan Guru / Penilai',
      'Waktu Pengisian'
    ]
  ];

  dataToExport.forEach(function (r, idx) {
    rows.push([
      idx + 1,
      'Hari ke-' + r.hari_ke,
      r.tanggal || '',
      r.nis || '',
      r.nama || '',
      r.kelas || '',
      r.judul_kegiatan || '',
      r.dimana || '',
      r.dampak || '',
      r.file_type === 'pdf' ? 'PDF' : 'Gambar/Foto',
      r.bukti_url || '',
      r.status_verifikasi || 'Menunggu',
      r.catatan_guru || '',
      r.created_at ? new Date(r.created_at).toLocaleString('id-ID') : ''
    ]);
  });

  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);

  // Auto width columns
  var colWidths = [
    { wch: 6 },  // No
    { wch: 12 }, // Hari Ke
    { wch: 18 }, // Tanggal
    { wch: 12 }, // NIS
    { wch: 25 }, // Nama
    { wch: 12 }, // Kelas
    { wch: 32 }, // Judul Kegiatan
    { wch: 20 }, // Dimana
    { wch: 45 }, // Dampak
    { wch: 12 }, // Tipe Bukti
    { wch: 40 }, // Link Bukti
    { wch: 16 }, // Status Verifikasi
    { wch: 25 }, // Catatan Guru
    { wch: 20 }  // Waktu
  ];
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, 'Jurnal_Ramadhan');

  var tglStr = formatDateISO(new Date());
  var fileName = 'Rekap_Jurnal_Ramadhan_' + (filterKelas !== 'all' ? (filterKelas + '_') : '') + tglStr + '.xlsx';
  XLSX.writeFile(wb, fileName);

  if (typeof toast === 'function') {
    toast('File Excel rekap Ramadhan berhasil diunduh! 📥', 'ok');
  }
}

// ==============================================================================
// 10B. FITUR TEMPLATE & IMPOR 30 AGENDA KEGIATAN RAMADHAN DARI EXCEL
// ==============================================================================
var PARSED_IMPORT_RAMADHAN = [];

function unduhTemplateExcelKegiatanRamadhan() {
  if (typeof XLSX === 'undefined') {
    alert('Library Excel (XLSX) sedang dimuat. Silakan tunggu sesaat atau muat ulang halaman.');
    return;
  }

  var startTgl = getRamadhanStartDate();
  var startStr = RAMADHAN_CONFIG.tgl_mulai || DEFAULT_RAMADHAN_CONFIG.tgl_mulai;
  var hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var bulanArr = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  var rows = [
    ['Hari Ke', 'Nama Hari', 'Tanggal Pelaksanaan', 'Tanggal Lengkap', 'Judul Kegiatan Ramadhan', 'Deskripsi / Panduan Pelaksanaan']
  ];

  for (var i = 1; i <= 30; i++) {
    var d = getTanggalRamadhanByHari(i);
    var namaHari = hariArr[d.getDay()];
    var tglISO = formatDateISO(d);
    var tglLengkap = namaHari + ', ' + d.getDate() + ' ' + bulanArr[d.getMonth()] + ' ' + d.getFullYear();

    var existing = (RAMADHAN_KEGIATAN_LIST && RAMADHAN_KEGIATAN_LIST.find(function (k) { return k.hari_ke === i; })) ||
                   (DEFAULT_RAMADHAN_KEGIATAN.find(function (k) { return k.hari_ke === i; })) || { judul: '', deskripsi: '' };

    rows.push([
      i,
      namaHari,
      tglISO,
      tglLengkap,
      existing.judul || ('Agenda Kegiatan Ramadhan Hari Ke-' + i),
      existing.deskripsi || ''
    ]);
  }

  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);

  ws['!cols'] = [
    { wch: 10 }, // Hari Ke
    { wch: 12 }, // Nama Hari
    { wch: 20 }, // Tanggal Pelaksanaan (YYYY-MM-DD)
    { wch: 28 }, // Tanggal Lengkap
    { wch: 38 }, // Judul Kegiatan Ramadhan
    { wch: 70 }  // Deskripsi / Panduan Pelaksanaan
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Agenda_Ramadhan');
  var fileName = 'Template_30_Kegiatan_Ramadhan_' + (startStr || '2026') + '.xlsx';
  XLSX.writeFile(wb, fileName);

  if (typeof toast === 'function') {
    toast('Template Excel 30 Hari Kegiatan Ramadhan berhasil diunduh! Tanggal sudah otomatis terisi. 📥', 'ok');
  }
}

function bukaModalImporKegiatanRamadhan() {
  buatElemenModalRamadhan();
  var modal = document.getElementById('modalImporKegiatanRamadhan');
  if (modal) modal.classList.remove('hidden');

  PARSED_IMPORT_RAMADHAN = [];
  var fileInput = document.getElementById('fileInputImporKegiatanRamadhan');
  if (fileInput) fileInput.value = '';

  var previewBox = document.getElementById('previewImporKegiatanRamadhan');
  if (previewBox) {
    previewBox.classList.add('hidden');
    previewBox.innerHTML = '';
  }

  var btnSimpan = document.getElementById('btnSimpanImporKegiatanRamadhan');
  if (btnSimpan) btnSimpan.disabled = true;

  var infoTglMulai = document.getElementById('infoTglMulaiImporRamadhan');
  if (infoTglMulai) {
    var startTgl = getRamadhanStartDate();
    infoTglMulai.textContent = formatTanggalIndo(startTgl);
  }

  // Set drag and drop listeners
  var dropZone = document.getElementById('dropZoneImporKegiatanRamadhan');
  if (dropZone && !dropZone._hasDropListener) {
    dropZone._hasDropListener = true;
    dropZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.style.borderColor = '#10b981';
      dropZone.style.background = 'rgba(16,185,129,0.1)';
    });
    dropZone.addEventListener('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.style.borderColor = 'rgba(255,255,255,0.25)';
      dropZone.style.background = 'rgba(255,255,255,0.02)';
    });
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.style.borderColor = 'rgba(255,255,255,0.25)';
      dropZone.style.background = 'rgba(255,255,255,0.02)';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileImporKegiatanRamadhan({ files: e.dataTransfer.files });
      }
    });
  }
}

function tutupModalImporKegiatanRamadhan() {
  var modal = document.getElementById('modalImporKegiatanRamadhan');
  if (modal) modal.classList.add('hidden');
}

function handleFileImporKegiatanRamadhan(inputEl) {
  var file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;

  if (typeof XLSX === 'undefined') {
    alert('Library Excel (XLSX) belum siap. Silakan muat ulang halaman.');
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var firstSheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheetName];
      var jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      if (!jsonRows || jsonRows.length < 2) {
        alert('File Excel kosong atau tidak memiliki baris data kegiatan.');
        return;
      }

      // Deteksi header kolom
      var headerRow = jsonRows[0].map(function(h) { return String(h || '').trim().toLowerCase(); });
      var colHariKe = -1;
      var colJudul = -1;
      var colDeskripsi = -1;

      for (var c = 0; c < headerRow.length; c++) {
        var colName = headerRow[c];
        if (colHariKe === -1 && (colName.indexOf('hari ke') !== -1 || colName === 'hari' || colName === 'no' || colName === 'day')) {
          colHariKe = c;
        } else if (colJudul === -1 && (colName.indexOf('judul') !== -1 || colName.indexOf('kegiatan') !== -1 || colName.indexOf('agenda') !== -1 || colName.indexOf('tema') !== -1)) {
          colJudul = c;
        } else if (colDeskripsi === -1 && (colName.indexOf('deskripsi') !== -1 || colName.indexOf('panduan') !== -1 || colName.indexOf('uraian') !== -1 || colName.indexOf('keterangan') !== -1 || colName.indexOf('rincian') !== -1)) {
          colDeskripsi = c;
        }
      }

      if (colJudul === -1) {
        colJudul = headerRow.length > 4 ? 4 : (headerRow.length > 3 ? 3 : (headerRow.length > 1 ? 1 : 0));
      }
      if (colDeskripsi === -1) {
        colDeskripsi = headerRow.length > 5 ? 5 : (headerRow.length > 2 ? 2 : -1);
      }
      if (colHariKe === -1) colHariKe = 0;

      var parsedList = [];
      var seenHari = {};

      for (var r = 1; r < jsonRows.length; r++) {
        var row = jsonRows[r];
        if (!row || row.length === 0) continue;

        var rawHari = row[colHariKe];
        var hariNum = parseInt(String(rawHari).replace(/\D/g, ''), 10);
        if (isNaN(hariNum) || hariNum < 1 || hariNum > 30) {
          if (parsedList.length < 30) {
            hariNum = parsedList.length + 1;
          } else {
            continue;
          }
        }

        var judul = String(row[colJudul] || '').trim();
        var deskripsi = colDeskripsi !== -1 ? String(row[colDeskripsi] || '').trim() : '';

        if (!judul && !deskripsi) continue;

        if (!seenHari[hariNum]) {
          seenHari[hariNum] = true;
          parsedList.push({
            hari_ke: hariNum,
            judul: judul || ('Agenda Kegiatan Ramadhan Hari Ke-' + hariNum),
            deskripsi: deskripsi
          });
        }
      }

      parsedList.sort(function(a, b) { return a.hari_ke - b.hari_ke; });

      if (parsedList.length === 0) {
        alert('Gagal membaca data kegiatan dari file Excel. Pastikan file sesuai format template.');
        return;
      }

      // Pastikan genap 30 hari
      var final30 = [];
      for (var d = 1; d <= 30; d++) {
        var item = parsedList.find(function(p) { return p.hari_ke === d; });
        if (!item) {
          var defItem = (RAMADHAN_KEGIATAN_LIST && RAMADHAN_KEGIATAN_LIST.find(function(k) { return k.hari_ke === d; })) ||
                         DEFAULT_RAMADHAN_KEGIATAN.find(function(def) { return def.hari_ke === d; });
          item = {
            hari_ke: d,
            judul: defItem ? defItem.judul : ('Agenda Kegiatan Hari Ke-' + d),
            deskripsi: defItem ? defItem.deskripsi : ''
          };
        }
        final30.push(item);
      }

      PARSED_IMPORT_RAMADHAN = final30;
      tampilkanPreviewImporKegiatan(final30, parsedList.length, file.name);

      var btnSimpan = document.getElementById('btnSimpanImporKegiatanRamadhan');
      if (btnSimpan) btnSimpan.disabled = false;

    } catch (err) {
      console.error('Error membaca file Excel:', err);
      alert('Terjadi kesalahan saat memproses file Excel: ' + (err.message || err));
    }
  };
  reader.readAsArrayBuffer(file);
}

function tampilkanPreviewImporKegiatan(list, countFound, fileName) {
  var previewBox = document.getElementById('previewImporKegiatanRamadhan');
  if (!previewBox) return;

  previewBox.classList.remove('hidden');

  var html =
    '<div style="background:rgba(16,185,129,0.12); border:1.5px solid #10b981; border-radius:12px; padding:12px 14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">' +
      '<div>' +
        '<div style="font-weight:800; font-size:13.5px; color:#10b981; display:flex; align-items:center; gap:6px;">' +
          '<span>✅</span>' +
          '<span>Berhasil Membaca ' + countFound + ' Kegiatan dari File: "' + escHtml(fileName || 'Excel') + '"</span>' +
        '</div>' +
        '<div style="font-size:12px; color:var(--text); margin-top:2px;">' +
          'Hari ke-1 s/d 30 dan tanggal pelaksanaan sudah otomatis disinkronkan. Klik <b>"Simpan & Terapkan"</b> di bawah untuk menyimpan.' +
        '</div>' +
      '</div>' +
      '<span class="badge l" style="font-weight:700; font-size:12px; background:#059669; color:#fff; padding:4px 10px; border-radius:10px;">30 Hari Lengkap</span>' +
    '</div>' +
    '<div style="max-height:280px; overflow-y:auto; border:1px solid rgba(255,255,255,0.1); border-radius:10px;">' +
      '<table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">' +
        '<thead>' +
          '<tr style="background:rgba(255,255,255,0.06); position:sticky; top:0; z-index:2; border-bottom:1.5px solid rgba(255,255,255,0.1);">' +
            '<th style="padding:8px 10px; width:45px; text-align:center;">Hari</th>' +
            '<th style="padding:8px 10px; width:150px;">Tanggal Pelaksanaan</th>' +
            '<th style="padding:8px 10px; width:200px;">Judul Kegiatan</th>' +
            '<th style="padding:8px 10px;">Panduan / Deskripsi</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>';

  list.forEach(function(item) {
    var tgl = getTanggalRamadhanByHari(item.hari_ke);
    html +=
      '<tr style="border-bottom:1px solid rgba(255,255,255,0.05);">' +
        '<td style="padding:8px 10px; text-align:center; font-weight:800; color:#f59e0b;">' + item.hari_ke + '</td>' +
        '<td style="padding:8px 10px; color:var(--muted); font-size:11.5px; white-space:nowrap;">' + escHtml(formatTanggalIndo(tgl)) + '</td>' +
        '<td style="padding:8px 10px; font-weight:700; color:var(--text);">' + escHtml(item.judul) + '</td>' +
        '<td style="padding:8px 10px; color:var(--muted); font-size:11.5px; line-height:1.35;">' + escHtml(item.deskripsi || '-') + '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  previewBox.innerHTML = html;
}

async function simpanHasilImporKegiatanRamadhan() {
  if (!PARSED_IMPORT_RAMADHAN || PARSED_IMPORT_RAMADHAN.length !== 30) {
    alert('Data kegiatan belum siap untuk disimpan.');
    return;
  }

  var btn = document.getElementById('btnSimpanImporKegiatanRamadhan');
  var oldText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ Menyimpan 30 Kegiatan...';
  }

  try {
    RAMADHAN_KEGIATAN_LIST = JSON.parse(JSON.stringify(PARSED_IMPORT_RAMADHAN));
    klonStorage.setItem('ramadhan_kegiatan_30', JSON.stringify(RAMADHAN_KEGIATAN_LIST));

    await seedKegiatanRamadhanKeSupabase();

    tutupModalImporKegiatanRamadhan();
    renderAdminTabelKegiatan30();

    if (typeof toast === 'function') {
      toast('Alhamdulillah! 30 kegiatan Ramadhan dari Excel berhasil diimpor & diterapkan!', 'ok');
    } else {
      alert('30 kegiatan Ramadhan dari Excel berhasil diimpor & diterapkan!');
    }
  } catch (err) {
    console.error('Gagal menyimpan hasil impor:', err);
    alert('Terjadi kesalahan saat menyimpan: ' + (err.message || err));
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = oldText;
    }
  }
}

// ==============================================================================
// 11. MODAL PRATINJAU GAMBAR & SALIN QUERY SQL
// ==============================================================================
function bukaModalPratinjauGambar(url) {
  if (typeof bukaPreviewFotoModal === 'function') {
    bukaPreviewFotoModal(url);
    return;
  }
  var w = window.open('', '_blank');
  if (w) {
    w.document.write('<html><head><title>Bukti Foto Ramadhan</title></head><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;"><img src="' + url + '" style="max-width:100%;max-height:100%;object-fit:contain;"></body></html>');
  }
}

function bukaModalSqlRamadhan() {
  var modal = document.getElementById('modalSqlRamadhan');
  if (modal) modal.classList.remove('hidden');
}

function tutupModalSqlRamadhan() {
  var modal = document.getElementById('modalSqlRamadhan');
  if (modal) modal.classList.add('hidden');
}

function salinSqlRamadhan() {
  var sqlEl = document.getElementById('teksSqlRamadhan');
  if (!sqlEl) return;
  var sql = sqlEl.textContent || sqlEl.value;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(sql).then(function () {
      alert('Skrip SQL Ramadhan berhasil disalin ke clipboard! Silakan jalankan di SQL Editor Supabase Anda.');
    });
  }
}

// ==============================================================================
// 12. PEMBUATAN STRUKTUR MODAL DI DOM HTML
// ==============================================================================
function buatElemenModalRamadhan() {
  if (document.getElementById('modalRamadhan')) return;

  var wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <!-- ============ MODAL UTAMA BULAN RAMADHAN (SISWA) ============ -->
    <div id="modalRamadhan" class="modal center hidden" style="z-index: 99990;">
      <div class="modal-box" style="max-width: 760px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; padding: 20px;">
        <div class="modal-head" style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
          <div>
            <h3 style="display:flex; align-items:center; gap:8px; margin:0; font-size:17px; color:#f59e0b;">
              <span>🌙</span>
              <span>Jurnal Ibadah Bulan Ramadhan</span>
            </h3>
            <div id="ramadhanModalSub" style="font-size:12px; color:var(--muted); margin-top:2px;">
              Catatan harian 30 hari ibadah & amalan Ramadhan
            </div>
          </div>
          <button class="close-x" onclick="tutupModalRamadhan()">&times;</button>
        </div>

        <!-- Progress Capaian Siswa -->
        <div style="background:rgba(6,78,59,0.3); border:1px solid rgba(16,185,129,0.3); border-radius:14px; padding:12px 14px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:12px; font-weight:700; color:#a7f3d0;">✨ Progres Jurnal Ramadhan Kamu:</span>
            <span id="ramadhanProgCountText" style="font-size:12px; font-weight:800; color:#fbbf24;">0 dari 30 Hari Selesai (0%)</span>
          </div>
          <div style="height:8px; border-radius:10px; background:rgba(0,0,0,0.3); overflow:hidden;">
            <div id="ramadhanProgBarFill" style="height:100%; border-radius:10px; background:linear-gradient(90deg, #10b981, #f59e0b); width:0%; transition:width 0.4s ease;"></div>
          </div>
        </div>

        <div style="font-size:12px; color:var(--muted); margin-bottom:6px;">
          Ketuk kartu hari di bawah ini untuk mengisi judul kegiatan, lokasi, dampak & bukti (foto/PDF):
        </div>

        <!-- Daftar 30 Hari Ramadhan -->
        <div id="ramadhanDaysListContainer" class="ramadhan-days-grid" style="flex:1; overflow-y:auto; padding-right:4px; max-height:58vh;">
        </div>
      </div>
    </div>

    <!-- ============ MODAL FORM JURNAL RAMADHAN SISWA ============ -->
    <div id="modalFormJurnalRamadhan" class="modal center hidden" style="z-index: 99995;">
      <div class="modal-box" style="max-width: 540px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 20px;">
        <div class="modal-head" style="margin-bottom: 12px;">
          <div>
            <div id="formRamadhanHariBadge" class="ramadhan-badge-pill">🌙 Hari ke-1</div>
            <div id="formRamadhanTanggalText" style="font-size:12px; color:var(--muted);">📅 Tanggal</div>
          </div>
          <button class="close-x" onclick="tutupFormJurnalRamadhan()">&times;</button>
        </div>

        <!-- Info Judul Kegiatan dari Admin -->
        <div style="background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.35); border-radius:14px; padding:12px 14px; margin-bottom:16px;">
          <div style="font-size:11px; font-weight:800; color:#fbbf24; text-transform:uppercase; letter-spacing:0.5px;">Judul Agenda Kegiatan:</div>
          <div id="formRamadhanJudulKegiatan" style="font-size:15px; font-weight:800; color:#ffffff; margin:4px 0 2px;">-</div>
          <div id="formRamadhanDeskripsi" style="font-size:12px; color:#fde68a; line-height:1.4;">-</div>
        </div>

        <!-- Input 1: Dimana (Lokasi) -->
        <div class="ramadhan-form-group">
          <label for="ramadhanInputLokasi">📍 Dimana kegiatan ini dilaksanakan?</label>
          <input type="text" id="ramadhanInputLokasi" placeholder="Contoh: Masjid Jami' Baiturrahim / Rumah..." style="width:100%; box-sizing:border-box;">
          <div class="ramadhan-chips">
            <span class="ramadhan-chip" onclick="setChipLokasi('Masjid')">🕌 Masjid</span>
            <span class="ramadhan-chip" onclick="setChipLokasi('Rumah')">🏠 Rumah</span>
            <span class="ramadhan-chip" onclick="setChipLokasi('Musholla Sekolah')">🏫 Sekolah</span>
            <span class="ramadhan-chip" onclick="setChipLokasi('Musholla Lingkungan')">💧 Musholla</span>
            <span class="ramadhan-chip" onclick="setChipLokasi('Lingkungan Warga')">👥 Lingkungan</span>
          </div>
        </div>

        <!-- Input 2: Dampak (Hikmah & Refleksi) -->
        <div class="ramadhan-form-group">
          <label for="ramadhanInputDampak">💡 Dampak, hikmah & perasaan setelah berkegiatan:</label>
          <textarea id="ramadhanInputDampak" rows="3" placeholder="Ceritakan dampak positif, hikmah, atau perasaan yang kamu rasakan setelah melaksanakan kegiatan ini..." style="width:100%; box-sizing:border-box; border-radius:10px; font-family:inherit; font-size:13px;"></textarea>
        </div>

        <!-- Input 3: Bukti (Gambar Foto atau Dokumen PDF) -->
        <div class="ramadhan-form-group">
          <label>📎 Bukti Pelaksanaan (Foto Gambar / Dokumen PDF):</label>
          <div class="ramadhan-upload-box" onclick="document.getElementById('ramadhanFileInput').click()">
            <div style="font-size:28px; margin-bottom:4px;">📷 / 📄</div>
            <div style="font-weight:700; font-size:13px; color:var(--text);">Ketuk untuk Pilih Foto atau File PDF</div>
            <div style="font-size:11px; color:var(--muted); margin-top:2px;">Format yang didukung: JPG, PNG, WEBP, atau PDF (Maks. 10MB)</div>
          </div>
          <input type="file" id="ramadhanFileInput" accept="image/*,application/pdf" style="display:none;" onchange="handlePilihFileBukti(this)">

          <!-- Pratinjau Bukti -->
          <div id="ramadhanPreviewZone" class="ramadhan-preview-zone hidden"></div>
        </div>

        <button type="button" id="btnSimpanJurnalRamadhan" class="btn btn-primary btn-block-mt" onclick="simpanJurnalRamadhanSiswa()" style="background:#059669; border-color:#047857; font-weight:800; font-size:14px; padding:12px;">
          💾 Simpan & Kirim Jurnal
        </button>
      </div>
    </div>

    <!-- ============ MODAL EDIT KEGIATAN RAMADHAN (ADMIN) ============ -->
    <div id="modalEditKegiatanRamadhan" class="modal center hidden" style="z-index: 99996;">
      <div class="modal-box" style="max-width: 520px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 20px;">
        <div class="modal-head" style="margin-bottom: 12px;">
          <div>
            <h3 id="editKegiatanModalTitle" style="margin:0; font-size:16px;">Edit Kegiatan Ramadhan</h3>
            <div id="editKegiatanTglText" style="font-size:12px; color:var(--muted); margin-top:2px;">-</div>
          </div>
          <button class="close-x" onclick="tutupModalEditKegiatanRamadhan()">&times;</button>
        </div>
        <input type="hidden" id="editKegiatanHariKe">

        <div style="margin-bottom:12px;">
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Judul Kegiatan Ramadhan</label>
          <input type="text" id="editKegiatanJudul" placeholder="Contoh: Tadarus Al-Qur'an & Target Khatam" style="width:100%; box-sizing:border-box;">
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Deskripsi / Panduan Pelaksanaan untuk Siswa</label>
          <textarea id="editKegiatanDeskripsi" rows="3" placeholder="Tuliskan panduan atau instruksi kegiatan untuk siswa..." style="width:100%; box-sizing:border-box; border-radius:10px; font-family:inherit; font-size:13px;"></textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button type="button" class="btn btn-ghost" onclick="tutupModalEditKegiatanRamadhan()">Batal</button>
          <button type="button" class="btn btn-admin" onclick="simpanEditKegiatanRamadhan()">💾 Simpan Perubahan</button>
        </div>
      </div>
    </div>

    <!-- ============ MODAL IMPOR KEGIATAN RAMADHAN DARI EXCEL (ADMIN) ============ -->
    <div id="modalImporKegiatanRamadhan" class="modal center hidden" style="z-index: 99998;">
      <div class="modal-box" style="max-width: 740px; width: 95%; max-height: 92vh; overflow-y: auto; padding: 22px;">
        <div class="modal-head" style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
          <div>
            <h3 style="display:flex; align-items:center; gap:8px; margin:0; font-size:16.5px; color:#f59e0b;">
              <span>📤</span>
              <span>Impor 30 Agenda Kegiatan Ramadhan dari Excel</span>
            </h3>
            <div style="font-size:12px; color:var(--muted); margin-top:3px;">
              Unggah file Excel (.xlsx / .xls / .csv) untuk memperbarui 30 judul & panduan kegiatan Ramadhan sekaligus.
            </div>
          </div>
          <button class="close-x" onclick="tutupModalImporKegiatanRamadhan()">&times;</button>
        </div>

        <!-- Langkah 1: Download Template yang Hari & Tanggalnya Sudah Otomatis Ada -->
        <div style="background:rgba(245,158,11,0.08); border:1.5px solid rgba(245,158,11,0.3); border-radius:12px; padding:12px 14px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <div style="font-weight:800; font-size:13px; color:#fbbf24; display:flex; align-items:center; gap:6px;">
                <span>💡</span>
                <span>Format Template Sudah Otomatis Lengkap dengan Hari & Tanggal</span>
              </div>
              <div style="font-size:12px; color:var(--text); margin-top:2px;">
                Hari ke-1 s/d 30 dan tanggal pelaksanaan otomatis dihitung dari <b>1 Ramadhan (<span id="infoTglMulaiImporRamadhan">-</span>)</b>.
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="unduhTemplateExcelKegiatanRamadhan()" style="background:rgba(255,255,255,0.08); border-color:#f59e0b; color:#fbbf24; font-weight:700; white-space:nowrap;">
              📥 Unduh Template Excel (.xlsx)
            </button>
          </div>
        </div>

        <!-- Langkah 2: Area Upload File Excel -->
        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:6px;">📁 Pilih File Excel yang Sudah Diisi / Diedit:</label>
          <div id="dropZoneImporKegiatanRamadhan" class="ramadhan-upload-box" style="border:2px dashed rgba(255,255,255,0.25); border-radius:14px; padding:22px; text-align:center; cursor:pointer; background:rgba(255,255,255,0.02); transition:all 0.2s;" onclick="document.getElementById('fileInputImporKegiatanRamadhan').click()">
            <div style="font-size:32px; margin-bottom:6px;">📊</div>
            <div style="font-weight:700; font-size:13.5px; color:var(--text);">Klik di sini atau Tarik (Drag & Drop) File Excel ke Sini</div>
            <div style="font-size:11.5px; color:var(--muted); margin-top:4px;">Mendukung format Microsoft Excel (.xlsx, .xls) atau CSV</div>
          </div>
          <input type="file" id="fileInputImporKegiatanRamadhan" accept=".xlsx, .xls, .csv" style="display:none;" onchange="handleFileImporKegiatanRamadhan(this)">
        </div>

        <!-- Langkah 3: Pratinjau / Preview Data -->
        <div id="previewImporKegiatanRamadhan" class="hidden" style="margin-bottom:16px;"></div>

        <!-- Aksi Tombol -->
        <div style="display:flex; justify-content:flex-end; gap:8px; border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;">
          <button type="button" class="btn btn-ghost" onclick="tutupModalImporKegiatanRamadhan()">Batal</button>
          <button type="button" id="btnSimpanImporKegiatanRamadhan" class="btn btn-admin" onclick="simpanHasilImporKegiatanRamadhan()" disabled style="background:#059669; border-color:#047857; font-weight:800; padding:8px 18px;">
            💾 Simpan & Terapkan 30 Kegiatan
          </button>
        </div>
      </div>
    </div>

    <!-- ============ MODAL PERIKSA & VERIFIKASI HASIL SISWA (ADMIN) ============ -->
    <div id="modalDetailHasilRamadhanAdmin" class="modal center hidden" style="z-index: 99997;">
      <div class="modal-box" style="max-width: 620px; width: 95%; max-height: 92vh; overflow-y: auto; padding: 20px;">
        <div class="modal-head" style="margin-bottom: 12px;">
          <div>
            <h3 style="margin:0; font-size:16px;">🔍 Periksa Jurnal Ramadhan Siswa</h3>
            <div id="detailAdminNama" style="font-size:13px; font-weight:700; color:var(--text); margin-top:2px;">-</div>
          </div>
          <button class="close-x" onclick="tutupModalPeriksaHasilRamadhan()">&times;</button>
        </div>
        <input type="hidden" id="detailAdminId">

        <div style="background:rgba(255,255,255,0.05); border-radius:12px; padding:12px; margin-bottom:14px; font-size:12.5px; line-height:1.6;">
          <div><b>Kelas:</b> <span id="detailAdminKelas">-</span></div>
          <div><b>Hari Pelaksanaan:</b> <span id="detailAdminHari">-</span></div>
          <div><b>Judul Kegiatan:</b> <span id="detailAdminJudul" style="color:#fbbf24; font-weight:700;">-</span></div>
          <div><b>Dimana (Lokasi):</b> <span id="detailAdminLokasi" style="color:#34d399; font-weight:700;">-</span></div>
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">💡 Dampak / Hikmah / Refleksi Siswa:</label>
          <div id="detailAdminDampak" style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px; font-size:13px; line-height:1.45; color:var(--text); white-space:pre-wrap;">-</div>
        </div>

        <!-- Lampiran Bukti File (Foto/PDF) -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">📎 Bukti Pelaksanaan (Foto / Dokumen PDF):</label>
          <div id="detailAdminBuktiContainer"></div>
        </div>

        <!-- Form Verifikasi Guru -->
        <div style="background:rgba(67,56,202,0.12); border:1.5px solid rgba(99,102,241,0.3); border-radius:14px; padding:14px; margin-bottom:14px;">
          <label style="display:block; font-size:12.5px; font-weight:800; color:#a5b4fc; margin-bottom:8px;">⚖️ Status Verifikasi & Catatan Penilai:</label>
          <div style="display:flex; gap:16px; margin-bottom:10px; font-size:13px;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="radio" name="verifStatus" value="Disetujui">
              <span style="color:#34d399; font-weight:700;">✅ Disetujui</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="radio" name="verifStatus" value="Perlu Revisi">
              <span style="color:#f87171; font-weight:700;">⚠️ Perlu Revisi</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="radio" name="verifStatus" value="Menunggu">
              <span style="color:#fbbf24; font-weight:700;">⏳ Menunggu</span>
            </label>
          </div>
          <label style="display:block; font-size:12px; font-weight:600; margin-bottom:4px; color:var(--muted);">Catatan / Masukan Guru untuk Siswa:</label>
          <textarea id="detailAdminCatatan" rows="2" placeholder="Tuliskan catatan apresiasi atau perbaikan untuk siswa..." style="width:100%; box-sizing:border-box; border-radius:8px; font-family:inherit; font-size:12.5px;"></textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button type="button" class="btn btn-ghost" onclick="tutupModalPeriksaHasilRamadhan()">Tutup</button>
          <button type="button" class="btn btn-admin" onclick="simpanVerifikasiHasilRamadhan()">💾 Simpan Verifikasi</button>
        </div>
      </div>
    </div>

    <!-- ============ MODAL SALIN SQL RAMADHAN ============ -->
    <div id="modalSqlRamadhan" class="modal center hidden" style="z-index: 99998;">
      <div class="modal-box" style="max-width: 620px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 20px;">
        <div class="modal-head" style="margin-bottom: 12px;">
          <div>
            <h3 style="margin:0; font-size:16px;">📋 Skrip SQL Database Ramadhan</h3>
            <div style="font-size:12px; color:var(--muted); margin-top:2px;">Jalankan query ini di Supabase SQL Editor jika belum tersedia</div>
          </div>
          <button class="close-x" onclick="tutupModalSqlRamadhan()">&times;</button>
        </div>
        <textarea id="teksSqlRamadhan" readonly style="width:100%; height:280px; font-family:monospace; font-size:11.5px; background:#0f172a; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:12px; box-sizing:border-box;">-- ==============================================================================
-- SKRIP TABEL FITUR BULAN RAMADHAN (KLONING)
-- ==============================================================================

-- 1. Tabel 30 Kegiatan Ramadhan
CREATE TABLE IF NOT EXISTS public.kloning_ramadhan_kegiatan (
    hari_ke INT PRIMARY KEY CHECK (hari_ke BETWEEN 1 AND 30),
    judul TEXT NOT NULL,
    deskripsi TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW())
);

-- 2. Tabel Jurnal Ramadhan Siswa
CREATE TABLE IF NOT EXISTS public.kloning_ramadhan_siswa (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'RAM_' || (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT::TEXT || '_' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0'),
    nis VARCHAR(30) NOT NULL REFERENCES public.kloning_siswa(nis) ON UPDATE CASCADE ON DELETE CASCADE,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(30) NOT NULL,
    hari_ke INT NOT NULL CHECK (hari_ke BETWEEN 1 AND 30),
    tanggal DATE NOT NULL,
    judul_kegiatan TEXT NOT NULL,
    dimana TEXT NOT NULL,
    dampak TEXT NOT NULL,
    bukti_url TEXT NOT NULL,
    file_type VARCHAR(20) DEFAULT 'image',
    file_name VARCHAR(255) DEFAULT '',
    status_verifikasi VARCHAR(30) DEFAULT 'Menunggu' CHECK (status_verifikasi IN ('Menunggu', 'Disetujui', 'Perlu Revisi')),
    catatan_guru TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW()),
    CONSTRAINT uq_kloning_ramadhan_siswa_hari UNIQUE (nis, hari_ke)
);

CREATE INDEX IF NOT EXISTS idx_kloning_ramadhan_hari ON public.kloning_ramadhan_siswa(hari_ke);
CREATE INDEX IF NOT EXISTS idx_kloning_ramadhan_nis ON public.kloning_ramadhan_siswa(nis);
CREATE INDEX IF NOT EXISTS idx_kloning_ramadhan_kelas ON public.kloning_ramadhan_siswa(kelas);
CREATE INDEX IF NOT EXISTS idx_kloning_ramadhan_tanggal ON public.kloning_ramadhan_siswa(tanggal);

-- RLS
ALTER TABLE public.kloning_ramadhan_kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kloning_ramadhan_siswa ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Kloning Ramadhan Kegiatan' AND tablename = 'kloning_ramadhan_kegiatan') THEN
    CREATE POLICY "Public Read Kloning Ramadhan Kegiatan" ON public.kloning_ramadhan_kegiatan FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Manage Kloning Ramadhan Kegiatan' AND tablename = 'kloning_ramadhan_kegiatan') THEN
    CREATE POLICY "Public Manage Kloning Ramadhan Kegiatan" ON public.kloning_ramadhan_kegiatan FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Kloning Ramadhan Siswa' AND tablename = 'kloning_ramadhan_siswa') THEN
    CREATE POLICY "Public Read Kloning Ramadhan Siswa" ON public.kloning_ramadhan_siswa FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Manage Kloning Ramadhan Siswa' AND tablename = 'kloning_ramadhan_siswa') THEN
    CREATE POLICY "Public Manage Kloning Ramadhan Siswa" ON public.kloning_ramadhan_siswa FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
</textarea>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;">
          <button type="button" class="btn btn-ghost" onclick="tutupModalSqlRamadhan()">Tutup</button>
          <button type="button" class="btn btn-admin" onclick="salinSqlRamadhan()">📋 Salin SQL ke Clipboard</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);
}

// Inisialisasi otomatis elemen modal saat script dimuat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    buatElemenModalRamadhan();
    muatPengaturanRamadhan();
    muatDaftarKegiatanRamadhan();
  });
} else {
  buatElemenModalRamadhan();
  muatPengaturanRamadhan();
  muatDaftarKegiatanRamadhan();
}
