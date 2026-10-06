# 📋 Panduan Setup & Konfigurasi Aplikasi Presensi Ibadah (Edisi Kloning)

**Folder Workspace Kloning:** `Presensi Ibadah Komplit (Kloning)`  
**Status Kloning:** ✅ **Selesai & Siap Digunakan (100% Identik & Mandiri)**

---

## 🌟 Ringkasan Kloning Sistem

Aplikasi ini merupakan kloning lengkap dari aplikasi **Presensi Sholat & Ibadah (S-I-I-P)** sebelumnya. Seluruh fitur (presensi 6 waktu sholat, kamera selfie, GPS radius, mode halangan siswi, panel admin, ekspor/impor Excel, dan PWA WebAPK) telah disalin secara utuh.

Sistem telah disesuaikan agar:
1. **Link APK & Web Berbeda:** Memiliki URL hosting Vercel sendiri dan App ID PWA unik (`/presensi-kloning/`), sehingga dapat diinstal di smartphone berdampingan dengan aplikasi awal tanpa saling bentrok.
2. **Database Terpisah:** Dilengkapi konfigurasi fleksibel via [`config.js`](./config.js) dan form pengaturan di web untuk terhubung ke proyek **Supabase** baru.
3. **Repository Terpisah:** Git remote lama telah dilepas agar Anda dapat menghubungkannya ke repositori **GitHub** baru tanpa menimpa repositori lama.

---

## 🗄️ 1. Pengaturan Database Supabase Baru

Agar data siswa dan riwayat presensi aplikasi kloning tidak tercampur dengan aplikasi lama, buatlah proyek Supabase baru:

### Langkah A: Buat Proyek Supabase Baru
1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard).
2. Klik **New Project**.
3. Masukkan nama proyek (misal: `Presensi Ibadah Kloning` atau `S-I-I-P Kloning`).
4. Atur database password, dan pilih Region: **Singapore (`ap-southeast-1`)** untuk latensi tercepat di Indonesia.
5. Tunggu pembuatan database selesai (sekitar 1-2 menit).

### Langkah B: Jalankan Skema & Data Awal
1. Di dashboard Supabase baru Anda, buka menu **SQL Editor** (ikon terminal/SQL di menu kiri).
2. Klik **New query**, lalu salin dan tempel seluruh isi file [`supabase_schema.sql`](./supabase_schema.sql), kemudian klik **Run**.  
   *(Langkah ini membuat tabel `siswa`, `absen_sholat`, `pengaturan`, `log_notif_wa`, serta storage bucket `foto_absen`)*.
3. Buka tab query baru di SQL Editor, salin dan tempel seluruh isi file [`seed_data_excel.sql`](./seed_data_excel.sql), lalu klik **Run**.  
   *(Langkah ini mengimpor 182 data siswa, konfigurasi waktu sholat, dan riwayat presensi awal)*.

### Langkah C: Hubungkan Kredensial ke Aplikasi
1. Di dashboard Supabase baru Anda, buka **Project Settings** > **API**.
2. Salin **Project URL** dan **Project API Keys (`anon` / `public`)**.
3. Buka file [`config.js`](./config.js) di folder ini, lalu masukkan kredensial baru Anda:
   ```javascript
   window.APP_CONFIG = {
     SUPABASE_URL: "https://proyek-baru-anda.supabase.co",
     SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     SUPABASE_STORAGE_BUCKET: "foto_absen",
     // ...
   };
   ```
4. *(Opsional)* Anda juga dapat menyimpannya di file [`.env`](./.env) untuk keperluan dokumentasi atau backend lokal.
5. *(Alternatif Langsung di Web)*: Anda juga bisa membuka aplikasi di browser, masuk ke **Panel Admin** (login: `admin` / `admin123`) > **Pengaturan** > **Status Koneksi Database Supabase**, masukkan URL & Key baru lalu klik **Simpan & Terapkan Database Baru**.

---

## 🐙 2. Pengaturan Repositori GitHub Baru

Remote repositori lama (`https://github.com/dimasadam21/S-I-I-P.git`) telah dilepas dari folder ini agar aman.

### Langkah Menghubungkan ke GitHub Baru:
1. Buka [GitHub.com](https://github.com) dan buat repository baru (misal: `Presensi-Ibadah-Kloning` atau `S-I-I-P-2`).  
   *(Pilih **Public** atau **Private**, jangan centang "Initialize with README" karena file sudah ada)*.
2. Salin URL repositori baru Anda (contoh: `https://github.com/dimasadam21/Presensi-Ibadah-Kloning.git`).
3. Jalankan perintah berikut di PowerShell atau Command Prompt pada folder ini:
   ```bash
   git add .
   git commit -m "Initial commit aplikasi Presensi Ibadah Kloning"
   git remote add origin https://github.com/dimasadam21/NAMA-REPO-BARU-ANDA.git
   git branch -M main
   git push -u origin main
   ```
   *(Atau Anda cukup menjalankan file pembantu [`hubungkan_github_baru.bat`](./hubungkan_github_baru.bat) yang telah disediakan di folder ini).*

---

## 🚀 3. Pengaturan Hosting Vercel (Menghasilkan Link Baru)

Karena repositori GitHub yang digunakan adalah repositori baru, deployment di Vercel akan menghasilkan **link website dan link aplikasi APK yang berbeda** dari aplikasi awal.

### Langkah Deploy di Vercel:
1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **Add New...** > **Project**.
3. Pilih akun GitHub Anda dan cari repositori baru yang baru saja di-push (misal: `Presensi-Ibadah-Kloning`).
4. Klik tombol **Import**.
5. Pada bagian **Project Name**, Anda dapat menentukan subdomain baru (misal: `presensi-ibadah-kloning` atau `siip-kloning`).
6. **Framework Preset:** Pilih `Other` (atau biarkan default, karena menggunakan static HTML + `vercel.json`).
7. Klik **Deploy**.
8. Setelah selesai (±30 detik), Anda akan mendapatkan **URL baru**, contoh:
   ```
   https://presensi-ibadah-kloning.vercel.app
   ```
   *Link ini sepenuhnya berbeda dan terpisah dari link aplikasi Presensi Ibadah awal!*

---

## 📱 4. Link & Pemasangan APK di Smartphone Android (PWA)

### Mengapa Berbeda dan Tidak Bentrok dengan Aplikasi Awal?
1. **Domain Hosting Baru:** Berjalan pada URL Vercel baru Anda (`https://nama-baru.vercel.app`).
2. **Identitas PWA Mandiri:** 
   - `manifest.json` memiliki ID unik: `"id": "/presensi-kloning/"`
   - Nama aplikasi: `"Presensi Sholat & Ibadah (Kloning)"`
   - Cache Service Worker: `"presensi-kloning-v1"`
3. **Pemasangan di Smartphone Siswa:**
   - Buka link Vercel baru di Google Chrome HP Android.
   - Ketuk menu titik tiga (⋮) di kanan atas browser Chrome.
   - Pilih **"Tambahkan ke Layar Utama"** atau **"Instal Aplikasi"**.
   - Aplikasi akan terpasang di HP dengan ikon tersendiri dan tidak akan menimpa aplikasi awal.
4. **Jika Ingin Dijadikan File APK Standalone (.apk):**
   - Buka [PWABuilder](https://www.pwabuilder.com/).
   - Masukkan link URL Vercel baru Anda.
   - Klik **Start** > **Package for Android** > Unduh file `.apk` / `.aab`.

---

## ⚙️ 5. Menyesuaikan Identitas Aplikasi (Nama Sekolah & Judul)

Jika Anda ingin mengubah nama sekolah, judul aplikasi, radius GPS, atau jam sholat:
1. Masuk ke **Panel Admin** pada aplikasi baru (default: `admin` / `admin123`).
2. Buka tab **Pengaturan**:
   - Ubah **Judul Aplikasi**
   - Ubah **Nama Sekolah**
   - Ubah **Koordinat GPS & Toleransi Radius**
   - Atur **Jadwal Waktu Sholat**
3. Klik **Simpan Pengaturan**. Perubahan akan tersimpan otomatis di database Supabase baru Anda secara realtime.

---

## 📂 Struktur File Penting Kloning

| File | Keterangan |
| :--- | :--- |
| [`index.html`](./index.html) | Kode aplikasi utama (Frontend UI + adapter Supabase realtime) |
| [`config.js`](./config.js) | File konfigurasi URL & API Key Supabase untuk edisi kloning |
| [`manifest.json`](./manifest.json) | Konfigurasi instalasi PWA / WebAPK (Nama & ID kloning mandiri) |
| [`sw.js`](./sw.js) | Service Worker PWA (Cache terisolasi `presensi-kloning-v1`) |
| [`vercel.json`](./vercel.json) | Konfigurasi routing & header cache hosting Vercel |
| [`supabase_schema.sql`](./supabase_schema.sql) | Script SQL pembuatan struktur tabel & bucket storage Supabase baru |
| [`seed_data_excel.sql`](./seed_data_excel.sql) | Data 182 siswa & konfigurasi awal untuk Supabase baru |
| [`.env`](./.env) & [`.env.example`](./.env.example) | Template kredensial environment |
| [`hubungkan_github_baru.bat`](./hubungkan_github_baru.bat) | Script otomatis untuk mengunggah ke repositori GitHub baru |
