# 🕌 Presensi Sholat & Ibadah Siswa
### SMK Negeri 1 Magelang

Aplikasi Web & Mobile (PWA / WebAPK) Sistem Informasi Presensi Sholat 5 Waktu & Dhuha Siswa terintegrasi dengan Google Sheets, Google Apps Script, Validasi Lokasi (GPS Radius), Kamera Selfie, Notifikasi Pengingat WhatsApp, dan Panel Admin Lengkap.

---

## ✨ Fitur Unggulan

1. **Presensi Sholat 6 Waktu Lengkap:**
   - Mendukung **Subuh, Dhuha, Dzuhur, Ashar, Maghrib, dan Isya**.
   - Jadwal & jendela waktu absen dinamis (dapat dikonfigurasi melalui Panel Admin).
   - Deteksi otomatis waktu sholat yang sedang aktif.

2. **Validasi Lokasi (GPS) & Kamera Selfie:**
   - Pengambilan foto langsung dari kamera (kamera depan/selfie) saat melakukan absen.
   - Perekaman koordinat GPS (Latitude/Longitude) dan penghitungan jarak presisi ke titik sekolah.
   - Opsi pembatasan radius absen (misal: harus berada dalam radius 100m dari masjid/sekolah).

3. **Dukungan Khusus Siswi (Halangan / Haid):**
   - Siswi perempuan memiliki tombol khusus **"Halangan"** per waktu sholat.
   - Fitur **"Halangan Seharian"** (satu klik untuk mencatat status halangan seluruh waktu sholat hari ini).

4. **Autentikasi & Manajemen Akun Mandiri:**
   - Login siswa menggunakan **NIS** dan **Password**.
   - Password default gender (Laki-laki: `12345`, Perempuan: `123456`) atau sesuai konfigurasi.
   - Fitur siswa ganti password mandiri.
   - Fitur Admin untuk reset password per siswa, reset massal ke default, atau set password global serentak.

5. **Panel Admin & Rekap Laporan Eksekutif:**
   - Dashboard statistik kehadiran hari ini & bulanan secara visual (grafik & ringkasan).
   - Filter laporan per tanggal, per kelas, dan per waktu sholat.
   - Ekspor rekap kehadiran dan data siswa ke format **Excel (.xlsx)**.
   - Impor data siswa massal via Excel dengan pemetaan kolom otomatis.

6. **Notifikasi Otomatis WhatsApp (Fonnte / Gateway):**
   - Pengingat waktu sholat otomatis via API WhatsApp.
   - Pengaturan interval broadcast dan target penerima (semua / per kelas / nomor tertentu).

7. **Arsitektur Fleksibel (Dual-Mode):**
   - **Mode 1 (Google Apps Script Asli):** Dijalankan langsung di dalam Google Apps Script HtmlService.
   - **Mode 2 (Standalone Hosting / PWA):** Dihosting di Vercel, GitHub Pages, atau server lokal dan berkomunikasi ke backend Google Apps Script melalui HTTP API.
   - **PWA & Android WebAPK:** Dilengkapi `manifest.json` dan `sw.js` agar bisa diinstal di layar utama smartphone tanpa bilah browser.

---

## 🚀 Panduan Setup & Deployment

### 1. Menyiapkan Backend Google Sheets & Apps Script
1. Buka spreadsheet baru di **Google Sheets**.
2. Buka menu **Ekstensi > Apps Script**.
3. Hapus kode default di editor, lalu salin seluruh isi file [`Code.gs`](./Code.gs) ke editor Apps Script.
4. Buat file HTML baru di editor Apps Script dengan nama `Index` (tanpa .html), lalu salin seluruh isi file [`index.html`](./index.html) ke dalamnya.
5. Jalankan fungsi `setupDB()` sekali dari toolbar editor Apps Script untuk membuat lembar database otomatis (`Siswa`, `AbsenSholat`, `Pengaturan`, `LogNotifWA`).
6. Klik **Terapkan (Deploy) > Deployment baru (New deployment)**.
7. Pilih jenis: **Aplikasi Web (Web App)**.
   - **Jalankan sebagai:** *Saya (email Anda)*.
   - **Yang memiliki akses:** *Siapa saja (Anyone)*.
8. Salin **URL Aplikasi Web** yang dihasilkan.

### 2. Menjalankan di Hosting Statis (Vercel / GitHub Pages / Lokal)
1. Unggah repository ini ke Vercel atau buka file [`index.html`](./index.html) di browser Anda.
2. Klik tombol gerigi ⚙️ (Pengaturan API) atau buka panel Admin.
3. Masukkan **URL Web App Google Apps Script** yang didapatkan pada langkah 1.
4. Aplikasi akan langsung terhubung ke database cloud Google Sheets Anda!

### 3. Memasang di Smartphone Android (PWA / WebAPK)
1. Buka link web aplikasi di browser **Google Chrome** di smartphone Android.
2. Buka menu titik tiga di kanan atas browser.
3. Pilih **"Instal aplikasi"** atau **"Tambahkan ke Layar Utama"**.
4. Aplikasi Presensi Sholat akan terpasang di HP Anda layaknya aplikasi Android resmi.
