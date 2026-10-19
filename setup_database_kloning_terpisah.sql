-- ==============================================================================
-- SKEMA & SETUP DATABASE APLIKASI PRESENSI IBADAH (EDISI KLONING MANDIRI)
-- ==============================================================================
-- File ini digunakan untuk memisahkan seluruh data aplikasi kloning dari aplikasi utama
-- sehingga kedua aplikasi berdikari sendiri-sendiri tanpa ada data yang tercampur.
-- 
-- CARA PENGGUNAAN:
-- 1. Buka Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Pilih proyek Anda (bisa proyek yang sama atau proyek baru)
-- 3. Buka menu "SQL Editor" di bilah kiri, lalu klik "New query"
-- 4. Salin seluruh isi skrip ini, tempel ke SQL Editor, lalu klik "Run"
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABEL PENGATURAN SISTEM (KLONING)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kloning_pengaturan (
    parameter VARCHAR(100) PRIMARY KEY,
    nilai TEXT NOT NULL,
    deskripsi TEXT,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW())
);

-- ==============================================================================
-- 3. TABEL SISWA (KLONING)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kloning_siswa (
    siswa_id VARCHAR(50) PRIMARY KEY DEFAULT 'SIS' || LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0'),
    nis VARCHAR(30) UNIQUE NOT NULL,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(30) NOT NULL,
    jurusan VARCHAR(50) DEFAULT '',
    jk VARCHAR(10) NOT NULL CHECK (jk IN ('L', 'P')),
    status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif', 'Lulus', 'Pindah')),
    password TEXT NOT NULL,
    no_hp VARCHAR(30) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW())
);

-- ==============================================================================
-- 4. TABEL PRESENSI SHOLAT (KLONING)
-- Data presensi sholat di tabel ini 100% terpisah dari tabel absen_sholat lama!
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kloning_absen_sholat (
    absen_id VARCHAR(100) PRIMARY KEY DEFAULT 'ABS_' || (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT::TEXT || '_' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0'),
    nis VARCHAR(30) NOT NULL REFERENCES public.kloning_siswa(nis) ON UPDATE CASCADE ON DELETE CASCADE,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(30) NOT NULL,
    jk VARCHAR(10) NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    sholat VARCHAR(20) NOT NULL CHECK (sholat IN ('Subuh', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya')),
    jam TIME NOT NULL DEFAULT CURRENT_TIME,
    status VARCHAR(30) NOT NULL CHECK (status IN ('Hadir', 'Terlambat', 'Halangan')),
    keterangan TEXT DEFAULT '',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    jarak DOUBLE PRECISION,
    maps_link TEXT DEFAULT '',
    foto_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW()),
    
    -- Mencegah absen ganda pada tanggal & sholat yang sama untuk siswa yang sama
    CONSTRAINT uq_kloning_siswa_tanggal_sholat UNIQUE (nis, tanggal, sholat)
);

-- ==============================================================================
-- 5. TABEL LOG NOTIFIKASI WHATSAPP (KLONING)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kloning_log_notif_wa (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    sholat VARCHAR(20) NOT NULL,
    nis VARCHAR(30),
    nama VARCHAR(150),
    no_hp VARCHAR(30),
    kirim_ke VARCHAR(50) DEFAULT 'siswa',
    waktu_kirim TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW()),
    status VARCHAR(50) DEFAULT 'Terkirim'
);

-- ==============================================================================
-- 6. INDEXING UNTUK QUERY SUPER CEPAT
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_kloning_absen_tanggal_sholat ON public.kloning_absen_sholat(tanggal, sholat);
CREATE INDEX IF NOT EXISTS idx_kloning_absen_nis_tanggal ON public.kloning_absen_sholat(nis, tanggal);
CREATE INDEX IF NOT EXISTS idx_kloning_absen_kelas ON public.kloning_absen_sholat(kelas);
CREATE INDEX IF NOT EXISTS idx_kloning_siswa_kelas ON public.kloning_siswa(kelas);
CREATE INDEX IF NOT EXISTS idx_kloning_siswa_nis ON public.kloning_siswa(nis);

-- ==============================================================================
-- 7. AUTO-UPDATE TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('asia/jakarta', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_kloning_siswa_updated_at ON public.kloning_siswa;
CREATE TRIGGER trg_kloning_siswa_updated_at
BEFORE UPDATE ON public.kloning_siswa
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_kloning_pengaturan_updated_at ON public.kloning_pengaturan;
CREATE TRIGGER trg_kloning_pengaturan_updated_at
BEFORE UPDATE ON public.kloning_pengaturan
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.kloning_pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kloning_siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kloning_absen_sholat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kloning_log_notif_wa ENABLE ROW LEVEL SECURITY;

-- Pengaturan Kloning Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Kloning Pengaturan' AND tablename = 'kloning_pengaturan') THEN
    CREATE POLICY "Public Read Kloning Pengaturan" ON public.kloning_pengaturan FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Manage Kloning Pengaturan' AND tablename = 'kloning_pengaturan') THEN
    CREATE POLICY "Public Manage Kloning Pengaturan" ON public.kloning_pengaturan FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Siswa Kloning Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Kloning Siswa' AND tablename = 'kloning_siswa') THEN
    CREATE POLICY "Public Read Kloning Siswa" ON public.kloning_siswa FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Manage Kloning Siswa' AND tablename = 'kloning_siswa') THEN
    CREATE POLICY "Public Manage Kloning Siswa" ON public.kloning_siswa FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Absen Sholat Kloning Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Kloning Absen' AND tablename = 'kloning_absen_sholat') THEN
    CREATE POLICY "Public Read Kloning Absen" ON public.kloning_absen_sholat FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Insert Kloning Absen' AND tablename = 'kloning_absen_sholat') THEN
    CREATE POLICY "Public Insert Kloning Absen" ON public.kloning_absen_sholat FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Update Kloning Absen' AND tablename = 'kloning_absen_sholat') THEN
    CREATE POLICY "Public Update Kloning Absen" ON public.kloning_absen_sholat FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Delete Kloning Absen' AND tablename = 'kloning_absen_sholat') THEN
    CREATE POLICY "Public Delete Kloning Absen" ON public.kloning_absen_sholat FOR DELETE USING (true);
  END IF;
END $$;

-- Log WA Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Manage Kloning Log WA' AND tablename = 'kloning_log_notif_wa') THEN
    CREATE POLICY "Public Manage Kloning Log WA" ON public.kloning_log_notif_wa FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- 9. STORAGE BUCKET KHUSUS FOTO PRESENSI KLONING
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('foto_absen_kloning', 'foto_absen_kloning', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Upload Foto Absen Kloning' AND tablename = 'objects') THEN
    CREATE POLICY "Public Upload Foto Absen Kloning" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'foto_absen_kloning');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Foto Absen Kloning' AND tablename = 'objects') THEN
    CREATE POLICY "Public Read Foto Absen Kloning" ON storage.objects FOR SELECT TO public USING (bucket_id = 'foto_absen_kloning');
  END IF;
END $$;

-- ==============================================================================
-- 10. INISIALISASI DATA AWAL (MANDIRI & TERPISAH)
-- ==============================================================================

-- A. Inisialisasi Pengaturan Kloning (Salin dari pengaturan lama jika ada, atau gunakan default)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pengaturan') THEN
    INSERT INTO public.kloning_pengaturan (parameter, nilai, deskripsi)
    SELECT parameter, nilai, deskripsi FROM public.pengaturan
    ON CONFLICT (parameter) DO NOTHING;
  END IF;
END $$;

-- Pastikan pengaturan identitas default kloning tersedia jika belum ada:
INSERT INTO public.kloning_pengaturan (parameter, nilai, deskripsi)
VALUES
    ('nama_sekolah', 'Sistem Informasi Ibadah Peserta Didik (Kloning)', 'Nama instansi sekolah / masjid'),
    ('judul_aplikasi', 'Presensi Sholat & Ibadah (Kloning)', 'Judul utama pada header web'),
    ('tema_warna', '#0d9488', 'Warna primer aplikasi'),
    ('ukuran_logo', '46', 'Ukuran logo header (px)'),
    ('ukuran_judul', '19', 'Ukuran font judul (px)'),
    ('posisi_header', 'center', 'center / left / right'),
    ('tata_letak_header', 'stacked', 'stacked / inline'),
    ('logo_sekolah', '', 'URL atau base64 gambar logo'),

    -- Koordinat GPS & Batas Radius
    ('lat_sekolah', '-7.5342', 'Latitude lokasi sekolah / masjid'),
    ('lng_sekolah', '110.2312', 'Longitude lokasi sekolah / masjid'),
    ('radius_meter', '100', 'Batas jarak absensi (meter)'),
    ('wajib_dalam_radius', 'TIDAK', 'YA = Wajib berada di radius, TIDAK = Fleksibel'),

    -- Akun Login Panel Admin
    ('admin_user', 'admin', 'Username login admin'),
    ('admin_pass', 'admin123', 'Password login admin'),
    ('admin_pin', '1234', 'PIN admin alternatif'),

    -- Password Default Siswa
    ('pass_default_l', '12345', 'Password default siswa laki-laki'),
    ('pass_default_p', '123456', 'Password default siswi perempuan'),
    ('mode_pass_default', 'nis', 'nis = Password sama dengan NIS, gender = Berdasarkan gender'),

    -- Jendela Waktu Sholat 6 Waktu (Format HH:mm)
    ('subuh_mulai', '04:00', 'Waktu mulai sholat Subuh'),
    ('subuh_selesai', '05:45', 'Batas akhir sholat Subuh'),
    ('dhuha_mulai', '07:00', 'Waktu mulai sholat Dhuha'),
    ('dhuha_selesai', '11:00', 'Batas akhir sholat Dhuha'),
    ('dzuhur_mulai', '11:45', 'Waktu mulai sholat Dzuhur'),
    ('dzuhur_selesai', '15:00', 'Batas akhir sholat Dzuhur'),
    ('ashar_mulai', '15:00', 'Waktu mulai sholat Ashar'),
    ('ashar_selesai', '17:45', 'Batas akhir sholat Ashar'),
    ('maghrib_mulai', '17:45', 'Waktu mulai sholat Maghrib'),
    ('maghrib_selesai', '19:00', 'Batas akhir sholat Maghrib'),
    ('isya_mulai', '19:00', 'Waktu mulai sholat Isya'),
    ('isya_selesai', '23:59', 'Batas akhir sholat Isya'),

    -- Notifikasi WhatsApp (Fonnte / Gateway)
    ('wa_token', '', 'API Token WhatsApp Gateway'),
    ('wa_aktif', 'TIDAK', 'YA / TIDAK'),
    ('wa_interval', '15', 'Interval pengecekan (menit)'),
    ('wa_max_kirim', '2', 'Maksimal pengiriman per sesi sholat'),
    ('wa_target_mode', 'semua', 'semua / kelas / nomor'),
    ('wa_target_kelas', '', 'Daftar kelas jika target_mode = kelas'),
    ('wa_target_nomor', '', 'Nomor spesifik jika target_mode = nomor'),
    ('wa_template_pesan', 'Assalamu''alaikum *{nama}*,\n\nWaktu sholat *{sholat}* sedang berlangsung.\nSegera laksanakan sholat dan lakukan absen di aplikasi {sekolah}.\n\n_(Pesan otomatis pengingat ibadah)_', 'Template broadcast WA')
ON CONFLICT (parameter) DO NOTHING;

-- B. Inisialisasi Data Siswa Kloning (Salin dari siswa lama jika ada, atau gunakan default)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'siswa') THEN
    INSERT INTO public.kloning_siswa (siswa_id, nis, nama, kelas, jurusan, jk, status, password, no_hp)
    SELECT siswa_id, nis, nama, kelas, jurusan, jk, status, password, no_hp FROM public.siswa
    ON CONFLICT (nis) DO NOTHING;
  ELSE
    INSERT INTO public.kloning_siswa (siswa_id, nis, nama, kelas, jurusan, jk, status, password, no_hp)
    VALUES
      ('SIS001', '2024001', 'Muhammad Farhan', 'X RPL', 'RPL', 'L', 'Aktif', '12345', '081234567890'),
      ('SIS002', '2024002', 'Aisyah Putri', 'X RPL', 'RPL', 'P', 'Aktif', '123456', '081234567891'),
      ('SIS003', '2024003', 'Ahmad Zaki', 'XI TKJ', 'TKJ', 'L', 'Aktif', '12345', '081234567892'),
      ('SIS004', '2024004', 'Siti Fatimah', 'XI TKJ', 'TKJ', 'P', 'Aktif', '123456', '081234567893')
    ON CONFLICT (nis) DO NOTHING;
  END IF;
END $$;

-- CATATAN:
-- Tabel public.kloning_absen_sholat sengaja dibiarkan BERSIH & KOSONG
-- agar riwayat presensi aplikasi kloning ini benar-benar baru, mandiri, dan tidak tercampur data lama!
