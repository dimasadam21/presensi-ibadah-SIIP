/**
 * ==============================================================================
 * KONFIGURASI APLIKASI PRESENSI IBADAH (EDISI KLONING MANDIRI)
 * ==============================================================================
 * 
 * Pengaturan ini memastikan seluruh data aplikasi kloning terpisah 100% dan
 * berdikari sendiri-sendiri dari aplikasi utama (Presensi Ibadah).
 * 
 * CARA PEMISAHAN DATA:
 * 1. SUPABASE BERSAMA (Sama Proyek tapi Beda Tabel):
 *    - Gunakan TABLE_PREFIX: "kloning_" (sudah aktif secara default).
 *    - Jalankan file "setup_database_kloning_terpisah.sql" di SQL Editor Supabase.
 *    - Semua data siswa, presensi, dan pengaturan akan masuk ke tabel:
 *      * kloning_siswa
 *      * kloning_absen_sholat
 *      * kloning_pengaturan
 *      * foto_absen_kloning (storage bucket)
 *      sehingga tidak akan pernah mencampuri tabel aplikasi utama!
 * 
 * 2. SUPABASE PROYEK BARU (Terpisah Total Secara Cloud):
 *    - Buat proyek baru di https://supabase.com
 *    - Ganti SUPABASE_URL & SUPABASE_ANON_KEY di bawah ini dengan kredensial baru.
 *    - Jalankan "setup_database_kloning_terpisah.sql" di proyek baru tersebut.
 */

// Storage Mandiri Terisolasi Khusus Aplikasi Kloning (Prefix: kloning_)
// Menjamin seluruh sesi, login, token, dan cache lokal terpisah total dari aplikasi utama
window.klonStorage = {
  _prefix: 'kloning_',
  getItem: function(key) {
    try { return localStorage.getItem(this._prefix + key); } catch(e) { return null; }
  },
  setItem: function(key, val) {
    try { localStorage.setItem(this._prefix + key, val); } catch(e) {}
  },
  removeItem: function(key) {
    try { localStorage.removeItem(this._prefix + key); } catch(e) {}
  },
  clear: function() {
    try {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(this._prefix) === 0) keys.push(k);
      }
      keys.forEach(function(k) { localStorage.removeItem(k); });
    } catch(e) {}
  }
};

window.APP_CONFIG = {
  // SUPABASE PROJECT CONFIGURATION
  SUPABASE_URL: "https://pkjnbuzfknbcakmtfkif.supabase.co",

  // Supabase Public Anon Key
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBram5idXpma25iY2FrbXRma2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExODI5OTAsImV4cCI6MjEwNjc1ODk5MH0.xdDDnoYJ05_Uq0m5IVz1H1rc-Fpon5ERXjUqrKfpmpY",

  // PREFIX TABEL KHUSUS KLONING (ISOLASI DATA 100%)
  // Menjamin seluruh query membaca & menulis ke tabel kloning:
  // - kloning_siswa
  // - kloning_absen_sholat
  // - kloning_pengaturan
  // - kloning_log_notif_wa
  TABLE_PREFIX: "kloning_",

  // Nama Storage Bucket khusus untuk foto selfie presensi kloning
  SUPABASE_STORAGE_BUCKET: "foto_absen_kloning",

  // Identitas Aplikasi Edisi Kloning
  APP_NAME: "Presensi Sholat & Ibadah (Kloning)",
  APP_EDITION: "Kloning Mandiri",
  APP_VERSION: "2.1.0-clone"
};
