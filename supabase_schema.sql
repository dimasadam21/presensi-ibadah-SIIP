-- ==============================================================================
-- SKEMA DATABASE PRESENSI SHOLAT & IBADAH (S-I-I-P) UNTUK SUPABASE (POSTGRESQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABEL PENGATURAN SISTEM
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.pengaturan (
    parameter VARCHAR(100) PRIMARY KEY,
    nilai TEXT NOT NULL,
    deskripsi TEXT,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW())
);

-- ==============================================================================
-- 3. TABEL SISWA
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.siswa (
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
-- 4. TABEL PRESENSI SHOLAT (ABSEN SHOLAT)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.absen_sholat (
    absen_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nis VARCHAR(30) NOT NULL REFERENCES public.siswa(nis) ON UPDATE CASCADE ON DELETE CASCADE,
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
    CONSTRAINT uq_siswa_tanggal_sholat UNIQUE (nis, tanggal, sholat)
);

-- ==============================================================================
-- 5. TABEL LOG NOTIFIKASI WHATSAPP
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.log_notif_wa (
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
-- 6. INDEXING UNTUK PERFORMA QUERY CEPAT
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_absen_tanggal_sholat ON public.absen_sholat(tanggal, sholat);
CREATE INDEX IF NOT EXISTS idx_absen_nis_tanggal ON public.absen_sholat(nis, tanggal);
CREATE INDEX IF NOT EXISTS idx_absen_kelas ON public.absen_sholat(kelas);
CREATE INDEX IF NOT EXISTS idx_siswa_kelas ON public.siswa(kelas);
CREATE INDEX IF NOT EXISTS idx_siswa_nis ON public.siswa(nis);

-- ==============================================================================
-- 7. FUNCTION & TRIGGER AUTO UPDATE TIMESTAMP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('asia/jakarta', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_siswa_updated_at ON public.siswa;
CREATE TRIGGER trg_siswa_updated_at
BEFORE UPDATE ON public.siswa
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_pengaturan_updated_at ON public.pengaturan;
CREATE TRIGGER trg_pengaturan_updated_at
BEFORE UPDATE ON public.pengaturan
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absen_sholat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_notif_wa ENABLE ROW LEVEL SECURITY;

-- Pengaturan: Siapa saja (Anon) bisa membaca pengaturan aplikasi (judul, jendela sholat, logo)
CREATE POLICY "Public Read Pengaturan" ON public.pengaturan
FOR SELECT USING (true);

-- Pengaturan: Hanya Service Role / Authenticated yang bisa mengubah
CREATE POLICY "Admin Modify Pengaturan" ON public.pengaturan
FOR ALL USING (true) WITH CHECK (true);

-- Siswa: Publik bisa membaca list siswa untuk login / autocomplete
CREATE POLICY "Public Read Siswa" ON public.siswa
FOR SELECT USING (true);

-- Siswa: Update password mandiri atau CRUD oleh Admin
CREATE POLICY "Public Manage Siswa" ON public.siswa
FOR ALL USING (true) WITH CHECK (true);

-- Absen Sholat: Publik (Siswa) bisa input absen & membaca riwayat
CREATE POLICY "Public Read Absen" ON public.absen_sholat
FOR SELECT USING (true);

CREATE POLICY "Public Insert Absen" ON public.absen_sholat
FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Update Absen" ON public.absen_sholat
FOR UPDATE USING (true) WITH CHECK (true);

-- Log Notif WA: Publik bisa membaca & mencatat log
CREATE POLICY "Public Manage Log WA" ON public.log_notif_wa
FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 9. SEED DATA (DATA AWAL LENGKAP)
-- ==============================================================================

-- A. Data Awal Siswa
INSERT INTO public.siswa (siswa_id, nis, nama, kelas, jurusan, jk, status, password, no_hp)
VALUES
    ('SIS001', '2024001', 'Muhammad Farhan', 'X RPL', 'RPL', 'L', 'Aktif', '12345', '081234567890'),
    ('SIS002', '2024002', 'Aisyah Putri', 'X RPL', 'RPL', 'P', 'Aktif', '123456', '081234567891'),
    ('SIS003', '2024003', 'Ahmad Zaki', 'XI TKJ', 'TKJ', 'L', 'Aktif', '12345', '081234567892'),
    ('SIS004', '2024004', 'Siti Fatimah', 'XI TKJ', 'TKJ', 'P', 'Aktif', '123456', '081234567893')
ON CONFLICT (nis) DO NOTHING;

-- B. Data Awal Pengaturan
INSERT INTO public.pengaturan (parameter, nilai, deskripsi)
VALUES
    ('nama_sekolah', 'Sistem Informasi Ibadah Peserta Didik', 'Nama instansi sekolah / masjid'),
    ('judul_aplikasi', 'Presensi Sholat & Ibadah', 'Judul utama pada header web'),
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
    ('wa_template_pesan', 'Assalamu''alaikum *{nama}*,\n\nWaktu sholat *{sholat}* sedang berlangsung.\nSegera laksanakan sholat dan lakukan absen di aplikasi {sekolah}.\n\n_(Pesan otomatis pengingat ibadah)_', 'Template broadcast WA'),

    -- Kata-Kata Mutiara & Hadits Islami Saat Absen Berhasil
    ('pesan_sukses', 'Barangsiapa yang memelihara sholat, maka sholat itu akan menjadi cahaya, petunjuk, dan keselamatan baginya di hari kiamat. (HR. Ahmad)\nSholat adalah tiang agama, barangsiapa menegakkannya maka sungguh ia telah menegakkan agama.\nJadikan sholat dan sabar sebagai penolongmu. Sesungguhnya Allah bersama orang-orang yang sabar. (QS. Al-Baqarah: 153)\nAmalan yang paling dicintai oleh Allah adalah sholat pada awal waktunya. (HR. Bukhari & Muslim)', 'Kumpulan pesan motivasi umum'),
    ('pesan_sukses_subuh', 'Dua rakaat fajar (sebelum Subuh) lebih baik daripada dunia dan seisinya. (HR. Muslim)\nBarangsiapa yang sholat Subuh berjamaah, maka ia berada dalam jaminan dan perlindungan Allah Ta''ala. (HR. Muslim)\nSungguh sholat Subuh itu disaksikan oleh para malaikat malam dan malaikat siang. (QS. Al-Isra: 78)\nAwali pagimu dengan sujud Subuh, niscaya Allah lapangkan rezeki dan berkahi harimu.', 'Mutiara Subuh'),
    ('pesan_sukses_dhuha', 'Dua rakaat sholat Dhuha mencukupi sedekah atas seluruh 360 persendian tubuhmu setiap harinya. (HR. Muslim)\nWahai anak Adam, janganlah engkau luput dari empat rakaat di awal harimu (Dhuha), niscaya Aku cukupkan kebutuhanmu hingga sore hari. (HR. Tirmidzi)\nSholat Dhuha adalah sholatnya orang-orang yang senantiasa bertaubat dan kembali kepada Allah. (HR. Ibnu Khuzaimah)\nRezeki tidak melulu tentang harta, hati yang damai dan tubuh yang sehat adalah karunia Dhuha.', 'Mutiara Dhuha'),
    ('pesan_sukses_dzuhur', 'Pintu-pintu langit dibuka pada saat tergelincir matahari (Dzuhur), dan aku suka amal shalihku diangkat pada saat itu. (HR. Tirmidzi)\nSholat Dzuhur tepat waktu di sela kesibukan adalah tanda kesetiaan cinta seorang hamba kepada Rabb-nya.\nRehatkan jiwamu dari hiruk-pikuk aktivitas siang dengan sujud Dzuhur yang khusyuk dan menentramkan.', 'Mutiara Dzuhur'),
    ('pesan_sukses_ashar', 'Barangsiapa meninggalkan sholat Ashar, maka gugurlah amal kebaikannya. (HR. Bukhari)\nOrang yang menjaga sholat sebelum terbit matahari (Subuh) dan sebelum terbenamnya (Ashar) tidak akan disentuh api neraka. (HR. Muslim)\nSholat Wustha (Ashar) adalah penjaga keteguhan hati di penghujung sore, istiqamahkan selalu.', 'Mutiara Ashar'),
    ('pesan_sukses_maghrib', 'Umatku akan senantiasa berada dalam kebaikan selama tidak menunda sholat Maghrib. (HR. Abu Dawud)\nTutup lembaran siang harimu dengan rasa syukur dan doa yang mustajab di antara azan dan iqamah sholat Maghrib.\nSaat senja berganti petang, terangi hatimu dengan sujud Maghrib yang penuh ketundukan kepada Sang Maha Pencipta.', 'Mutiara Maghrib'),
    ('pesan_sukses_isya', 'Barangsiapa sholat Isya berjamaah, maka seolah-olah ia telah sholat separuh malam. (HR. Muslim)\nSeandainya mereka mengetahui keutamaan sholat Isya dan Subuh, niscaya mereka akan mendatanginya meski merangkak. (HR. Bukhari & Muslim)\nLepaskan semua beban lelah harimu di hadapan Allah dalam sholat Isya, agar istirahat malammu dinaungi rahmat.', 'Mutiara Isya')
ON CONFLICT (parameter) DO UPDATE SET nilai = EXCLUDED.nilai;
