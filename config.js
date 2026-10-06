/**
 * ==============================================================================
 * KONFIGURASI APLIKASI PRESENSI IBADAH (EDISI KLONING)
 * ==============================================================================
 * 
 * File ini mengatur endpoint Supabase dan parameter aplikasi kloning.
 * Untuk menghubungkan aplikasi ini ke project Supabase baru yang terpisah:
 * 1. Buat proyek baru di https://supabase.com
 * 2. Jalankan "supabase_schema.sql" dan "seed_data_excel.sql" di SQL Editor Supabase
 * 3. Ganti SUPABASE_URL dan SUPABASE_ANON_KEY di bawah ini dengan kredensial baru Anda.
 * 
 * CATATAN:
 * Anda juga dapat mengubah URL & Key Supabase langsung dari Panel Admin aplikasi
 * (Menu Pengaturan > Status Koneksi Database Supabase).
 */

window.APP_CONFIG = {
  // SUPABASE PROJECT CONFIGURATION (Ganti dengan kredensial project Supabase Baru Anda)
  // Contoh: "https://abcdefghijklm.supabase.co"
  SUPABASE_URL: "https://your-new-project-id.supabase.co",

  // Supabase Public Anon Key (Project Settings > API > anon public)
  SUPABASE_ANON_KEY: "your-new-anon-key-here",

  // Nama Storage Bucket untuk foto selfie presensi (default: foto_absen)
  SUPABASE_STORAGE_BUCKET: "foto_absen",

  // Identitas Aplikasi Edisi Kloning
  APP_NAME: "Presensi Sholat & Ibadah (Kloning)",
  APP_EDITION: "Kloning Mandiri",
  APP_VERSION: "2.0.0-clone"
};
