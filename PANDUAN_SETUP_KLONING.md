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

## 🗄️ 1. Pengaturan Database Mandiri (Pemisahan Data 100%)

Agar seluruh data siswa, presensi sholat, dan pengaturan aplikasi kloning ini **terpisah total dan berdikari sendiri** dari aplikasi utama, Anda memiliki 2 pilihan yang sangat fleksibel:

---

### 🟢 PILIHAN A: Menggunakan Supabase Saat Ini (Paling Cepat & Praktis)
*Anda TIDAK PERLU membuat akun atau proyek Supabase baru. Supabase saat ini dapat menampung kedua aplikasi sekaligus secara aman tanpa pernah mencampuri data.*

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) pada proyek Anda saat ini (`pkjnbuzfknbcakmtfkif`).
2. Masuk ke menu **SQL Editor** (ikon terminal/SQL di menu sebelah kiri).
3. Klik tombol **New query**.
4. Buka file [`setup_database_kloning_terpisah.sql`](./setup_database_kloning_terpisah.sql) di folder ini, salin seluruh kodenya, tempel ke SQL Editor Supabase, lalu klik tombol **Run**.
5. **Selesai!** Supabase akan otomatis membuat:
   - Tabel `kloning_pengaturan` (dengan salinan master pengaturan awal)
   - Tabel `kloning_siswa` (dengan salinan data 182 siswa)
   - Tabel `kloning_absen_sholat` (bersih & siap mencatat presensi khusus aplikasi kloning)
   - Bucket Storage `foto_absen_kloning` (untuk foto selfie presensi kloning)
6. Aplikasi kloning ini sudah dikonfigurasi menggunakan `TABLE_PREFIX: "kloning_"`, sehingga seluruh aksi presensi atau perubahan data tidak akan pernah menyentuh tabel aplikasi utama!

---

### 🔵 PILIHAN B: Menggunakan Proyek Supabase Baru (Terpisah Total Secara Cloud)
*Jika Anda ingin proyek Supabase yang benar-benar berbeda secara fisik:*

1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard) dan klik **New Project**.
2. Masukkan nama (misal: `Presensi Ibadah Kloning`), buat password, dan pilih region Singapore.
3. Di dashboard proyek baru, buka **SQL Editor** > **New query**, lalu salin dan jalankan seluruh isi file [`setup_database_kloning_terpisah.sql`](./setup_database_kloning_terpisah.sql).
4. Buka **Project Settings** > **API**, salin **Project URL** dan **Project API Keys (`anon` / `public`)**.
5. Buka file [`config.js`](./config.js) di folder ini, lalu masukkan kredensial baru Anda:
   ```javascript
   window.APP_CONFIG = {
     SUPABASE_URL: "https://proyek-baru-anda.supabase.co",
     SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     TABLE_PREFIX: "kloning_", // atau "" jika tanpa prefix di project baru
     SUPABASE_STORAGE_BUCKET: "foto_absen_kloning"
   };
   ```
6. *(Alternatif Langsung di Web)*: Anda juga bisa masuk ke **Panel Admin** (login: `admin` / `admin123`) > **Pengaturan** > **Status Koneksi Database Supabase**, masukkan URL & Key baru lalu klik **Simpan & Terapkan Database**.

---

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
| [`islamic_features.js`](./islamic_features.js) | Modul Al-Qur'an 114 surat, pelacak durasi baca, kompas kiblat, dzikir & doa harian |
| [`auto_git_push.js`](./auto_git_push.js) | Skrip otomatis mendeteksi perubahan berkas dan melakukan git push |
| [`mulai_auto_push.bat`](./mulai_auto_push.bat) | File batch untuk menjalankan auto git push secara visual |
| [`mulai_auto_push_background.vbs`](./mulai_auto_push_background.vbs) | Menjalankan auto git push di latar belakang tanpa jendela CMD |
| [`push_sekarang.bat`](./push_sekarang.bat) | Tombol 1-klik untuk melakukan git push secara instan kapan saja |
| [`stop_auto_push.bat`](./stop_auto_push.bat) | File batch untuk menghentikan layanan pemantau auto push |
