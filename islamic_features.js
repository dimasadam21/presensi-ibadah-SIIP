/**
 * ==============================================================================
 * FITUR ISLAMI TERPADU - PRESENSI IBADAH (EDISI KLONING)
 * ==============================================================================
 * 1. Al-Qur'an Versi Kemenag (114 Surat, No Surat, Halaman Mushaf 1-604)
 * 2. Pelacak Durasi Membaca Al-Qur'an Harian Siswa (Stopwatch & Daily Tracker)
 * 3. Kompas Kiblat Interaktif (Derajat Ka'bah, GPS & Sensor Orientasi HP)
 * 4. Dzikir Harian (Dzikir Pagi, Dzikir Petang, Dzikir Setelah Sholat + Tasbih)
 * 5. Doa Harian (Bangun Tidur s/d Tidur Lagi) + Manajemen Panel Admin
 * ==============================================================================
 */

// ==============================================================================
// 1. DATA MASTER 114 SURAT AL-QUR'AN (VERSI STANDAR KEMENAG RI - 604 HALAMAN)
// ==============================================================================
var QURAN_SURAHS = [
  { no: 1, nama: "Al-Fatihah", arab: "الفاتحة", arti: "Pembukaan", ayat: 7, turun: "Makkiyah", hal: 1 },
  { no: 2, nama: "Al-Baqarah", arab: "البقرة", arti: "Sapi Betina", ayat: 286, turun: "Madaniyah", hal: 2 },
  { no: 3, nama: "Ali 'Imran", arab: "آل عمران", arti: "Keluarga Imran", ayat: 200, turun: "Madaniyah", hal: 50 },
  { no: 4, nama: "An-Nisa'", arab: "النساء", arti: "Wanita", ayat: 176, turun: "Madaniyah", hal: 77 },
  { no: 5, nama: "Al-Ma'idah", arab: "المائدة", arti: "Jamuan Hidangan", ayat: 120, turun: "Madaniyah", hal: 106 },
  { no: 6, nama: "Al-An'am", arab: "الأنعام", arti: "Binatang Ternak", ayat: 165, turun: "Makkiyah", hal: 128 },
  { no: 7, nama: "Al-A'raf", arab: "الأعراف", arti: "Tempat Tertinggi", ayat: 206, turun: "Makkiyah", hal: 151 },
  { no: 8, nama: "Al-Anfal", arab: "الأنفال", arti: "Rampasan Perang", ayat: 75, turun: "Madaniyah", hal: 177 },
  { no: 9, nama: "At-Taubah", arab: "التوبة", arti: "Pengampunan", ayat: 129, turun: "Madaniyah", hal: 187 },
  { no: 10, nama: "Yunus", arab: "يونس", arti: "Nabi Yunus", ayat: 109, turun: "Makkiyah", hal: 208 },
  { no: 11, nama: "Hud", arab: "هود", arti: "Nabi Hud", ayat: 123, turun: "Makkiyah", hal: 221 },
  { no: 12, nama: "Yusuf", arab: "يوسف", arti: "Nabi Yusuf", ayat: 111, turun: "Makkiyah", hal: 235 },
  { no: 13, nama: "Ar-Ra'd", arab: "الرعد", arti: "Guruh", ayat: 43, turun: "Madaniyah", hal: 249 },
  { no: 14, nama: "Ibrahim", arab: "إبراهيم", arti: "Nabi Ibrahim", ayat: 52, turun: "Makkiyah", hal: 255 },
  { no: 15, nama: "Al-Hijr", arab: "الحجر", arti: "Daerah Pegunungan", ayat: 99, turun: "Makkiyah", hal: 262 },
  { no: 16, nama: "An-Nahl", arab: "النحل", arti: "Lebah", ayat: 128, turun: "Makkiyah", hal: 267 },
  { no: 17, nama: "Al-Isra'", arab: "الإسراء", arti: "Perjalanan Malam", ayat: 111, turun: "Makkiyah", hal: 282 },
  { no: 18, nama: "Al-Kahf", arab: "الكهف", arti: "Gua", ayat: 110, turun: "Makkiyah", hal: 293 },
  { no: 19, nama: "Maryam", arab: "مريم", arti: "Siti Maryam", ayat: 98, turun: "Makkiyah", hal: 305 },
  { no: 20, nama: "Taha", arab: "طه", arti: "Tha-Ha", ayat: 135, turun: "Makkiyah", hal: 312 },
  { no: 21, nama: "Al-Anbiya'", arab: "الأنبياء", arti: "Para Nabi", ayat: 112, turun: "Makkiyah", hal: 322 },
  { no: 22, nama: "Al-Hajj", arab: "الحج", arti: "Ibadah Haji", ayat: 78, turun: "Madaniyah", hal: 332 },
  { no: 23, nama: "Al-Mu'minun", arab: "المؤمنون", arti: "Orang-Orang Mukmin", ayat: 118, turun: "Makkiyah", hal: 342 },
  { no: 24, nama: "An-Nur", arab: "النور", arti: "Cahaya", ayat: 64, turun: "Madaniyah", hal: 350 },
  { no: 25, nama: "Al-Furqan", arab: "الفرقان", arti: "Pembeda Benar-Salah", ayat: 77, turun: "Makkiyah", hal: 359 },
  { no: 26, nama: "Asy-Syu'ara'", arab: "الشعراء", arti: "Para Penyair", ayat: 227, turun: "Makkiyah", hal: 367 },
  { no: 27, nama: "An-Naml", arab: "النمل", arti: "Semut", ayat: 93, turun: "Makkiyah", hal: 377 },
  { no: 28, nama: "Al-Qasas", arab: "القصص", arti: "Kisah-Kisah", ayat: 88, turun: "Makkiyah", hal: 385 },
  { no: 29, nama: "Al-'Ankabut", arab: "العنكبوت", arti: "Laba-Laba", ayat: 69, turun: "Makkiyah", hal: 396 },
  { no: 30, nama: "Ar-Rum", arab: "الروم", arti: "Bangsa Romawi", ayat: 60, turun: "Makkiyah", hal: 404 },
  { no: 31, nama: "Luqman", arab: "لقمان", arti: "Keluarga Luqman", ayat: 34, turun: "Makkiyah", hal: 411 },
  { no: 32, nama: "As-Sajdah", arab: "السجدة", arti: "Sujud", ayat: 30, turun: "Makkiyah", hal: 415 },
  { no: 33, nama: "Al-Ahzab", arab: "الأحزاب", arti: "Golongan Bersekutu", ayat: 73, turun: "Madaniyah", hal: 418 },
  { no: 34, nama: "Saba'", arab: "سبأ", arti: "Kaum Saba'", ayat: 54, turun: "Makkiyah", hal: 428 },
  { no: 35, nama: "Fatir", arab: "فاطر", arti: "Pencipta", ayat: 45, turun: "Makkiyah", hal: 434 },
  { no: 36, nama: "Ya Sin", arab: "يس", arti: "Ya-Sin", ayat: 83, turun: "Makkiyah", hal: 440 },
  { no: 37, nama: "As-Saffat", arab: "الصافات", arti: "Barisan-Barisan", ayat: 182, turun: "Makkiyah", hal: 446 },
  { no: 38, nama: "Sad", arab: "ص", arti: "Shad", ayat: 88, turun: "Makkiyah", hal: 453 },
  { no: 39, nama: "Az-Zumar", arab: "الزمر", arti: "Rombongan-Rombongan", ayat: 75, turun: "Makkiyah", hal: 458 },
  { no: 40, nama: "Ghafir", arab: "غافر", arti: "Maha Pengampun", ayat: 85, turun: "Makkiyah", hal: 467 },
  { no: 41, nama: "Fussilat", arab: "فصلت", arti: "Yang Dijelaskan", ayat: 54, turun: "Makkiyah", hal: 477 },
  { no: 42, nama: "Asy-Syura", arab: "الشورى", arti: "Musyawarah", ayat: 53, turun: "Makkiyah", hal: 483 },
  { no: 43, nama: "Az-Zukhruf", arab: "الزخرف", arti: "Perhiasan Emas", ayat: 89, turun: "Makkiyah", hal: 489 },
  { no: 44, nama: "Ad-Dukhan", arab: "الدخان", arti: "Kabut Asap", ayat: 59, turun: "Makkiyah", hal: 496 },
  { no: 45, nama: "Al-Jasiyah", arab: "الجاثية", arti: "Yang Berlutut", ayat: 37, turun: "Makkiyah", hal: 499 },
  { no: 46, nama: "Al-Ahqaf", arab: "الأحقاف", arti: "Bukit-Bukit Pasir", ayat: 35, turun: "Makkiyah", hal: 502 },
  { no: 47, nama: "Muhammad", arab: "محمد", arti: "Nabi Muhammad SAW", ayat: 38, turun: "Madaniyah", hal: 507 },
  { no: 48, nama: "Al-Fath", arab: "الفتح", arti: "Kemenangan", ayat: 29, turun: "Madaniyah", hal: 511 },
  { no: 49, nama: "Al-Hujurat", arab: "الحجرات", arti: "Kamar-Kamar", ayat: 18, turun: "Madaniyah", hal: 515 },
  { no: 50, nama: "Qaf", arab: "ق", arti: "Qaf", ayat: 45, turun: "Makkiyah", hal: 518 },
  { no: 51, nama: "Az-Zariyat", arab: "الذاريات", arti: "Angin Menerbangkan", ayat: 60, turun: "Makkiyah", hal: 520 },
  { no: 52, nama: "At-Tur", arab: "الطور", arti: "Bukit Tursina", ayat: 49, turun: "Makkiyah", hal: 523 },
  { no: 53, nama: "An-Najm", arab: "النجم", arti: "Bintang", ayat: 62, turun: "Makkiyah", hal: 526 },
  { no: 54, nama: "Al-Qamar", arab: "القمر", arti: "Bulan", ayat: 55, turun: "Makkiyah", hal: 528 },
  { no: 55, nama: "Ar-Rahman", arab: "الرحمن", arti: "Maha Pemurah", ayat: 78, turun: "Madaniyah", hal: 531 },
  { no: 56, nama: "Al-Waqi'ah", arab: "الواقعة", arti: "Hari Kiamat", ayat: 96, turun: "Makkiyah", hal: 534 },
  { no: 57, nama: "Al-Hadid", arab: "الحديد", arti: "Besi", ayat: 29, turun: "Madaniyah", hal: 537 },
  { no: 58, nama: "Al-Mujadilah", arab: "المجادلة", arti: "Gugatan Wanita", ayat: 22, turun: "Madaniyah", hal: 542 },
  { no: 59, nama: "Al-Hasyr", arab: "الحشر", arti: "Pengusiran", ayat: 24, turun: "Madaniyah", hal: 545 },
  { no: 60, nama: "Al-Mumtahanah", arab: "الممتحنة", arti: "Wanita Yang Diuji", ayat: 13, turun: "Madaniyah", hal: 549 },
  { no: 61, nama: "As-Saff", arab: "الصف", arti: "Barisan Yang Rapi", ayat: 14, turun: "Madaniyah", hal: 551 },
  { no: 62, nama: "Al-Jumu'ah", arab: "الجمعة", arti: "Hari Jum'at", ayat: 11, turun: "Madaniyah", hal: 553 },
  { no: 63, nama: "Al-Munafiqun", arab: "المنافقون", arti: "Orang-Orang Munafik", ayat: 11, turun: "Madaniyah", hal: 554 },
  { no: 64, nama: "At-Taghabun", arab: "التغابن", arti: "Hari Pengungkapan", ayat: 18, turun: "Madaniyah", hal: 556 },
  { no: 65, nama: "At-Talaq", arab: "الطلاق", arti: "Perceraian", ayat: 12, turun: "Madaniyah", hal: 558 },
  { no: 66, nama: "At-Tahrim", arab: "التحريم", arti: "Pengharaman", ayat: 12, turun: "Madaniyah", hal: 560 },
  { no: 67, nama: "Al-Mulk", arab: "الملك", arti: "Kerajaan / Kekuasaan", ayat: 30, turun: "Makkiyah", hal: 562 },
  { no: 68, nama: "Al-Qalam", arab: "القلم", arti: "Pena / Kalam", ayat: 52, turun: "Makkiyah", hal: 564 },
  { no: 69, nama: "Al-Haqqah", arab: "الحاقة", arti: "Kenyataan Pasti", ayat: 52, turun: "Makkiyah", hal: 566 },
  { no: 70, nama: "Al-Ma'arij", arab: "المعارج", arti: "Tempat-Tempat Naik", ayat: 44, turun: "Makkiyah", hal: 568 },
  { no: 71, nama: "Nuh", arab: "نوح", arti: "Nabi Nuh", ayat: 28, turun: "Makkiyah", hal: 570 },
  { no: 72, nama: "Al-Jinn", arab: "الجن", arti: "Golongan Jin", ayat: 28, turun: "Makkiyah", hal: 572 },
  { no: 73, nama: "Al-Muzzammil", arab: "المزمل", arti: "Yang Berselimut", ayat: 20, turun: "Makkiyah", hal: 574 },
  { no: 74, nama: "Al-Muddassir", arab: "المدثر", arti: "Yang Berkemul", ayat: 56, turun: "Makkiyah", hal: 575 },
  { no: 75, nama: "Al-Qiyamah", arab: "القيامة", arti: "Hari Kiamat", ayat: 40, turun: "Makkiyah", hal: 577 },
  { no: 76, nama: "Al-Insan", arab: "الإنسان", arti: "Manusia", ayat: 31, turun: "Madaniyah", hal: 578 },
  { no: 77, nama: "Al-Mursalat", arab: "المرسلات", arti: "Malaikat Yang Diutus", ayat: 50, turun: "Makkiyah", hal: 580 },
  { no: 78, nama: "An-Naba'", arab: "النبأ", arti: "Berita Besar", ayat: 40, turun: "Makkiyah", hal: 582 },
  { no: 79, nama: "An-Nazi'at", arab: "النازعات", arti: "Malaikat Pencabut", ayat: 46, turun: "Makkiyah", hal: 583 },
  { no: 80, name: "'Abasa", nama: "'Abasa", arab: "عبس", arti: "Bermuka Masam", ayat: 42, turun: "Makkiyah", hal: 585 },
  { no: 81, nama: "At-Takwir", arab: "التكوير", arti: "Menggulung", ayat: 29, turun: "Makkiyah", hal: 586 },
  { no: 82, nama: "Al-Infitar", arab: "الانفطار", arti: "Terbelah", ayat: 19, turun: "Makkiyah", hal: 587 },
  { no: 83, nama: "Al-Mutaffifin", arab: "المطففين", arti: "Orang Curang", ayat: 36, turun: "Makkiyah", hal: 587 },
  { no: 84, nama: "Al-Insyiqaq", arab: "الانشقاق", arti: "Terbelah Dua", ayat: 25, turun: "Makkiyah", hal: 589 },
  { no: 85, nama: "Al-Buruj", arab: "البروج", arti: "Gugusan Bintang", ayat: 22, turun: "Makkiyah", hal: 590 },
  { no: 86, nama: "At-Tariq", arab: "الطارق", arti: "Bintang Waktu Malam", ayat: 17, turun: "Makkiyah", hal: 591 },
  { no: 87, nama: "Al-A'la", arab: "الأعلى", arti: "Yang Maha Tinggi", ayat: 19, turun: "Makkiyah", hal: 591 },
  { no: 88, nama: "Al-Ghasyiyah", arab: "الغاشية", arti: "Hari Pembalasan", ayat: 26, turun: "Makkiyah", hal: 592 },
  { no: 89, nama: "Al-Fajr", arab: "الفجر", arti: "Waktu Fajar", ayat: 30, turun: "Makkiyah", hal: 593 },
  { no: 90, nama: "Al-Balad", arab: "البلد", arti: "Negeri Makkah", ayat: 20, turun: "Makkiyah", hal: 594 },
  { no: 91, nama: "Asy-Syams", arab: "الشمس", arti: "Matahari", ayat: 15, turun: "Makkiyah", hal: 595 },
  { no: 92, nama: "Al-Lail", arab: "الليل", arti: "Malam", ayat: 21, turun: "Makkiyah", hal: 595 },
  { no: 93, nama: "Ad-Duha", arab: "الضحى", arti: "Waktu Duha", ayat: 11, turun: "Makkiyah", hal: 596 },
  { no: 94, nama: "Asy-Syarh", arab: "الشرح", arti: "Melapangkan Dada", ayat: 8, turun: "Makkiyah", hal: 596 },
  { no: 95, nama: "At-Tin", arab: "التين", arti: "Buah Tin", ayat: 8, turun: "Makkiyah", hal: 597 },
  { no: 96, nama: "Al-'Alaq", arab: "العلق", arti: "Segumpal Darah", ayat: 19, turun: "Makkiyah", hal: 597 },
  { no: 97, nama: "Al-Qadr", arab: "القدر", arti: "Kemuliaan", ayat: 5, turun: "Makkiyah", hal: 598 },
  { no: 98, nama: "Al-Bayyinah", arab: "البينة", arti: "Bukti Nyata", ayat: 8, turun: "Madaniyah", hal: 598 },
  { no: 99, nama: "Az-Zalzalah", arab: "الزلزلة", arti: "Goncangan Dahsyat", ayat: 8, turun: "Madaniyah", hal: 599 },
  { no: 100, nama: "Al-'Adiyat", arab: "العاديات", arti: "Kuda Berlari Kencang", ayat: 11, turun: "Makkiyah", hal: 599 },
  { no: 101, nama: "Al-Qari'ah", arab: "القارعة", arti: "Hari Kiamat", ayat: 11, turun: "Makkiyah", hal: 600 },
  { no: 102, nama: "At-Takasur", arab: "التكاثر", arti: "Bermegah-Megahan", ayat: 8, turun: "Makkiyah", hal: 600 },
  { no: 103, nama: "Al-'Asr", arab: "العصر", arti: "Demi Masa", ayat: 3, turun: "Makkiyah", hal: 601 },
  { no: 104, nama: "Al-Humazah", arab: "الهمزة", arti: "Pengumpat", ayat: 9, turun: "Makkiyah", hal: 601 },
  { no: 105, nama: "Al-Fil", arab: "الفيل", arti: "Pasukan Gajah", ayat: 5, turun: "Makkiyah", hal: 601 },
  { no: 106, nama: "Quraisy", arab: "قريش", arti: "Suku Quraisy", ayat: 4, turun: "Makkiyah", hal: 602 },
  { no: 107, nama: "Al-Ma'un", arab: "الماعون", arti: "Barang Berguna", ayat: 7, turun: "Makkiyah", hal: 602 },
  { no: 108, nama: "Al-Kausar", arab: "الكوثر", arti: "Nikmat Yang Banyak", ayat: 3, turun: "Makkiyah", hal: 602 },
  { no: 109, nama: "Al-Kafirun", arab: "الكافرون", arti: "Orang-Orang Kafir", ayat: 6, turun: "Makkiyah", hal: 603 },
  { no: 110, nama: "An-Nasr", arab: "النصر", arti: "Pertolongan", ayat: 3, turun: "Madaniyah", hal: 603 },
  { no: 111, nama: "Al-Lahab", arab: "اللهب", arti: "Gejolak Api", ayat: 5, turun: "Makkiyah", hal: 603 },
  { no: 112, nama: "Al-Ikhlas", arab: "الإخلاص", arti: "Kemurnian Keesaan", ayat: 4, turun: "Makkiyah", hal: 604 },
  { no: 113, nama: "Al-Falaq", arab: "الفلق", arti: "Waktu Subuh", ayat: 5, turun: "Makkiyah", hal: 604 },
  { no: 114, nama: "An-Nas", arab: "الناس", arti: "Umat Manusia", ayat: 6, turun: "Makkiyah", hal: 604 }
];

// Cache lokal ayat untuk surah-surah utama jika offline
var QURAN_AYAT_CACHE = {
  1: {
    nama: "Al-Fatihah",
    arab: "الفاتحة",
    hal: 1,
    ayatList: [
      { nomorAyat: 1, teksArab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", teksLatin: "Bismillāhir-raḥmānir-raḥīm(i).", teksIndonesia: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang." },
      { nomorAyat: 2, teksArab: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ", teksLatin: "Al-ḥamdu lillāhi rabbil-'ālamīn(a).", teksIndonesia: "Segala puji bagi Allah, Tuhan semesta alam." },
      { nomorAyat: 3, teksArab: "الرَّحْمٰنِ الرَّحِيْمِۙ", teksLatin: "Ar-raḥmānir-raḥīm(i).", teksIndonesia: "Yang Maha Pengasih lagi Maha Penyayang," },
      { nomorAyat: 4, teksArab: "مٰلِكِ يَوْمِ الدِّيْنِۗ", teksLatin: "Māliki yaumid-dīn(i).", teksIndonesia: "Pemilik hari pembalasan." },
      { nomorAyat: 5, teksArab: "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ", teksLatin: "Iyyāka na'budu wa iyyāka nasta'īn(u).", teksIndonesia: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan." },
      { nomorAyat: 6, teksArab: "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ", teksLatin: "Ihdinaṣ-ṣirāṭal-mustaqīm(a).", teksIndonesia: "Tunjukilah kami jalan yang lurus," },
      { nomorAyat: 7, teksArab: "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ", teksLatin: "Ṣirāṭal-lażīna an'amta 'alaihim, gairil-magḍūbi 'alaihim wa laḍ-ḍāllīn(a).", teksIndonesia: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat." }
    ]
  },
  112: {
    nama: "Al-Ikhlas",
    arab: "الإخلاص",
    hal: 604,
    ayatList: [
      { nomorAyat: 1, teksArab: "قُلْ هُوَ اللّٰهُ اَحَدٌۚ", teksLatin: "Qul huwallāhu aḥad(un).", teksIndonesia: "Katakanlah (Nabi Muhammad), 'Dialah Allah Yang Maha Esa.'" },
      { nomorAyat: 2, teksArab: "اَللّٰهُ الصَّمَدُۚ", teksLatin: "Allāhuṣ-ṣamad(u).", teksIndonesia: "Allah tempat meminta segala sesuatu." },
      { nomorAyat: 3, teksArab: "لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ", teksLatin: "Lam yalid wa lam yūlad.", teksIndonesia: "Dia tidak beranak dan tidak pula diperanakkan," },
      { nomorAyat: 4, teksArab: "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ", teksLatin: "Wa lam yakul lahū kufuwan aḥad(un).", teksIndonesia: "serta tidak ada sesuatu pun yang setara dengan-Nya." }
    ]
  },
  113: {
    nama: "Al-Falaq",
    arab: "الفلق",
    hal: 604,
    ayatList: [
      { nomorAyat: 1, teksArab: "قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ", teksLatin: "Qul a'ūżu birabbil-falaq(i).", teksIndonesia: "Katakanlah (Nabi Muhammad), 'Aku berlindung kepada Tuhan yang menguasai subuh (fajar)'" },
      { nomorAyat: 2, teksArab: "مِنْ شَرِّ مَا خَلَقَۙ", teksLatin: "Min syarri mā khalaq(a).", teksIndonesia: "dari kejahatan (makhluk yang) Dia ciptakan," },
      { nomorAyat: 3, teksArab: "وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ", teksLatin: "Wa min syarri gāsiqin iżā waqab(a).", teksIndonesia: "dari kejahatan malam apabila telah gelap gulita," },
      { nomorAyat: 4, teksArab: "وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ", teksLatin: "Wa min syarrin-naffāṡāti fil-'uqad(i).", teksIndonesia: "dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya)," },
      { nomorAyat: 5, teksArab: "وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ", teksLatin: "Wa min syarri ḥāsidin iżā ḥasad(a).", teksIndonesia: "dan dari kejahatan orang yang dengki apabila dia dengki." }
    ]
  },
  114: {
    nama: "An-Nas",
    arab: "الناس",
    hal: 604,
    ayatList: [
      { nomorAyat: 1, teksArab: "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ", teksLatin: "Qul a'ūżu birabbin-nās(i).", teksIndonesia: "Katakanlah (Nabi Muhammad), 'Aku berlindung kepada Tuhan manusia,'" },
      { nomorAyat: 2, teksArab: "مَلِكِ النَّاسِۙ", teksLatin: "Malikin-nās(i).", teksIndonesia: "Raja manusia," },
      { nomorAyat: 3, teksArab: "اِلٰهِ النَّاسِۙ", teksLatin: "Ilāhin-nās(i).", teksIndonesia: "sembahan manusia," },
      { nomorAyat: 4, teksArab: "مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ", teksLatin: "Min syarril-waswāsil-khannās(i).", teksIndonesia: "dari kejahatan (bisikan) setan yang bersembunyi," },
      { nomorAyat: 5, teksArab: "الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ", teksLatin: "Allażī yuwaswisu fī ṣudūrin-nās(i).", teksIndonesia: "yang membisikkan (kejahatan) ke dalam dada manusia," },
      { nomorAyat: 6, teksArab: "مِنَ الْجِنَّةِ وَالنَّاسِ", teksLatin: "Minal-jinnati wan-nās(i).", teksIndonesia: "dari (golongan) jin dan manusia." }
    ]
  }
};

// ==============================================================================
// 2. SISTEM PELACAK DURASI MEMBACA AL-QUR'AN HARIAN SISWA
// ==============================================================================
var QURAN_TIMER_STATE = {
  running: false,
  timerInterval: null,
  currentSessionSeconds: 0,
  activeSurahNo: null,
  activeSurahName: ''
};

function getTodayKey() {
  var d = new Date();
  var yr = d.getFullYear();
  var mo = String(d.getMonth() + 1).padStart(2, '0');
  var da = String(d.getDate()).padStart(2, '0');
  return yr + '-' + mo + '-' + da;
}

function getSiswaNis() {
  if (typeof SISWA !== 'undefined' && SISWA && SISWA.nis) return SISWA.nis;
  try {
    var s = localStorage.getItem('siswa_data');
    if (s) { var o = JSON.parse(s); if (o && o.nis) return o.nis; }
  } catch (e) { }
  return 'tamu';
}

function getQuranReadingDurationTodaySec() {
  var nis = getSiswaNis();
  var key = 'quran_duration_' + nis + '_' + getTodayKey();
  var v = parseInt(localStorage.getItem(key), 10);
  return isNaN(v) ? 0 : v;
}

function simpanQuranReadingDurationTodaySec(totalSec) {
  var nis = getSiswaNis();
  var key = 'quran_duration_' + nis + '_' + getTodayKey();
  localStorage.setItem(key, totalSec);
}

function formatDetikKeWaktuLengkap(detik) {
  var jam = Math.floor(detik / 3600);
  var sisa = detik % 3600;
  var menit = Math.floor(sisa / 60);
  var d = sisa % 60;
  if (jam > 0) {
    return jam + " Jam " + menit + " Menit " + d + " Detik";
  }
  return menit + " Menit " + d + " Detik";
}

function formatDetikDigital(detik) {
  var jam = Math.floor(detik / 3600);
  var menit = Math.floor((detik % 3600) / 60);
  var d = detik % 60;
  var str = (menit < 10 ? '0' : '') + menit + ':' + (d < 10 ? '0' : '') + d;
  if (jam > 0) str = (jam < 10 ? '0' : '') + jam + ':' + str;
  return str;
}

function updateTampilanDurasiQuranSemua() {
  var totalSec = getQuranReadingDurationTodaySec() + (QURAN_TIMER_STATE.running ? QURAN_TIMER_STATE.currentSessionSeconds : 0);
  var txtLengkap = formatDetikKeWaktuLengkap(totalSec);
  var txtDigital = formatDetikDigital(totalSec);

  // Widget ringkas di dashboard bawah absensi
  var elRingkas = document.getElementById('dispDurasiQuranHariIniRingkas');
  if (elRingkas) elRingkas.textContent = txtLengkap;

  // Header modal Qur'an
  var elModalTimer = document.getElementById('dispTimerQuranModal');
  if (elModalTimer) elModalTimer.textContent = txtDigital;

  var elModalLengkap = document.getElementById('dispDurasiQuranModalLengkap');
  if (elModalLengkap) elModalLengkap.textContent = txtLengkap;

  // Progress Bar Harian (Target 15 menit = 900 detik)
  var TARGET_SEC = 900;
  var pct = Math.min(100, Math.round((totalSec / TARGET_SEC) * 100));
  var elBar = document.getElementById('quranProgressBar');
  if (elBar) elBar.style.width = pct + '%';
  var elPct = document.getElementById('quranProgressText');
  if (elPct) elPct.textContent = pct + '% dari target 15 menit/hari';
}

function mulaiTimerQuran(surahNo, surahName) {
  if (QURAN_TIMER_STATE.running) return;
  QURAN_TIMER_STATE.running = true;
  QURAN_TIMER_STATE.activeSurahNo = surahNo || QURAN_TIMER_STATE.activeSurahNo;
  QURAN_TIMER_STATE.activeSurahName = surahName || QURAN_TIMER_STATE.activeSurahName || 'Membaca Al-Qur\'an';

  var btn = document.getElementById('btnToggleTimerQuran');
  if (btn) {
    btn.innerHTML = '⏸️ Jeda Baca';
    btn.className = 'btn btn-sm btn-outline';
  }

  var dot = document.getElementById('quranTimerDot');
  if (dot) dot.classList.add('blinking');

  QURAN_TIMER_STATE.timerInterval = setInterval(function () {
    QURAN_TIMER_STATE.currentSessionSeconds++;
    updateTampilanDurasiQuranSemua();

    // Auto-save tiap 15 detik agar tidak hilang jika browser tertutup
    if (QURAN_TIMER_STATE.currentSessionSeconds % 15 === 0) {
      commitSessionQuranToStorage();
    }
  }, 1000);

  updateTampilanDurasiQuranSemua();
}

function jedaTimerQuran() {
  if (!QURAN_TIMER_STATE.running) return;
  QURAN_TIMER_STATE.running = false;
  if (QURAN_TIMER_STATE.timerInterval) {
    clearInterval(QURAN_TIMER_STATE.timerInterval);
    QURAN_TIMER_STATE.timerInterval = null;
  }
  commitSessionQuranToStorage();

  var btn = document.getElementById('btnToggleTimerQuran');
  if (btn) {
    btn.innerHTML = '▶️ Lanjut Baca';
    btn.className = 'btn btn-sm btn-primary';
  }

  var dot = document.getElementById('quranTimerDot');
  if (dot) dot.classList.remove('blinking');

  updateTampilanDurasiQuranSemua();
}

function toggleTimerQuran() {
  if (QURAN_TIMER_STATE.running) {
    jedaTimerQuran();
  } else {
    mulaiTimerQuran();
  }
}

function commitSessionQuranToStorage() {
  if (QURAN_TIMER_STATE.currentSessionSeconds > 0) {
    var totalSebelumnya = getQuranReadingDurationTodaySec();
    var totalBaru = totalSebelumnya + QURAN_TIMER_STATE.currentSessionSeconds;
    simpanQuranReadingDurationTodaySec(totalBaru);
    QURAN_TIMER_STATE.currentSessionSeconds = 0;
  }
}

// ==============================================================================
// 3. UI CONTROLLER AL-QUR'AN (MODAL, LIST SURAT & READER)
// ==============================================================================
function bukaModalQuran() {
  var m = document.getElementById('modalQuran');
  if (!m) return;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  renderDaftarSuratQuran(QURAN_SURAHS);
  updateTampilanDurasiQuranSemua();

  // Tampilkan daftar surat secara default
  tampilkanViewDaftarSurat();
}

function tutupModalQuran() {
  jedaTimerQuran();
  var m = document.getElementById('modalQuran');
  if (m) m.classList.add('hidden');
  document.body.style.overflow = '';
  updateTampilanDurasiQuranSemua();
}

function tampilkanViewDaftarSurat() {
  var vList = document.getElementById('quranSurahListView');
  var vReader = document.getElementById('quranVerseReaderView');
  if (vList) vList.classList.remove('hidden');
  if (vReader) vReader.classList.add('hidden');
  var judulModal = document.getElementById('quranModalTitle');
  if (judulModal) judulModal.textContent = '📖 Al-Qur\'an Kemenag RI';
}

function renderDaftarSuratQuran(list) {
  var c = document.getElementById('quranSurahContainer');
  if (!c) return;

  if (!list || list.length === 0) {
    c.innerHTML = '<div style="text-align:center;padding:30px 10px;color:var(--muted);font-size:13px;">Surat tidak ditemukan.</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    html += '<div class="quran-surah-row" onclick="bacaSuratQuran(' + s.no + ')">' +
      '<div class="surah-num-box">' + s.no + '</div>' +
      '<div class="surah-info-box">' +
        '<div class="surah-title-row">' +
          '<span class="surah-latin-name">' + escHtml(s.nama) + '</span>' +
          '<span class="surah-arabic-name">' + s.arab + '</span>' +
        '</div>' +
        '<div class="surah-meta-row">' +
          '<span class="surah-type-badge ' + (s.turun === 'Makkiyah' ? 'type-makkiyah' : 'type-madaniyah') + '">' + s.turun + '</span>' +
          '<span class="surah-ayat-count">' + s.ayat + ' Ayat</span>' +
          '<span class="surah-page-badge">📄 Hal. ' + s.hal + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="surah-action-arrow">›</div>' +
    '</div>';
  }
  c.innerHTML = html;
}

function filterDaftarSuratQuran() {
  var q = (document.getElementById('cariSuratInput').value || '').trim().toLowerCase();
  if (!q) {
    renderDaftarSuratQuran(QURAN_SURAHS);
    return;
  }
  var hasil = QURAN_SURAHS.filter(function (s) {
    return s.nama.toLowerCase().includes(q) ||
           String(s.no) === q ||
           String(s.hal) === q ||
           s.arti.toLowerCase().includes(q);
  });
  renderDaftarSuratQuran(hasil);
}

async function bacaSuratQuran(nomorSurat) {
  var meta = QURAN_SURAHS.find(function (s) { return s.no === nomorSurat; });
  if (!meta) return;

  var vList = document.getElementById('quranSurahListView');
  var vReader = document.getElementById('quranVerseReaderView');
  if (vList) vList.classList.add('hidden');
  if (vReader) vReader.classList.remove('hidden');

  var judulModal = document.getElementById('quranModalTitle');
  if (judulModal) judulModal.textContent = '📖 Surat ' + meta.nama + ' (' + meta.arab + ')';

  // Set reader header info
  var hdr = document.getElementById('readerSurahHeader');
  if (hdr) {
    hdr.innerHTML = '<div style="text-align:center;">' +
      '<h2 style="font-family: \'Amiri\', serif; font-size:32px; color:var(--primary); margin:0;">' + meta.arab + '</h2>' +
      '<h3 style="font-size:18px; font-weight:800; color:var(--text); margin-top:4px;">' + meta.no + '. ' + meta.nama + '</h3>' +
      '<div style="font-size:12.5px; color:var(--muted); margin-top:2px;">' + meta.arti + ' • ' + meta.turun + ' • ' + meta.ayat + ' Ayat • <b>Halaman ' + meta.hal + '</b></div>' +
    '</div>';
  }

  // Mulai pelacak timer membaca
  mulaiTimerQuran(meta.no, meta.nama);

  var container = document.getElementById('readerAyatContainer');
  container.innerHTML = '<div style="text-align:center;padding:40px 10px;color:var(--muted);"><span class="spin">⏳</span> Memuat ayat-ayat Surat ' + meta.nama + ' versi Kemenag...</div>';

  // 1. Cek cache lokal
  if (QURAN_AYAT_CACHE[nomorSurat]) {
    renderAyatList(QURAN_AYAT_CACHE[nomorSurat].ayatList, meta);
    return;
  }

  // 2. Fetch dari equran.id API v2 (Kemenag Official)
  try {
    var res = await fetch('https://equran.id/api/v2/surat/' + nomorSurat);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var json = await res.json();
    if (json && json.data && json.data.ayat) {
      QURAN_AYAT_CACHE[nomorSurat] = {
        nama: meta.nama,
        arab: meta.arab,
        hal: meta.hal,
        ayatList: json.data.ayat
      };
      renderAyatList(json.data.ayat, meta);
      return;
    }
    throw new Error('Data tidak lengkap');
  } catch (err) {
    console.warn('Gagal memuat ayat online, menampilkan data darurat:', err);
    // Tampilkan placeholder fallback jika koneksi internet terputus
    container.innerHTML = '<div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:16px;text-align:center;color:#991b1b;font-size:13px;line-height:1.6;">' +
      '⚠️ <b>Gagal memuat ayat secara online (koneksi terputus).</b><br>' +
      'Silakan periksa koneksi internet atau buka surat lain (Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas tersedia offline).<br>' +
      '<button class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="bacaSuratQuran(' + nomorSurat + ')">🔄 Coba Lagi</button>' +
    '</div>';
  }
}

function renderAyatList(ayatList, meta) {
  var container = document.getElementById('readerAyatContainer');
  if (!container) return;

  var html = '';

  // Banner Bismillah (Kecuali Al-Fatihah karena ayat 1 sudah bismillah, dan At-Taubah tidak ada bismillah)
  if (meta.no !== 1 && meta.no !== 9) {
    html += '<div class="bismillah-banner">' +
      '<div class="bismillah-text">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>' +
      '<div class="bismillah-trans">Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang</div>' +
    '</div>';
  }

  for (var i = 0; i < ayatList.length; i++) {
    var a = ayatList[i];
    var noAyat = a.nomorAyat || (i + 1);
    var arab = a.teksArab || '';
    var latin = a.teksLatin || '';
    var arti = a.teksIndonesia || '';

    html += '<div class="ayat-card">' +
      '<div class="ayat-header-bar">' +
        '<span class="ayat-badge-pill">Ayat ' + noAyat + '</span>' +
        '<button class="btn btn-ghost btn-sm" onclick="salinTeksAyat(' + meta.no + ',' + noAyat + ', this)" style="padding:2px 8px;font-size:11.5px;">📋 Salin</button>' +
      '</div>' +
      '<div class="ayat-arabic-text">' + arab + ' <span class="ayat-end-number">۝' + toArabicDigits(noAyat) + '</span></div>' +
      '<div class="ayat-latin-text">' + escHtml(latin) + '</div>' +
      '<div class="ayat-indo-text">' + escHtml(arti) + '</div>' +
    '</div>';
  }

  // Footer navigasi surat sebelumnya / selanjutnya
  html += '<div style="display:flex;gap:10px;margin-top:20px;padding-bottom:30px;">';
  if (meta.no > 1) {
    html += '<button class="btn btn-outline" style="flex:1;" onclick="bacaSuratQuran(' + (meta.no - 1) + ')">‹ Surat ' + QURAN_SURAHS[meta.no - 2].nama + '</button>';
  }
  if (meta.no < 114) {
    html += '<button class="btn btn-primary" style="flex:1;" onclick="bacaSuratQuran(' + (meta.no + 1) + ')">Surat ' + QURAN_SURAHS[meta.no].nama + ' ›</button>';
  }
  html += '</div>';

  container.innerHTML = html;
  container.scrollTop = 0;
}

function toArabicDigits(num) {
  var arDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return String(num).replace(/[0-9]/g, function (d) { return arDigits[d]; });
}

function salinTeksAyat(noSurat, noAyat, btn) {
  var meta = QURAN_SURAHS.find(function (s) { return s.no === noSurat; });
  var surahData = QURAN_AYAT_CACHE[noSurat];
  if (!surahData || !surahData.ayatList) return;
  var a = surahData.ayatList.find(function (item) { return item.nomorAyat === noAyat; });
  if (!a) return;

  var teks = meta.nama + ' ayat ' + noAyat + ':\n\n' + a.teksArab + '\n\n"' + a.teksIndonesia + '" (QS. ' + meta.nama + ': ' + noAyat + ')';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(teks).then(function () {
      if (typeof toast === 'function') toast('Ayat berhasil disalin ke clipboard!', 'ok');
      if (btn) { btn.textContent = '✓ Disalin'; setTimeout(function () { btn.textContent = '📋 Salin'; }, 2000); }
    });
  }
}

// ==============================================================================
// 4. FITUR KOMPAS KIBLAT (QIBLA COMPASS CALCULATOR & SENSOR)
// ==============================================================================
var KIBLAT_STATE = {
  qiblaBearing: 294.6, // Default pulau Jawa / Magelang
  userHeading: 0,
  distanceKm: 8452,
  lat: -7.4726,
  lng: 110.2198,
  calibrated: false,
  sensorActive: false
};

function hitungDerajatKiblat(lat, lng) {
  var phi1 = lat * (Math.PI / 180);
  var lambda1 = lng * (Math.PI / 180);
  var phi2 = 21.422487 * (Math.PI / 180); // Lat Ka'bah
  var lambda2 = 39.826206 * (Math.PI / 180); // Lng Ka'bah

  var y = Math.sin(lambda2 - lambda1);
  var x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(lambda2 - lambda1);
  var qiblaRad = Math.atan2(y, x);
  var qiblaDeg = (qiblaRad * 180 / Math.PI + 360) % 360;

  // Jarak Haversine ke Ka'bah
  var R = 6371; // Radius bumi KM
  var dLat = phi2 - phi1;
  var dLon = lambda2 - lambda1;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var dKm = Math.round(R * c);

  return { bearing: Math.round(qiblaDeg * 10) / 10, distance: dKm };
}

function bukaModalKiblat() {
  var m = document.getElementById('modalKiblat');
  if (!m) return;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Ambil lokasi jika ada GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      KIBLAT_STATE.lat = pos.coords.latitude;
      KIBLAT_STATE.lng = pos.coords.longitude;
      var res = hitungDerajatKiblat(KIBLAT_STATE.lat, KIBLAT_STATE.lng);
      KIBLAT_STATE.qiblaBearing = res.bearing;
      KIBLAT_STATE.distanceKm = res.distance;
      updateTampilanKompasKiblat();
    }, function () {
      // Gunakan default sekolah
      var res = hitungDerajatKiblat(KIBLAT_STATE.lat, KIBLAT_STATE.lng);
      KIBLAT_STATE.qiblaBearing = res.bearing;
      KIBLAT_STATE.distanceKm = res.distance;
      updateTampilanKompasKiblat();
    }, { timeout: 6000 });
  } else {
    updateTampilanKompasKiblat();
  }

  mulaiSensorOrientasiKiblat();
}

function tutupModalKiblat() {
  stopSensorOrientasiKiblat();
  var m = document.getElementById('modalKiblat');
  if (m) m.classList.add('hidden');
  document.body.style.overflow = '';
}

function updateTampilanKompasKiblat() {
  var elSudut = document.getElementById('dispSudutKiblat');
  if (elSudut) elSudut.textContent = KIBLAT_STATE.qiblaBearing + '°';

  var elJarak = document.getElementById('dispJarakMakkah');
  if (elJarak) elJarak.textContent = KIBLAT_STATE.distanceKm.toLocaleString('id-ID') + ' km';

  var elBadge = document.getElementById('badgeArahKiblat');
  if (elBadge) elBadge.textContent = KIBLAT_STATE.qiblaBearing + '° Makkah';

  putarKompasVisual();
}

function putarKompasVisual() {
  var compassDial = document.getElementById('compassDial');
  var needle = document.getElementById('compassNeedle');
  var kabahMarker = document.getElementById('compassKabahMarker');

  if (compassDial) {
    // Putar piringan berlawanan arah heading user
    compassDial.style.transform = 'rotate(' + (-KIBLAT_STATE.userHeading) + 'deg)';
  }

  // Cek apakah perangkat lurus ke arah kiblat (toleransi +/- 3 derajat)
  var selisih = Math.abs((KIBLAT_STATE.userHeading - KIBLAT_STATE.qiblaBearing + 360) % 360);
  var isTepat = selisih <= 3.5 || selisih >= 356.5;

  var statusBox = document.getElementById('kiblatAlignStatus');
  if (statusBox) {
    if (isTepat) {
      statusBox.innerHTML = '🕋 <b style="color:#047857;">MENGHADAP KIBLAT SECARA PRESISI!</b>';
      statusBox.style.background = '#d1fae5';
      statusBox.style.borderColor = '#10b981';
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      statusBox.innerHTML = '🧭 Putar HP hingga jarum hijau menunjuk lurus ke atas.';
      statusBox.style.background = '#f8fafc';
      statusBox.style.borderColor = '#cbd5e1';
    }
  }
}

function handleOrientationEvent(e) {
  var heading = null;
  if (e.webkitCompassHeading !== undefined) {
    heading = e.webkitCompassHeading; // iOS Safari
  } else if (e.alpha !== null) {
    heading = 360 - e.alpha; // Android Chrome
  }

  if (heading !== null) {
    KIBLAT_STATE.userHeading = Math.round(heading);
    KIBLAT_STATE.sensorActive = true;
    var elHeading = document.getElementById('dispUserHeading');
    if (elHeading) elHeading.textContent = KIBLAT_STATE.userHeading + '°';
    putarKompasVisual();
  }
}

function mulaiSensorOrientasiKiblat() {
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+
    DeviceOrientationEvent.requestPermission().then(function (res) {
      if (res === 'granted') {
        window.addEventListener('deviceorientation', handleOrientationEvent, true);
      }
    }).catch(function () {});
  } else if ('ondeviceorientationabsolute' in window) {
    window.addEventListener('deviceorientationabsolute', handleOrientationEvent, true);
  } else if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', handleOrientationEvent, true);
  }
}

function stopSensorOrientasiKiblat() {
  window.removeEventListener('deviceorientationabsolute', handleOrientationEvent, true);
  window.removeEventListener('deviceorientation', handleOrientationEvent, true);
}

function simulasiManualHeading(val) {
  KIBLAT_STATE.userHeading = parseInt(val, 10);
  var elHeading = document.getElementById('dispUserHeading');
  if (elHeading) elHeading.textContent = KIBLAT_STATE.userHeading + '°';
  putarKompasVisual();
}

// ==============================================================================
// 5. FITUR DZIKIR (PAGI, PETANG & SETELAH SHOLAT + TASBIH DIGITAL)
// ==============================================================================
var DZIKIR_DATA = {
  pagi: [
    {
      id: 'p1',
      judul: 'Ayat Kursi (1x)',
      anjuran: 'Dibaca 1x di pagi hari untuk perlindungan dari jin & setan hingga petang.',
      arab: 'اللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
      latin: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm(u), lā ta\'khużuhū sinatuw wa lā naum(un)...',
      arti: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur...',
      target: 1,
      hitung: 0
    },
    {
      id: 'p2',
      judul: 'Surat Al-Ikhlas, Al-Falaq, An-Nas (3x)',
      anjuran: 'Mencukupi dari segala kejahatan (HR. Abu Dawud & Tirmidzi).',
      arab: 'قُلْ هُوَ اللّٰهُ اَحَدٌ ... قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ... قُلْ اَعُوْذُ بِرَبِّ النَّاسِ',
      latin: 'Qul huwallāhu aḥad... Qul a\'ūżu birabbil-falaq... Qul a\'ūżu birabbin-nās...',
      arti: 'Membaca Surat Al-Ikhlas, Al-Falaq, dan An-Nas masing-masing sebanyak 3 kali.',
      target: 3,
      hitung: 0
    },
    {
      id: 'p3',
      judul: 'Asbahna wa Asbahal Mulku Lillah (1x)',
      anjuran: 'Pengakuan ketauhidan dan kekuasaan Allah di pagi hari.',
      arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      latin: 'Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah...',
      arti: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tiada tuhan yang berhak disembah selain Allah Yang Maha Esa...',
      target: 1,
      hitung: 0
    },
    {
      id: 'p4',
      judul: 'Sayyidul Istighfar (1x)',
      anjuran: 'Puncak istighfar, barangsiapa membacanya di pagi hari lalu wafat maka ia ahli surga (HR. Bukhari).',
      arab: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
      latin: 'Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa anā \'abduka, wa anā \'alā \'ahdika wa wa\'dika mastaṭa\'tu...',
      arti: 'Ya Allah, Engkau adalah Tuhanku, tiada tuhan selain Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu. Aku senantiasa setia pada perjanjian-Mu semampuku...',
      target: 1,
      hitung: 0
    },
    {
      id: 'p5',
      judul: 'Bismillahilladzi La Yadhurru (3x)',
      anjuran: 'Terhindar dari bahaya racun, sihir, dan marabahaya mendadak (HR. Abu Dawud).',
      arab: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      latin: 'Bismillāhillażī lā yaḍurru ma\'asmihī syai\'un fil-arḍi wa lā fis-samā\'i wa huwas-samī\'ul-\'alīm.',
      arti: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi dan di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
      target: 3,
      hitung: 0
    },
    {
      id: 'p6',
      judul: 'Subhanallahi wa Bihamdihi (100x)',
      anjuran: 'Dihapuskan dosa-dosanya walau sebanyak buih di lautan (HR. Muslim).',
      arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      latin: 'Subḥānallāhi wa biḥamdih(i).',
      arti: 'Maha Suci Allah dan segala puji bagi-Nya.',
      target: 100,
      hitung: 0
    }
  ],
  petang: [
    {
      id: 'pt1',
      judul: 'Ayat Kursi (1x)',
      anjuran: 'Perlindungan dari jin hingga pagi hari (HR. Al-Hakim).',
      arab: 'اللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ...',
      latin: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm(u)...',
      arti: 'Allah, tiada tuhan selain Dia, Yang Mahahidup kekal abadi...',
      target: 1,
      hitung: 0
    },
    {
      id: 'pt2',
      judul: 'Surat Al-Ikhlas, Al-Falaq, An-Nas (3x)',
      anjuran: 'Mencukupi dari segala kejahatan di waktu malam.',
      arab: 'قُلْ هُوَ اللّٰهُ اَحَدٌ ... قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ... قُلْ اَعُوْذُ بِرَبِّ النَّاسِ',
      latin: 'Qul huwallāhu aḥad... Qul a\'ūżu birabbil-falaq... Qul a\'ūżu birabbin-nās...',
      arti: 'Membaca 3 surat perlindungan masing-masing sebanyak 3 kali.',
      target: 3,
      hitung: 0
    },
    {
      id: 'pt3',
      judul: 'Amsayna wa Amsal Mulku Lillah (1x)',
      anjuran: 'Syukur memasuki waktu petang.',
      arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      latin: 'Amsainā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah...',
      arti: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah...',
      target: 1,
      hitung: 0
    },
    {
      id: 'pt4',
      judul: 'A\'udzu Bikalimatillahit Tammati (3x)',
      anjuran: 'Terlindung dari sengatan binatang berbisa dan bahaya malam hari (HR. Muslim).',
      arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      latin: 'A\'ūżu bikalimātillāhit-tāmmāti min syarri mā khalaq.',
      arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang Dia ciptakan.',
      target: 3,
      hitung: 0
    },
    {
      id: 'pt5',
      judul: 'Sayyidul Istighfar (1x)',
      anjuran: 'Puncak istighfar penutup hari.',
      arab: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...',
      latin: 'Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa anā \'abduka...',
      arti: 'Ya Allah, Engkau adalah Tuhanku, tiada tuhan selain Engkau...',
      target: 1,
      hitung: 0
    }
  ],
  sholat: [
    {
      id: 's1',
      judul: 'Istighfar (3x)',
      anjuran: 'Dibaca langsung setelah salam sholat fardhu.',
      arab: 'أَسْتَغْفِرُ اللهَ ، أَسْتَغْفِرُ اللهَ ، أَسْتَغْفِرُ اللهَ',
      latin: 'Astaghfirullāh, Astaghfirullāh, Astaghfirullāh.',
      arti: 'Aku memohon ampun kepada Allah (3x).',
      target: 3,
      hitung: 0
    },
    {
      id: 's2',
      judul: 'Allahumma Antas Salam (1x)',
      anjuran: 'Doa memohon keselamatan setelah sholat.',
      arab: 'اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ',
      latin: 'Allāhumma antas-salām wa minkas-salām, tabārakta yā żal-jalāli wal-ikrām.',
      arti: 'Ya Allah, Engkau Maha Sejahtera, dan dari-Mu lah kesejahteraan, Maha Berkah Engkau wahai Rabb Pemilik keagungan dan kemuliaan.',
      target: 1,
      hitung: 0
    },
    {
      id: 's3',
      judul: 'Tasbih: Subhanallah (33x)',
      anjuran: 'Tasbih setelah sholat fardhu (HR. Muslim).',
      arab: 'سُبْحَانَ اللَّهِ',
      latin: 'Subḥānallāh.',
      arti: 'Maha Suci Allah.',
      target: 33,
      hitung: 0
    },
    {
      id: 's4',
      judul: 'Tahmid: Alhamdulillah (33x)',
      anjuran: 'Tahmid setelah sholat fardhu (HR. Muslim).',
      arab: 'الْحَمْدُ لِلَّهِ',
      latin: 'Al-ḥamdulillāh.',
      arti: 'Segala puji bagi Allah.',
      target: 33,
      hitung: 0
    },
    {
      id: 's5',
      judul: 'Takbir: Allahu Akbar (33x)',
      anjuran: 'Takbir setelah sholat fardhu (HR. Muslim).',
      arab: 'اللهُ أَكْبَرُ',
      latin: 'Allāhu akbar.',
      arti: 'Allah Maha Besar.',
      target: 33,
      hitung: 0
    },
    {
      id: 's6',
      judul: 'Penutup Dzikir Seratus (1x)',
      anjuran: 'Menyempurnakan dzikir menjadi genap 100 hitungan (HR. Muslim).',
      arab: 'لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      latin: 'Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa \'alā kulli syai\'in qadīr.',
      arti: 'Tiada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji, dan Dia Mahakuasa atas segala sesuatu.',
      target: 1,
      hitung: 0
    }
  ]
};

var TAB_DZIKIR_AKTIF = 'pagi';

function bukaModalDzikir() {
  var m = document.getElementById('modalDzikir');
  if (!m) return;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  pilihTabDzikir(TAB_DZIKIR_AKTIF);
}

function tutupModalDzikir() {
  var m = document.getElementById('modalDzikir');
  if (m) m.classList.add('hidden');
  document.body.style.overflow = '';
}

function pilihTabDzikir(tabName) {
  TAB_DZIKIR_AKTIF = tabName;
  var tabs = ['pagi', 'petang', 'sholat'];
  tabs.forEach(function (t) {
    var btn = document.getElementById('tabBtnDzikir_' + t);
    if (btn) btn.classList.toggle('active', t === tabName);
  });
  renderDzikirList();
}

function renderDzikirList() {
  var c = document.getElementById('dzikirItemsContainer');
  if (!c) return;

  var items = DZIKIR_DATA[TAB_DZIKIR_AKTIF] || [];
  var html = '';

  for (var i = 0; i < items.length; i++) {
    var d = items[i];
    var isSelesai = d.hitung >= d.target;

    html += '<div class="dzikir-card ' + (isSelesai ? 'dzikir-card-done' : '') + '">' +
      '<div class="dzikir-card-header">' +
        '<div>' +
          '<div class="dzikir-card-title">' + escHtml(d.judul) + '</div>' +
          '<div class="dzikir-card-hint">' + escHtml(d.anjuran) + '</div>' +
        '</div>' +
        '<span class="dzikir-status-badge ' + (isSelesai ? 'badge-selesai' : 'badge-belum') + '">' +
          (isSelesai ? '✅ Selesai' : d.hitung + ' / ' + d.target) +
        '</span>' +
      '</div>' +
      '<div class="dzikir-card-arabic">' + d.arab + '</div>' +
      '<div class="dzikir-card-latin">' + escHtml(d.latin) + '</div>' +
      '<div class="dzikir-card-indo">' + escHtml(d.arti) + '</div>' +
      '<div class="dzikir-card-actions">' +
        '<button class="tasbih-touch-btn ' + (isSelesai ? 'btn-tasbih-done' : '') + '" onclick="ketukTasbihDzikir(\'' + TAB_DZIKIR_AKTIF + '\', ' + i + ')">' +
          '<span class="tasbih-num">' + d.hitung + '</span>' +
          '<span class="tasbih-lbl">' + (isSelesai ? 'Selesai (Ketuk Ulang)' : 'Ketuk Tasbih (+1)') + '</span>' +
        '</button>' +
        '<button class="btn btn-outline btn-sm" onclick="resetTasbihDzikir(\'' + TAB_DZIKIR_AKTIF + '\', ' + i + ')">🔄 Reset</button>' +
      '</div>' +
    '</div>';
  }

  c.innerHTML = html;
}

function ketukTasbihDzikir(kategori, index) {
  var item = DZIKIR_DATA[kategori][index];
  if (!item) return;

  if (item.hitung < item.target) {
    item.hitung++;
  } else {
    // Jika sudah selesai, reset ke 1
    item.hitung = 1;
  }

  if (navigator.vibrate) {
    if (item.hitung >= item.target) {
      navigator.vibrate([40, 60, 40]); // Getar ganda saat selesai
    } else {
      navigator.vibrate(25); // Getar halus
    }
  }

  renderDzikirList();
}

function resetTasbihDzikir(kategori, index) {
  var item = DZIKIR_DATA[kategori][index];
  if (item) item.hitung = 0;
  renderDzikirList();
}

function resetSemuaDzikirAktif() {
  if (!confirm('Reset seluruh hitungan tasbih pada tab ini?')) return;
  var items = DZIKIR_DATA[TAB_DZIKIR_AKTIF] || [];
  items.forEach(function (d) { d.hitung = 0; });
  renderDzikirList();
  if (typeof toast === 'function') toast('Hitungan dzikir berhasil di-reset.', 'ok');
}

// ==============================================================================
// 6. FITUR DOA HARIAN (BANGUN TIDUR S/D TIDUR LAGI) + MANAJEMEN ADMIN
// ==============================================================================
var KATALOG_DOA_DEFAULT = [
  {
    id: 1,
    judul: "Doa Bangun Tidur",
    kategori: "Bangun Tidur & Rumah",
    arab: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ",
    latin: "Alḥamdu lillāhil-lażī aḥyānā ba'da mā amātanā wa ilaihin-nusyūr.",
    arti: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan hanya kepada-Nya kami akan dibangkitkan.",
    riwayat: "HR. Bukhari no. 6312",
    aktif: true
  },
  {
    id: 2,
    judul: "Doa Masuk Kamar Mandi (WC)",
    kategori: "Wudhu & Ibadah",
    arab: "اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allāhumma innī a'ūżu bika minal-khubuṡi wal-khabā'iṡ.",
    arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.",
    riwayat: "HR. Bukhari no. 142 & Muslim no. 375",
    aktif: true
  },
  {
    id: 3,
    judul: "Doa Keluar Kamar Mandi (WC)",
    kategori: "Wudhu & Ibadah",
    arab: "غُفْرَانَكَ ، الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الأَذَى وَعَافَانِي",
    latin: "Gufrānaka, alḥamdu lillāhil-lażī ażhaba 'annil-ażā wa 'āfānī.",
    arti: "Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan kotoran/penyakit dariku dan menyehatkanku.",
    riwayat: "HR. Abu Dawud no. 17 & Tirmidzi no. 7",
    aktif: true
  },
  {
    id: 4,
    judul: "Doa Sebelum Berwudhu",
    kategori: "Wudhu & Ibadah",
    arab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    latin: "Bismillāhir-raḥmānir-raḥīm.",
    arti: "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
    riwayat: "HR. Abu Dawud no. 101",
    aktif: true
  },
  {
    id: 5,
    judul: "Doa Setelah Berwudhu",
    kategori: "Wudhu & Ibadah",
    arab: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ",
    latin: "Asyhadu allā ilāha illallāhu waḥdahū lā syarīka lah, wa asyhadu anna Muḥammadan 'abduhū wa rasūluh. Allāhummaj'alnī minat-tawwābīna waj'alnī minal-mutaṭahhirīn.",
    arti: "Aku bersaksi tiada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, dan Muhammad hamba serta utusan-Nya. Ya Allah jadikanlah aku hamba yang bertaubat dan menyucikan diri.",
    riwayat: "HR. Muslim no. 234 & Tirmidzi no. 55",
    aktif: true
  },
  {
    id: 6,
    judul: "Doa Mengenakan Pakaian",
    kategori: "Makan & Pakaian",
    arab: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    latin: "Alḥamdu lillāhil-lażī kasānī hāżas-ṡauba wa razaqanīhi min gairi ḥaulin minnī wa lā quwwah.",
    arti: "Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan memberikannya rezeki tanpa daya dan kekuatan dariku.",
    riwayat: "HR. Abu Dawud no. 4023",
    aktif: true
  },
  {
    id: 7,
    judul: "Doa Bercermin",
    kategori: "Bangun Tidur & Rumah",
    arab: "اللّٰهُمَّ كَمَا حَسَّنْتَ خَلْقِيْ فَحَسِّنْ خُلُقِيْ",
    latin: "Allāhumma kamā ḥassanta khalqī faḥassin khuluqī.",
    arti: "Ya Allah, sebagaimana Engkau telah memperbagus rupa fisikku, maka perbaguslah pula budi pekertiku.",
    riwayat: "HR. Ahmad no. 24392",
    aktif: true
  },
  {
    id: 8,
    judul: "Doa Keluar Rumah",
    kategori: "Bangun Tidur & Rumah",
    arab: "بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",
    latin: "Bismillāhi tawakkaltu 'alallāh, lā ḥaula wa lā quwwata illā billāh.",
    arti: "Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan tiada kekuatan melainkan dengan pertolongan Allah.",
    riwayat: "HR. Abu Dawud no. 5095 & Tirmidzi no. 3426",
    aktif: true
  },
  {
    id: 9,
    judul: "Doa Masuk Rumah",
    kategori: "Bangun Tidur & Rumah",
    arab: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    latin: "Bismillāhi walajnā, wa bismillāhi kharajnā, wa 'alā rabbinā tawakkalnā.",
    arti: "Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Tuhan kami, kami berserah diri.",
    riwayat: "HR. Abu Dawud no. 5096",
    aktif: true
  },
  {
    id: 10,
    judul: "Doa Masuk Masjid",
    kategori: "Wudhu & Ibadah",
    arab: "اللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ",
    latin: "Allāhummaftaḥ lī abwāba raḥmatik.",
    arti: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
    riwayat: "HR. Muslim no. 713",
    aktif: true
  },
  {
    id: 11,
    judul: "Doa Keluar Masjid",
    kategori: "Wudhu & Ibadah",
    arab: "اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allāhumma innī as'aluka min faḍlik.",
    arti: "Ya Allah, sesungguhnya aku memohon sebagian dari karunia-Mu.",
    riwayat: "HR. Muslim no. 713",
    aktif: true
  },
  {
    id: 12,
    judul: "Doa Sebelum Makan & Minum",
    kategori: "Makan & Pakaian",
    arab: "اللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ ، بِسْمِ اللّٰهِ",
    latin: "Allāhumma bārik lanā fīmā razaqtanā wa qinā 'ażāban-nār, bismillāh.",
    arti: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka. Dengan nama Allah.",
    riwayat: "HR. Ibnu Sunni no. 457 & Abu Dawud no. 3767",
    aktif: true
  },
  {
    id: 13,
    judul: "Doa Setelah Makan & Minum",
    kategori: "Makan & Pakaian",
    arab: "الْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
    latin: "Alḥamdu lillāhil-lażī aṭ'amanā wa saqānā wa ja'alanā minal-muslimīn.",
    arti: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang muslim.",
    riwayat: "HR. Abu Dawud no. 3850 & Tirmidzi no. 3457",
    aktif: true
  },
  {
    id: 14,
    judul: "Doa Sebelum Belajar",
    kategori: "Belajar & Doa Penting",
    arab: "رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا وَاجْعَلْنِيْ مِنَ الصَّالِحِيْنَ",
    latin: "Rabbi zidnī 'ilmā, warzuqnī fahmā, waj'alnī minaṣ-ṣāliḥīn.",
    arti: "Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan, dan anugerahilah aku pemahaman yang mendalam, serta jadikanlah aku golongan orang saleh.",
    riwayat: "QS. Taha: 114 & Doa Ulama",
    aktif: true
  },
  {
    id: 15,
    judul: "Doa Selesai Belajar / Kafaratul Majelis",
    kategori: "Belajar & Doa Penting",
    arab: "سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ ، أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ",
    latin: "Subḥānakallāhumma wa biḥamdika, asyhadu allā ilāha illā anta, astagfiruka wa atūbu ilaik.",
    arti: "Maha Suci Engkau ya Allah, dan segala puji bagi-Mu. Aku bersaksi tiada tuhan selain Engkau, aku memohon ampun dan bertaubat kepada-Mu.",
    riwayat: "HR. Tirmidzi no. 3433",
    aktif: true
  },
  {
    id: 16,
    judul: "Doa Untuk Kedua Orang Tua",
    kategori: "Belajar & Doa Penting",
    arab: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
    latin: "Rabbigfir lī wa liwālidayya warḥamhumā kamā rabbayānī ṣagīrā.",
    arti: "Wahai Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka berdua sebagaimana mereka telah mendidikku di waktu kecil.",
    riwayat: "QS. Al-Isra': 24",
    aktif: true
  },
  {
    id: 17,
    judul: "Doa Kebaikan Dunia & Akhirat (Sapu Jagat)",
    kategori: "Belajar & Doa Penting",
    arab: "رَبَّنَآ اٰتِنَا فِى الدُّنْيَا حَسَنَةً وَّفِى الْاٰخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanā ātinā fid-dunyā ḥasanataw wa fil-ākhirati ḥasanataw wa qinā 'ażāban-nār.",
    arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
    riwayat: "QS. Al-Baqarah: 201",
    aktif: true
  },
  {
    id: 18,
    judul: "Doa Naik Kendaraan",
    kategori: "Bangun Tidur & Rumah",
    arab: "سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهٗ مُقْرِنِيْنَ ۙ وَإِنَّا إِلٰى رَبِّنَا لَمُنْقَلِبُوْنَ",
    latin: "Subḥānal-lażī sakhkhara lanā hāżā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn.",
    arti: "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
    riwayat: "QS. Az-Zukhruf: 13-14",
    aktif: true
  },
  {
    id: 19,
    judul: "Doa Sebelum Tidur",
    kategori: "Sebelum Tidur",
    arab: "بِاسْمِكَ اللّٰهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوْتُ",
    latin: "Bismikallāhumma aḥyā wa bismika amūt.",
    arti: "Dengan nama-Mu ya Allah aku hidup dan dengan nama-Mu aku mati.",
    riwayat: "HR. Bukhari no. 6312",
    aktif: true
  },
  {
    id: 20,
    judul: "Doa Ketika Terbangun Tengah Malam / Gelisah",
    kategori: "Sebelum Tidur",
    arab: "أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّةِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَنْ يَحْضُرُوْنِ",
    latin: "A'ūżu bikalimātillāhit-tāmmati min gaḍabihī wa 'iqābihī wa syarri 'ibādihī wa min hamazātisy-syayāṭīni wa ay yaḥḍurūn.",
    arti: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari murka-Nya, siksa-Nya, kejahatan hamba-hamba-Nya, serta dari bisikan setan dan agar setan tidak menghampiriku.",
    riwayat: "HR. Abu Dawud no. 3893 & Tirmidzi no. 3528",
    aktif: true
  }
];

function getKatalogDoa() {
  try {
    var stored = localStorage.getItem('katalog_doa_harian');
    if (stored) {
      var arr = JSON.parse(stored);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) { }
  return KATALOG_DOA_DEFAULT;
}

function simpanKatalogDoa(arr) {
  try {
    localStorage.setItem('katalog_doa_harian', JSON.stringify(arr));
  } catch (e) { }
}

var FILTER_KATEGORI_DOA_AKTIF = 'Semua';

function bukaModalDoa() {
  var m = document.getElementById('modalDoa');
  if (!m) return;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  filterDoaByKategori('Semua');
}

function tutupModalDoa() {
  var m = document.getElementById('modalDoa');
  if (m) m.classList.add('hidden');
  document.body.style.overflow = '';
}

function filterDoaByKategori(kat) {
  FILTER_KATEGORI_DOA_AKTIF = kat;
  var pills = document.querySelectorAll('.doa-cat-pill');
  pills.forEach(function (p) {
    p.classList.toggle('active', p.getAttribute('data-kat') === kat);
  });
  renderKatalogDoaSiswa();
}

function renderKatalogDoaSiswa() {
  var c = document.getElementById('doaSiswaContainer');
  if (!c) return;

  var q = (document.getElementById('cariDoaInput') ? document.getElementById('cariDoaInput').value : '').trim().toLowerCase();
  var allDoa = getKatalogDoa().filter(function (d) { return d.aktif !== false; });

  var filtered = allDoa.filter(function (d) {
    var matchKat = (FILTER_KATEGORI_DOA_AKTIF === 'Semua') || (d.kategori === FILTER_KATEGORI_DOA_AKTIF);
    var matchQuery = !q || d.judul.toLowerCase().includes(q) || d.arti.toLowerCase().includes(q) || d.latin.toLowerCase().includes(q);
    return matchKat && matchQuery;
  });

  var badgeCount = document.getElementById('badgeTotalDoa');
  if (badgeCount) badgeCount.textContent = allDoa.length + ' Doa';

  if (filtered.length === 0) {
    c.innerHTML = '<div style="text-align:center;padding:30px 10px;color:var(--muted);font-size:13px;">Tidak ada doa yang sesuai dengan pencarian.</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var d = filtered[i];
    html += '<div class="doa-card">' +
      '<div class="doa-card-header">' +
        '<div>' +
          '<div class="doa-card-title">' + escHtml(d.judul) + '</div>' +
          '<div class="doa-card-kategori-tag">' + escHtml(d.kategori || 'Umum') + '</div>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="salinTeksDoa(' + d.id + ', this)" style="padding:4px 10px;font-size:11.5px;">📋 Salin</button>' +
      '</div>' +
      '<div class="doa-card-arabic">' + d.arab + '</div>' +
      '<div class="doa-card-latin">' + escHtml(d.latin) + '</div>' +
      '<div class="doa-card-indo">' + escHtml(d.arti) + '</div>' +
      (d.riwayat ? '<div class="doa-card-riwayat">📚 ' + escHtml(d.riwayat) + '</div>' : '') +
    '</div>';
  }

  c.innerHTML = html;
}

function salinTeksDoa(id, btn) {
  var d = getKatalogDoa().find(function (item) { return item.id === id; });
  if (!d) return;

  var teks = d.judul + '\n\n' + d.arab + '\n\n"' + d.arti + '"\n\n(' + (d.riwayat || 'Doa Harian') + ')';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(teks).then(function () {
      if (typeof toast === 'function') toast('Doa berhasil disalin ke clipboard!', 'ok');
      if (btn) { btn.textContent = '✓ Disalin'; setTimeout(function () { btn.textContent = '📋 Salin'; }, 2000); }
    });
  }
}

// ==============================================================================
// 7. MANAJEMEN DOA HARIAN DI PANEL ADMIN
// ==============================================================================
function renderAdminDoaTable() {
  var tbody = document.getElementById('tbodyAdminDoa');
  if (!tbody) return;

  var list = getKatalogDoa();
  var q = (document.getElementById('cariDoaAdmin') ? document.getElementById('cariDoaAdmin').value : '').trim().toLowerCase();

  var filtered = list.filter(function (d) {
    if (!q) return true;
    return d.judul.toLowerCase().includes(q) || (d.kategori && d.kategori.toLowerCase().includes(q)) || d.arti.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted);">Tidak ada doa yang ditemukan.</td></tr>';
    return;
  }

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var d = filtered[i];
    var isAktif = d.aktif !== false;

    html += '<tr>' +
      '<td style="text-align:center;font-weight:700;">' + (i + 1) + '</td>' +
      '<td>' +
        '<div style="font-weight:700;color:var(--text);">' + escHtml(d.judul) + '</div>' +
        '<div style="font-size:11px;color:var(--muted);">' + (d.riwayat ? escHtml(d.riwayat) : '-') + '</div>' +
      '</td>' +
      '<td><span class="badge" style="background:#f1f5f9;color:#334155;">' + escHtml(d.kategori || 'Umum') + '</span></td>' +
      '<td>' +
        '<div style="font-family:\'Amiri\',serif;font-size:16px;direction:rtl;color:#047857;line-height:1.4;">' + escHtml(d.arab.length > 50 ? d.arab.substring(0, 50) + '...' : d.arab) + '</div>' +
        '<div style="font-size:11px;color:var(--muted);margin-top:2px;">' + escHtml(d.arti.length > 60 ? d.arti.substring(0, 60) + '...' : d.arti) + '</div>' +
      '</td>' +
      '<td style="text-align:center;">' +
        '<button class="btn btn-sm ' + (isAktif ? 'btn-outline' : 'btn-ghost') + '" onclick="toggleStatusDoaAdmin(' + d.id + ')" style="padding:2px 8px;font-size:11px;">' +
          (isAktif ? '🟢 Aktif' : '⚪ Nonaktif') +
        '</button>' +
      '</td>' +
      '<td style="text-align:center;white-space:nowrap;">' +
        '<button class="btn btn-sm btn-outline" onclick="editDoaAdmin(' + d.id + ')" style="margin-right:4px;">✏️ Edit</button>' +
        '<button class="btn btn-sm btn-outline" style="color:var(--danger);border-color:#fca5a5;" onclick="hapusDoaAdmin(' + d.id + ')">🗑️</button>' +
      '</td>' +
    '</tr>';
  }

  tbody.innerHTML = html;
}

function bukaFormDoaAdmin(doaId) {
  var modal = document.getElementById('modalFormDoaAdmin');
  if (!modal) return;

  var title = document.getElementById('formDoaAdminTitle');
  document.getElementById('fDoaId').value = '';
  document.getElementById('fDoaJudul').value = '';
  document.getElementById('fDoaKategori').value = 'Bangun Tidur & Rumah';
  document.getElementById('fDoaArab').value = '';
  document.getElementById('fDoaLatin').value = '';
  document.getElementById('fDoaArti').value = '';
  document.getElementById('fDoaRiwayat').value = '';
  document.getElementById('fDoaAktif').checked = true;

  if (doaId) {
    var d = getKatalogDoa().find(function (item) { return item.id === doaId; });
    if (d) {
      if (title) title.textContent = 'Edit Doa Harian';
      document.getElementById('fDoaId').value = d.id;
      document.getElementById('fDoaJudul').value = d.judul || '';
      document.getElementById('fDoaKategori').value = d.kategori || 'Bangun Tidur & Rumah';
      document.getElementById('fDoaArab').value = d.arab || '';
      document.getElementById('fDoaLatin').value = d.latin || '';
      document.getElementById('fDoaArti').value = d.arti || '';
      document.getElementById('fDoaRiwayat').value = d.riwayat || '';
      document.getElementById('fDoaAktif').checked = d.aktif !== false;
    }
  } else {
    if (title) title.textContent = 'Tambah Doa Harian Baru';
  }

  modal.classList.remove('hidden');
}

function tutupFormDoaAdmin() {
  var modal = document.getElementById('modalFormDoaAdmin');
  if (modal) modal.classList.add('hidden');
}

function simpanDoaAdmin() {
  var id = document.getElementById('fDoaId').value;
  var judul = (document.getElementById('fDoaJudul').value || '').trim();
  var kategori = document.getElementById('fDoaKategori').value;
  var arab = (document.getElementById('fDoaArab').value || '').trim();
  var latin = (document.getElementById('fDoaLatin').value || '').trim();
  var arti = (document.getElementById('fDoaArti').value || '').trim();
  var riwayat = (document.getElementById('fDoaRiwayat').value || '').trim();
  var aktif = document.getElementById('fDoaAktif').checked;

  if (!judul) { alert('Judul doa wajib diisi!'); return; }
  if (!arab) { alert('Lafadz Arab wajib diisi!'); return; }
  if (!arti) { alert('Terjemahan doa wajib diisi!'); return; }

  var list = getKatalogDoa();

  if (id) {
    // Mode Edit
    var numId = parseInt(id, 10);
    var idx = list.findIndex(function (item) { return item.id === numId; });
    if (idx !== -1) {
      list[idx] = {
        id: numId,
        judul: judul,
        kategori: kategori,
        arab: arab,
        latin: latin,
        arti: arti,
        riwayat: riwayat,
        aktif: aktif
      };
    }
  } else {
    // Mode Tambah Baru
    var newId = (list.length > 0 ? Math.max.apply(Math, list.map(function (x) { return x.id || 0; })) : 0) + 1;
    list.push({
      id: newId,
      judul: judul,
      kategori: kategori,
      arab: arab,
      latin: latin,
      arti: arti,
      riwayat: riwayat,
      aktif: aktif
    });
  }

  simpanKatalogDoa(list);
  tutupFormDoaAdmin();
  renderAdminDoaTable();
  if (typeof toast === 'function') toast('Doa harian berhasil disimpan!', 'ok');
}

function editDoaAdmin(id) {
  bukaFormDoaAdmin(id);
}

function hapusDoaAdmin(id) {
  var list = getKatalogDoa();
  var item = list.find(function (d) { return d.id === id; });
  if (!item) return;

  if (!confirm('Apakah Anda yakin ingin menghapus doa "' + item.judul + '"?')) return;

  var newList = list.filter(function (d) { return d.id !== id; });
  simpanKatalogDoa(newList);
  renderAdminDoaTable();
  if (typeof toast === 'function') toast('Doa berhasil dihapus.', 'ok');
}

function toggleStatusDoaAdmin(id) {
  var list = getKatalogDoa();
  var item = list.find(function (d) { return d.id === id; });
  if (!item) return;
  item.aktif = (item.aktif === false) ? true : false;
  simpanKatalogDoa(list);
  renderAdminDoaTable();
}

function resetKatalogDoaDefault() {
  if (!confirm('Kembalikan katalog doa harian ke daftar standar Kemenag (20 doa lengkap)?')) return;
  simpanKatalogDoa(KATALOG_DOA_DEFAULT);
  renderAdminDoaTable();
  if (typeof toast === 'function') toast('Katalog doa berhasil di-reset ke standar.', 'ok');
}

// Inisialisasi saat window dimuat
window.addEventListener('load', function () {
  updateTampilanDurasiQuranSemua();
});

function escHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
