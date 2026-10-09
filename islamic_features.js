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

function formatDurasiQuranRiwayat(detik) {
  var s = parseInt(detik, 10);
  if (isNaN(s) || s <= 0) return '0 Menit (Belum membaca hari ini)';
  var jam = Math.floor(s / 3600);
  var sisa = s % 3600;
  var menit = Math.floor(sisa / 60);
  var d = sisa % 60;
  if (jam > 0) {
    return jam + ' Jam ' + menit + ' Menit' + (d > 0 ? ' ' + d + ' Detik' : '');
  }
  if (menit > 0) {
    return menit + ' Menit' + (d > 0 ? ' ' + d + ' Detik' : '');
  }
  return d + ' Detik';
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

  // Widget di Tab Riwayat Absen
  var elRiwDurasi = document.getElementById('dispRiwayatDurasiQuran');
  if (elRiwDurasi) elRiwDurasi.textContent = formatDurasiQuranRiwayat(totalSec);

  var elRiwBar = document.getElementById('dispRiwayatQuranBar');
  if (elRiwBar) elRiwBar.style.width = pct + '%';

  var elRiwPct = document.getElementById('dispRiwayatQuranPct');
  if (elRiwPct) elRiwPct.textContent = pct + '% tercapai';
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
// 3. UI CONTROLLER AL-QUR'AN (STANDAR KHOT NASKHI KEMENAG RI)
// Menu Mode: Per Ayat | Per Halaman (1-604) | Tafsir Kemenag | Asbabun Nuzul
// ==============================================================================
var QURAN_CURRENT_MODE = 'ayat'; // 'ayat', 'halaman', 'tafsir', 'asbab'
var QURAN_PAGE_STATE = {
  currentPage: 1,
  viewMode: 'visual', // 'visual' | 'teks'
  zoom: 100
};
var QURAN_ARABIC_FONT_SIZE = 28;
var QURAN_TAFSIR_CACHE = {};
var QURAN_PAGE_CACHE = {};
var QURAN_AUDIO_PLAYER = null;
var CURRENT_PLAYING_AYAT = null; // { surah: number, ayat: number, btn: HTMLElement }

// Halaman awal untuk masing-masing Juz 1 sampai 30 (Standar Mushaf 604 Hal)
var JUZ_START_PAGES = [
  1, 22, 42, 62, 82, 102, 121, 142, 162, 182,
  201, 222, 242, 262, 282, 302, 322, 342, 362, 382,
  402, 422, 442, 462, 482, 502, 522, 542, 562, 582
];

function getJuzFromPage(page) {
  var p = parseInt(page, 10) || 1;
  for (var j = JUZ_START_PAGES.length - 1; j >= 0; j--) {
    if (p >= JUZ_START_PAGES[j]) return j + 1;
  }
  return 1;
}

function getSurahFromPage(page) {
  var p = parseInt(page, 10) || 1;
  var last = QURAN_SURAHS[0];
  for (var i = 0; i < QURAN_SURAHS.length; i++) {
    if (QURAN_SURAHS[i].hal <= p) {
      last = QURAN_SURAHS[i];
    } else {
      break;
    }
  }
  return last;
}

// ==============================================================================
// DATABASE RIWAYAT ASBABUN NUZUL SHAHIH & KONTEKS PEWAHYUAN
// ==============================================================================
var ASBABUN_NUZUL_DATABASE = [
  {
    surat: 1,
    namaSurat: "Al-Fatihah",
    ayat: "1-7",
    judul: "Pembukaan Al-Qur'an dan Penawar Segala Penyakit",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Abu Sa'id Al-Khudri RA dan Abu Hurairah RA.",
    peristiwa: "Surah Al-Fatihah diturunkan sebagai mukjizat agung pembuka kitab (Ummul Kitab). Rasulullah SAW bersabda kepada Abu Sa'id bin Al-Mu'alla: 'Aku akan mengajarkan kepadamu surah yang paling agung dalam Al-Qur'an sebelum engkau keluar dari masjid,' yaitu Al-Hamdu lillahi Rabbil 'alamin (tujuh ayat yang diulang-ulang). Surah ini juga menjadi doa penyembuh (ruqyah) yang telah terbukti menolong kepala suku yang disengat kalajengking.",
    hikmah: "Al-Fatihah mencakup seluruh intisari tauhid, ibadah, permohonan hidayah jalan lurus, dan perlindungan dari kesesatan."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 142,
    judul: "Peralihan Kiblat Sholat dari Baitul Maqdis ke Ka'bah (Masjidil Haram)",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Al-Bara' bin 'Azib RA.",
    peristiwa: "Setelah hijrah ke Madinah, Rasulullah SAW dan para sahabat sholat menghadap ke Baitul Maqdis selama 16 atau 17 bulan. Rasulullah sangat mendambakan kiblat dialihkan ke Ka'bah (kiblat Nabi Ibrahim AS). Ketika Allah menurunkan perintah peralihan kiblat ke Masjidil Haram, orang-orang Yahudi dan kaum munafik mencemooh: 'Apakah yang memalingkan mereka dari kiblat yang dahulu mereka berkiblat kepadanya?' Maka turunlah ayat ini menegaskan bahwa kepunyaan Allah-lah timur dan barat.",
    hikmah: "Ketaatan mutlak kepada perintah Allah SWT dan kemandirian kiblat tauhid umat Islam menuju Baitullah Ka'bah."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 186,
    judul: "Doa Hamba yang Senantiasa Dekat dan Pasti Dikabulkan",
    riwayat: "Diriwayatkan oleh Ibnu Jarir, Ibnu Abi Hatim, dan Ibnu Asakir.",
    peristiwa: "Seorang sahabat Arab Badui datang menemui Rasulullah SAW lalu bertanya: 'Wahai Rasulullah, apakah Tuhan kita itu dekat sehingga kita cukup berbisik kepada-Nya, ataukah Dia jauh sehingga kita harus berseru dengan suara keras?' Rasulullah SAW terdiam sejenak, hingga kemudian Allah menurunkan firman-Nya: 'Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka sesungguhnya Aku dekat. Aku mengabulkan permohonan orang yang berdoa apabila dia berdoa kepada-Ku.'",
    hikmah: "Menghadirkan kedekatan batin antara hamba dengan Allah SWT, anjuran berdoa dengan khusyuk dan penuh keyakinan."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 189,
    judul: "Hikmah Bulan Sabit (Hilal) dan Adab Memasuki Rumah Saat Ihram",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari dari Al-Bara' bin 'Azib RA.",
    peristiwa: "Kaum muslimin bertanya mengenai peredaran bulan sabit yang bentuknya berubah-ubah dari kecil membesar lalu mengecil kembali. Selain itu, pada masa jahiliyah, orang Anshar jika telah berihram tidak mau memasuki rumah lewat pintu depan melainkan memanjat dari bagian belakang karena dianggap tabu. Allah meluruskan tradisi keliru ini bahwa kebajikan bukanlah memasuki rumah dari belakang, melainkan bertakwa dan masuklah lewat pintu-pintunya.",
    hikmah: "Bulan sabit adalah penanda waktu ibadah haji dan puasa, serta menghapus tahayul adat jahiliyah."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 196,
    judul: "Rukhshah Mencukur Rambut dan Fidyah Saat Ihram (Kisah Ka'ab bin 'Ujrah)",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Ka'ab bin 'Ujrah RA.",
    peristiwa: "Ketika berada di Hudaibiyah saat ihram, kepala Ka'ab bin 'Ujrah dipenuhi kutu dan terasa sangat menyiksa hingga kutu-kutu berjatuhan ke wajahnya. Rasulullah SAW melihatnya dan bersabda: 'Aku tidak menyangka kesusahanmu sampai separah ini. Apakah engkau memiliki seekor kambing?' Ka'ab menjawab tidak. Maka turunlah ayat ini yang memberikan rukhshah: boleh mencukur kepala dengan membayar fidyah berpuasa 3 hari, memberi makan 6 orang miskin, atau menyembelih seekor kambing.",
    hikmah: "Prinsip kemudahan (taysir) dalam syariat Islam bagi orang yang mengalami mudharat atau sakit saat beribadah."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 219,
    judul: "Tahapan Awal Penjelasan Bahaya Khamr (Minuman Keras) dan Perjudian",
    riwayat: "Diriwayatkan oleh Imam Ahmad dan At-Tirmidzi dari Umar bin Al-Khattab RA.",
    peristiwa: "Umar bin Al-Khattab RA dan Mu'adz bin Jabal RA berdoa: 'Ya Allah, berikanlah kepada kami penjelasan yang tuntas tentang khamr, karena khamr menghilangkan akal dan menghabiskan harta!' Maka turunlah ayat ini menjelaskan bahwa pada keduanya terdapat dosa besar dan beberapa manfaat bagi manusia, tetapi dosanya lebih besar daripada manfaatnya. Ini adalah tahap edukasi sebelum pengharaman total di Surah Al-Ma'idah.",
    hikmah: "Metode bertahap (tadrij) dalam pembinaan hukum syariat agar mengakar kuat dalam kesadaran umat."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 222,
    judul: "Penjelasan Perlakuan Mulia Terhadap Istri yang Sedang Haid",
    riwayat: "Diriwayatkan oleh Imam Muslim dari Anas bin Malik RA.",
    peristiwa: "Kaum Yahudi di Madinah jika istri mereka mengalami haid, mereka mengasingkannya dari rumah dan tidak mau makan bersamanya sama sekali. Para sahabat menanyakan hal itu kepada Rasulullah SAW. Maka Allah menurunkan ayat: 'Mereka bertanya kepadamu tentang haid. Katakanlah: Haid itu adalah suatu kotoran.' Rasulullah SAW menegaskan: 'Lakukan apa saja bersama mereka kecuali hubungan intim suami-istri.' Kaum Yahudi pun berkata: 'Orang ini (Nabi Muhammad) tidak membiarkan sedikit pun kebiasaan kita melainkan dia menyelisihinya.'",
    hikmah: "Memuliakan wanita haid sebagai manusia terhormat, berbeda dengan diskriminasi kaum jahiliyah dan Yahudi."
  },
  {
    surat: 2,
    namaSurat: "Al-Baqarah",
    ayat: 256,
    judul: "Tiada Paksaan dalam Memeluk Agama Islam",
    riwayat: "Diriwayatkan oleh Ibnu Jarir dari Ibnu Abbas RA.",
    peristiwa: "Seorang pria Anshar bernama Al-Hushain memiliki dua putra yang sebelum datangnya Islam telah memeluk agama Nasrani akibat pengaruh saudagar Syam. Ketika Al-Hushain masuk Islam, dia berusaha memaksa kedua anaknya agar masuk Islam hingga terjadi pertikaian. Dia mendatangi Nabi SAW untuk meminta izin memaksa mereka. Maka Allah menurunkan ayat: 'Tidak ada paksaan dalam (menganut) agama (Islam); sungguh telah jelas jalan yang benar dari jalan yang sesat.'",
    hikmah: "Prinsip kebebasan memilih keyakinan dan dakwah yang berbasis kesadaran nurani serta dalil nyata."
  },
  {
    surat: 3,
    namaSurat: "Ali 'Imran",
    ayat: 103,
    judul: "Perintah Bersatu dan Larangan Berpecah Belah (Aus dan Khazraj)",
    riwayat: "Diriwayatkan oleh Ibnu Ishaq dari Zaid bin Aslam.",
    peristiwa: "Syas bin Qais, seorang pemuka Yahudi yang sangat dengki terhadap persatuan kaum muslimin, melewati rombongan suku Aus dan Khazraj yang sedang duduk berbincang penuh keakraban. Dia menyuruh seorang pemuda Yahudi menyusup dan menyanyikan syair-syair Perang Bu'ats (perang saudara berdarah masa lalu antar kedua suku). Emosi kedua kubu terpancing hingga mereka menghunus pedang. Rasulullah SAW segera datang menengahi: 'Apakah kalian menyeru seruan jahiliyah padahal aku masih ada di antara kalian?!' Mereka pun menangis dan saling berpelukan, lalu turunlah ayat ini.",
    hikmah: "Tali persaudaraan Islam (ukhuwah Islamiyah) adalah nikmat agung penyelamat dari jurang kehancuran."
  },
  {
    surat: 3,
    namaSurat: "Ali 'Imran",
    ayat: "190-195",
    judul: "Tanda-Tanda Kebesaran Allah bagi Ulil Albab (Orang yang Berakal)",
    riwayat: "Diriwayatkan oleh At-Thabarani dan Ibnu Hibban dari Sayyidah Aisyah RA.",
    peristiwa: "Bilal bin Rabah datang menemui Rasulullah SAW saat subuh dan mendapati beliau sedang menangis tersedu-sedu hingga jubahnya basah. Bilal bertanya: 'Wahai Rasulullah, mengapa engkau menangis padahal Allah telah mengampuni dosamu yang terdahulu dan yang akan datang?' Rasulullah bersabda: 'Tidakkah patut aku menjadi hamba yang bersyukur? Malam ini telah diturunkan kepadaku ayat-ayat, celakalah orang yang membacanya tetapi tidak memikirkan kandungannya,' yaitu ayat 'Inna fi khalqis-samawati wal-ardl...'",
    hikmah: "Kewajiban bertadabbur atas ciptaan langit dan bumi, menggabungkan dzikir dan fikir secara harmonis."
  },
  {
    surat: 4,
    namaSurat: "An-Nisa'",
    ayat: 58,
    judul: "Amanah Kepemimpinan dan Pengembalian Kunci Ka'bah",
    riwayat: "Diriwayatkan oleh Ibnu Mardawaih dari Ibnu Abbas RA.",
    peristiwa: "Pada hari Pembebasan Kota Makkah (Fathu Makkah), Rasulullah SAW meminta kunci Ka'bah dari Utsman bin Thalhah (juru kunci Ka'bah dari kaum Quraisy). Sayyidina Ali bin Abi Thalib memohon agar kunci tersebut diberikan kepada keluarganya (Bani Hasyim) agar menyatukan tugas pengairan jamaah dan penjaga Ka'bah. Namun Allah menegur dan menurunkan firman-Nya: 'Sesungguhnya Allah menyuruhmu menyampaikan amanat kepada yang berhak menerimanya...' Maka Rasulullah mengembalikan kunci itu kepada Utsman bin Thalhah sambil bersabda: 'Ambillah kunci ini selamanya, tidak ada yang merebutnya kecuali orang zalim.'",
    hikmah: "Amanah jabatan dan tanggung jawab harus diberikan kepada yang berhak dan berkompeten tanpa nepotisme."
  },
  {
    surat: 4,
    namaSurat: "An-Nisa'",
    ayat: 59,
    judul: "Ketaatan kepada Allah, Rasul, dan Ulil Amri yang Membimbing",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Ibnu Abbas RA.",
    peristiwa: "Rasulullah SAW mengangkat Abdullah bin Huzafah bin Qais sebagai pemimpin sebuah ekspedisi pasukan khusus (sariyyah). Di tengah perjalanan, komandan tersebut merasa jengkel kepada pasukannya karena suatu hal, lalu dia menyalakan api unggun besar dan memerintahkan seluruh prajurit melompat ke dalam api atas nama taat pemimpin. Sebagian prajurit menolak karena mereka masuk Islam justru untuk selamat dari api. Ketika kembali ke Madinah dan dilaporkan kepada Nabi SAW, beliau bersabda: 'Jika kalian memasukinya, kalian tidak akan pernah keluar darinya. Sesungguhnya ketaatan itu hanya dalam perkara yang ma'ruf (kebaikan).'",
    hikmah: "Ketaatan kepada pemimpin memiliki batas, yaitu tidak boleh bermaksiat kepada aturan Allah SWT."
  },
  {
    surat: 5,
    namaSurat: "Al-Ma'idah",
    ayat: 3,
    judul: "Penyempurnaan Syariat Islam pada Hari Arafah Saat Haji Wada'",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Umar bin Al-Khattab RA.",
    peristiwa: "Seorang tokoh Yahudi berkata kepada Khalifah Umar bin Khattab: 'Wahai Amirul Mukminin, ada satu ayat dalam kitabmu yang jika ayat itu diturunkan kepada kami orang Yahudi, niscaya hari turunnya akan kami jadikan hari raya besar!' Umar bertanya: 'Ayat manakah itu?' Dia membaca: 'Al-yauma akmaltu lakum dinakum...' Umar tersenyum lalu menjawab: 'Demi Allah, kami sangat mengetahui kapan dan di mana ayat itu diturunkan: ayat itu turun kepada Rasulullah SAW saat beliau berdiri di Padang Arafah pada hari Jumat (Haji Wada').'",
    hikmah: "Agama Islam telah sempurna, paripurna, dan mencakup segala tuntunan hidup hingga akhir zaman."
  },
  {
    surat: 5,
    namaSurat: "Al-Ma'idah",
    ayat: 6,
    judul: "Pensyariatan Tayamum dan Wudhu Saat Kalung Aisyah Hilang",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Sayyidah Aisyah RA.",
    peristiwa: "Dalam suatu perjalanan bersama Rasulullah SAW, kalung Aisyah terputus dan hilang di tengah gurun (Baidha/Dzatul Jaisy). Rombongan berhenti mencarinya hingga waktu sholat tiba padahal tidak ada sumber air dan perbekalan air habis. Orang-orang mengeluh kepada Abu Bakar. Tak lama kemudian Allah menurunkan ayat rukhsah tayamum menggunakan debu bersih. Usaid bin Hudhair berkata: 'Ini bukanlah keberkahan pertama dari keluargamu, wahai keluarga Abu Bakar!'",
    hikmah: "Kemudahan bersuci dengan debu tayyib ketika ketiadaan air, rahmat besar bagi seluruh umat Islam."
  },
  {
    surat: 5,
    namaSurat: "Al-Ma'idah",
    ayat: 90,
    judul: "Pengharaman Mutlak Khamr, Judi, Berhala, dan Mengundi Nasib",
    riwayat: "Diriwayatkan oleh Imam Ahmad dan Abu Dawud dari Sa'ad bin Abi Waqqash RA.",
    peristiwa: "Setelah peringatan bertahap sebelumnya, terjadi jamuan makan di mana seseorang mabuk akibat meminum khamr lalu melempar tulang rahang unta hingga melukai hidung Sa'ad bin Abi Waqqash. Umar bin Khattab kembali memohon: 'Ya Allah, berikanlah ketegasan putusan yang memuaskan tentang khamr!' Maka turunlah ketegasan mutlak: 'Sesungguhnya khamr, berjudi, berhala, dan mengundi nasib adalah perbuatan keji termasuk perbuatan setan. Maka jauhilah... Apakah kamu berhenti?' Kaum muslimin serentak menjawab: 'Kami berhenti, ya Allah! Kami berhenti!' Mereka menumpahkan semua bejana khamr ke jalanan Madinah.",
    hikmah: "Pengharaman mutlak dan tuntas terhadap zat perusak akal, menjaga kesucian jasmani dan rohani."
  },
  {
    surat: 7,
    namaSurat: "Al-A'raf",
    ayat: 31,
    judul: "Perintah Berpakaian Sopan dan Indah Saat Menghadap Rumah Allah",
    riwayat: "Diriwayatkan oleh Imam Muslim dari Ibnu Abbas RA.",
    peristiwa: "Kaum musyrik jahiliyah memiliki kebiasaan keliru saat menunaikan ibadah thawaf di Ka'bah: mereka thawaf dalam keadaan telanjang bulat tanpa busana, baik laki-laki maupun perempuan (kecuali suku Quraisy), beralasan bahwa mereka tidak mau thawaf dengan pakaian yang pernah dipakai bermaksiat. Maka Allah menurunkan ayat: 'Wahai anak cucu Adam, pakailah pakaianmu yang bagus pada setiap (memasuki) masjid, makan dan minumlah, tetapi jangan berlebih-lebihan.'",
    hikmah: "Adab menutup aurat dengan pakaian yang bersih, rapi, dan sopan ketika beribadah di rumah Allah."
  },
  {
    surat: 7,
    namaSurat: "Al-A'raf",
    ayat: 187,
    judul: "Kepastian Terjadinya Hari Kiamat Hanya Milik Allah SWT",
    riwayat: "Diriwayatkan oleh Imam At-Tirmidzi dari Ibnu Abbas RA.",
    peristiwa: "Tokoh-tokoh kafir Quraisy dan rabi Yahudi berulang kali mendatangi Nabi SAW untuk mendesak dan menguji dengan nada mengejek: 'Wahai Muhammad, beritahukanlah kepada kami tanggal dan jam berapakah kiamat itu terjadi jika engkau benar-benar seorang Nabi?' Maka Allah menurunkan ayat: 'Mereka menanyakan kepadamu tentang kiamat: Kapankah terjadinya? Katakanlah: Sesungguhnya pengetahuan tentang kiamat itu ada pada sisi Tuhanku; tidak seorang pun yang dapat menjelaskan waktu kedatangannya selain Dia.'",
    hikmah: "Kiamat adalah perkara ghaib mutlak yang dirahasiakan Allah agar manusia senantiasa bersiap dengan amal shalih."
  },
  {
    surat: 8,
    namaSurat: "Al-Anfal",
    ayat: 1,
    judul: "Pembagian Harta Rampasan Perang Badar (Ghanimah)",
    riwayat: "Diriwayatkan oleh Imam Ahmad dan Abu Dawud dari Ubadah bin Shamit RA.",
    peristiwa: "Setelah kemenangan gemilang pada Perang Badar, timbul silang pendapat di antara prajurit muslim mengenai siapa yang paling berhak atas harta rampasan perang (antara pemuda yang menyerang musuh, para penjaga posko Nabi SAW, atau pasukan pengumpul harta). Maka Allah menurunkan ayat ini: 'Mereka menanyakan kepadamu tentang harta rampasan perang. Katakanlah: Harta rampasan perang itu kepunyaan Allah dan Rasul...' Allah lalu mengatur pembagiannya secara adil dan memerintahkan mereka memperbaiki hubungan persaudaraan.",
    hikmah: "Menghilangkan keserakahan harta dunia dalam perjuangan menegakkan kebenaran."
  },
  {
    surat: 9,
    namaSurat: "At-Taubah",
    ayat: 40,
    judul: "Pertolongan Allah di Gua Tsur Saat Pengejaran Hijrah",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Abu Bakar Ash-Shiddiq RA.",
    peristiwa: "Ketika Rasulullah SAW dan Abu Bakar bersembunyi di Gua Tsur saat hijrah ke Madinah, kaum musyrik Quraisy bersenjata lengkap berdiri tepat di depan mulut gua. Abu Bakar berbisik cemas: 'Wahai Rasulullah, sekiranya salah seorang dari mereka melihat ke bawah telapak kakinya, pasti mereka akan melihat kita!' Rasulullah SAW dengan tenang bersabda: 'Wahai Abu Bakar, apa prasangkamu terhadap dua orang di mana Allah adalah yang ketiga bagi keduanya? Jangan bersedih, sesungguhnya Allah bersama kita!'",
    hikmah: "Tawakkal sejati dan perlindungan mukjizat Ilahi di saat genting bagi hamba yang beriman."
  },
  {
    surat: 18,
    namaSurat: "Al-Kahf",
    ayat: "9-26",
    judul: "Kisah Ashabul Kahfi: Ujian Tiga Pertanyaan Rabi Yahudi",
    riwayat: "Diriwayatkan oleh Ibnu Ishaq dari Ibnu Abbas RA.",
    peristiwa: "Kaum kafir Quraisy mengutus An-Nadr bin Al-Harits dan Uqbah bin Abi Mu'ith ke Madinah menemui para pendeta Yahudi untuk menanyakan kebenaran kenabian Muhammad. Pendeta Yahudi menyarankan: 'Tanyakan kepadanya 3 perkara: tentang pemuda-pemuda yang pergi pada zaman dahulu (Ashabul Kahfi), tentang seorang pengelana agung penjelajah timur dan barat (Dzulqarnain), dan tentang Ruh!' Maka turunlah Surah Al-Kahf menjawab tuntas kisah para pemuda beriman yang tertidur 309 tahun di dalam gua.",
    hikmah: "Meneguhkan keimanan terhadap kekuasaan Allah membangkitkan manusia dan menjaga pemuda beriman dari kezaliman."
  },
  {
    surat: 18,
    namaSurat: "Al-Kahf",
    ayat: "23-24",
    judul: "Teguran Mengucapkan 'Insya Allah' Saat Berjanji",
    riwayat: "Diriwayatkan oleh Ibnu Ishaq dari Ibnu Abbas RA.",
    peristiwa: "Ketika kaum Quraisy mengajukan tiga pertanyaan tersebut, Rasulullah SAW menjawab dengan spontan: 'Aku akan menjawab pertanyaan kalian besok,' tanpa mengucapkan 'Insya Allah' (Jika Allah menghendaki). Akibatnya, wahyu terhenti selama 15 hari sehingga membuat Nabi berduka dan kaum musyrik bergembira mengejek. Setelah itu Malaikat Jibril turun membawa wahyu disertai teguran kasih sayang: 'Dan jangan sekali-kali kamu mengatakan terhadap sesuatu: Aku pasti melakukan itu besok pagi, tanpa (menyebut): Insya Allah.'",
    hikmah: "Ketergantungan mutlak manusia kepada kehendak Allah SWT dalam setiap rencana masa depan."
  },
  {
    surat: 24,
    namaSurat: "An-Nur",
    ayat: "11-20",
    judul: "Haditsul Ifki: Pembersihan Fitnah Keji Terhadap Ummul Mukminin Aisyah RA",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Sayyidah Aisyah RA.",
    peristiwa: "Sepulang dari ekspedisi Bani Musthaliq, Sayyidah Aisyah tertinggal rombongan karena mencari kalungnya yang hilang, lalu diantarkan pulang oleh Shafwan bin Mu'aththal As-Sulami. Gembong munafik Abdullah bin Ubay bin Salul menyebarkan desas-desus dusta yang keji hingga mengguncang Madinah selama sebulan penuh. Aisyah jatuh sakit dan menangis tiada henti. Hingga akhirnya Allah SWT menurunkan langsung sepuluh ayat pembebasan dari atas langit ketujuh yang membersihkan kesucian Aisyah dan mengancam para penyebar fitnah dengan siksa pedih.",
    hikmah: "Bahaya fitnah dan berita bohong, serta kewajiban menjaga kehormatan kaum mukminin."
  },
  {
    surat: 36,
    namaSurat: "Ya Sin",
    ayat: "77-79",
    judul: "Kekuasaan Allah Menghidupkan Tulang Belulang yang Telah Hancur",
    riwayat: "Diriwayatkan oleh Al-Hakim dan Ibnu Abi Hatim dari Ibnu Abbas RA.",
    peristiwa: "Ubay bin Khalaf (tokoh kafir Quraisy) datang kepada Rasulullah SAW membawa sepotong tulang belulang manusia yang sudah rapuh lapuk. Dia meremas tulang itu dengan tangannya hingga menjadi serbuk debu, lalu meniupkannya ke arah wajah Nabi sambil mengejek: 'Wahai Muhammad, apakah engkau mengklaim bahwa Allah sanggup menghidupkan tulang yang sudah hancur lebur seperti ini?' Rasulullah menjawab: 'Ya, Allah akan mematikanmu, lalu membangkitkanmu kembali, kemudian memasukkanmu ke dalam api neraka!' Lalu turunlah ayat: 'Katakanlah: Dia yang menciptakannya pertama kali akan menghidupkannya kembali.'",
    hikmah: "Bukti rasional yang tak terbantahkan tentang hari kebangkitan dan kekuasaan penciptaan Allah."
  },
  {
    surat: 39,
    namaSurat: "Az-Zumar",
    ayat: 53,
    judul: "Harapan Luasnya Pintu Taubat bagi Orang yang Melampaui Batas",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Ibnu Abbas RA.",
    peristiwa: "Beberapa orang musyrik yang telah banyak membunuh dan berzina datang menemui Nabi Muhammad SAW lalu berkata: 'Sesungguhnya ajaran yang engkau serukan itu sangat indah. Namun apakah ada jalan taubat dan tebusan bagi perbuatan dosa besar yang telah bertahun-tahun kami lakukan?' Maka Allah Yang Maha Pengasih menurunkan firman-Nya yang paling menyejukkan hati pendosa: 'Katakanlah: Wahai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri! Janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya.'",
    hikmah: "Pintu rahmat dan ampunan Allah selalu terbuka lebar bagi siapa pun yang bertaubat dengan tulus."
  },
  {
    surat: 49,
    namaSurat: "Al-Hujurat",
    ayat: 6,
    judul: "Kewajiban Tabayyun (Cek & Ricek) Terhadap Berita Orang Fasik",
    riwayat: "Diriwayatkan oleh Imam Ahmad dari Al-Harits bin Dirar Al-Khuza'i RA.",
    peristiwa: "Rasulullah SAW mengutus Al-Walid bin Uqbah untuk memungut zakat ke Bani Musthaliq. Namun di tengah jalan Al-Walid merasa takut karena melihat orang-orang kampung keluar beramai-ramai menyambutnya (disangka hendak menyerangnya). Dia kembali ke Madinah dan melapor keliru bahwa Bani Musthaliq murtad dan menolak zakat. Pasukan hampir saja dikirim untuk menyerang, hingga utusan Bani Musthaliq datang meluruskan bahwa mereka keluar justru untuk menyambut dan menyerahkan zakat. Maka Allah menurunkan ayat perintah tabayyun.",
    hikmah: "Pentingnya verifikasi dan klarifikasi (tabayyun) informasi agar tidak menimpakan celaka pada orang tak bersalah."
  },
  {
    surat: 49,
    namaSurat: "Al-Hujurat",
    ayat: 13,
    judul: "Kesetaraan Umat Manusia dan Kemuliaan Hakiki di Sisi Allah",
    riwayat: "Diriwayatkan oleh Ibnu Abi Hatim dari Ibnu Abbas RA.",
    peristiwa: "Saat Pembebasan Makkah, Rasulullah SAW memerintahkan Bilal bin Rabah (mantan budak berkulit hitam asal Habasyah) mengumandangkan adzan di atas atap Ka'bah. Beberapa pembesar Quraisy yang baru masuk Islam berbisik mencibir: 'Apakah tidak ada orang lain selain burung gagak hitam ini untuk adzan?' Maka turunlah ayat: 'Wahai manusia! Sungguh, Kami telah menciptakan kamu dari seorang laki-laki dan seorang perempuan, kemudian Kami jadikan kamu berbangsa-bangsa dan bersuku-suku agar kamu saling mengenal. Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa.'",
    hikmah: "Islam menghapus rasisme dan kasta; kemuliaan murni bertumpu pada ketakwaan dan akhlak mulia."
  },
  {
    surat: 58,
    namaSurat: "Al-Mujadilah",
    ayat: "1-4",
    judul: "Gugatan Khaulah binti Tsa'labah dan Penghapusan Tradisi Zhihar",
    riwayat: "Diriwayatkan oleh Imam Ahmad dan Abu Dawud dari Sayyidah Aisyah RA.",
    peristiwa: "Khaulah binti Tsa'labah mendatangi Nabi SAW mengadukan suaminya (Aus bin Shamit) yang mengucapkan zhihar ('Punggungmu bagiku seperti punggung ibuku'), sebuah adat jahiliyah yang menggantung status istri tanpa dicerai dan tanpa digauli. Khaulah mengadu sambil menangis: 'Wahai Rasulullah, dia telah menghabiskan masa mudaku dan aku telah melahirkan anak-anak untuknya, kini ketika aku sudah tua dia men-zhiharku!' Rasulullah menjawab bahwa belum ada wahyu turun untuknya. Khaulah terus berdoa menengadah ke langit hingga Allah menurunkan firman-Nya: 'Sungguh, Allah telah mendengar ucapan perempuan yang mengajukan gugatan kepadamu...'",
    hikmah: "Allah Maha Mendengar rintihan kaum lemah dan menghapuskan tradisi zalim terhadap hak-hak wanita."
  },
  {
    surat: 62,
    namaSurat: "Al-Jumu'ah",
    ayat: "9-11",
    judul: "Keutamaan Khutbah Jum'at dan Godaan Kafilah Perniagaan",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Jabir bin Abdillah RA.",
    peristiwa: "Ketika Rasulullah SAW sedang berkhutbah sholat Jum'at, tiba-tiba tiba kafilah dagang Dihyah Al-Kalbi dari Syam membawa gandum dan makanan yang sangat dinanti masyarakat saat musim paceklik. Kedatangannya ditandai dengan tabuhan rebana meriah. Mendengar itu, para jamaah berhamburan keluar masjid menuju pasar hingga yang tersisa bersama Nabi hanya 12 orang sahabat (termasuk Abu Bakar dan Umar). Maka turunlah teguran kasih sayang pada ayat ini: 'Dan apabila mereka melihat perdagangan atau permainan, mereka bubar menuju kepadanya dan meninggalkan engkau yang sedang berdiri (berkhutbah)...'",
    hikmah: "Panggilan ibadah Jum'at harus didahulukan dari segala kesibukan duniawi dan perniagaan."
  },
  {
    surat: 80,
    namaSurat: "'Abasa",
    ayat: "1-10",
    judul: "Teguran Kasih Sayang Kepada Nabi Terkait Sahabat Tunanetra",
    riwayat: "Diriwayatkan oleh Imam At-Tirmidzi dan Al-Hakim dari Sayyidah Aisyah RA.",
    peristiwa: "Rasulullah SAW sedang berbincang intens mendakwahi para pembesar kafir Quraisy (Utbah bin Rabi'ah, Abu Jahl, Umayyah bin Khalaf) dengan harapan mereka masuk Islam dan pengikutnya ikut terselamatkan. Tiba-tiba datang Abdullah bin Ummi Maktum, seorang sahabat tunanetra yang tulus, berkata berulang kali: 'Wahai Rasulullah, ajarkanlah kepadaku apa yang telah Allah ajarkan kepadamu!' Karena merasa pembicaraannya terpotong, Rasulullah bermuka masam dan berpaling. Maka Allah menegur Nabi dengan halus: 'Dia (Muhammad) bermuka masam dan berpaling, karena seorang tunanetra telah datang kepadanya...' Sejak saat itu, setiap bertemu Ibnu Ummi Maktum, Nabi selalu memuliakannya.",
    hikmah: "Setiap jiwa pencari kebenaran bernilai sangat berharga tanpa membedakan status sosial dan fisik."
  },
  {
    surat: 93,
    namaSurat: "Ad-Duha",
    ayat: "1-3",
    judul: "Pelipur Lara Nabi Ketika Wahyu Terhenti Sementara",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Jundub bin Sufyan RA.",
    peristiwa: "Rasulullah SAW menderita sakit selama dua atau tiga malam sehingga tidak dapat bangun sholat malam, dan selama itu pula wahyu tidak kunjung turun. Seorang wanita musyrik (Ummu Jamil, istri Abu Lahab) datang mengejek dengan congkak: 'Wahai Muhammad, aku tidak melihat setanmu melainkan telah meninggalkanmu dan membencimu!' Mendengar ejekan itu hati Rasulullah sangat bersedih, hingga Allah menurunkan Surah Ad-Duha bersumpah demi waktu dhuha dan malam: 'Tuhanmu tidak meninggalkan engkau (Muhammad) dan tidak (pula) membencimu.'",
    hikmah: "Ketetapan kasih sayang Allah kepada kekasih-Nya dan jaminan masa depan yang jauh lebih mulia daripada masa lalu."
  },
  {
    surat: 108,
    namaSurat: "Al-Kausar",
    ayat: "1-3",
    judul: "Kurnia Telaga Al-Kautsar dan Bantahan Ejekan Kaum Kafir",
    riwayat: "Diriwayatkan oleh Ibnu Abi Hatim dan Al-Baihaqi dari Ibnu Abbas RA.",
    peristiwa: "Ketika putra Rasulullah SAW yang bernama Al-Qasim (atau Abdullah) wafat saat masih kecil di Makkah, Al-'Ash bin Wa'il As-Sahmi mengejek Nabi kepada kaum Quraisy: 'Tinggalkanlah dia, sesungguhnya Muhammad telah menjadi seorang yang abtar (terputus keturunannya dan tidak akan dikenang lagi namanya)!' Maka Allah menurunkan Surah Al-Kautsar menegaskan bahwa Allah telah menganugerahi Nabi nikmat yang amat melimpah (Al-Kautsar), dan justru orang yang mencela Nabi-lah yang terputus dari segala kebaikan.",
    hikmah: "Keabadian nama dan kemuliaan Rasulullah SAW serta telaga Al-Kautsar di surga kelak."
  },
  {
    surat: 109,
    namaSurat: "Al-Kafirun",
    ayat: "1-6",
    judul: "Ketegasan Akidah dan Penolakan Kompromi Penyembahan Berhala",
    riwayat: "Diriwayatkan oleh At-Thabarani dan Ibnu Ishaq dari Ibnu Abbas RA.",
    peristiwa: "Para tokoh musyrik Quraisy (Al-Walid bin Al-Mughirah, Al-Ash bin Wa'il, Al-Aswad bin Al-Muththalib, dan Umayyah bin Khalaf) mendatangi Nabi SAW menawarkan kompromi politik dan agama: 'Wahai Muhammad, marilah kita berdamai. Kami akan menyembah tuhanmu selama setahun, dan engkau menyembah tuhan berhala kami selama setahun. Jika agamamu lebih baik kami mendapat bagian, jika agama kami lebih baik engkau mendapat bagian.' Maka Allah menurunkan Surah Al-Kafirun yang menegaskan prinsip toleransi beragama: 'Untukmu agamamu, dan untukku agamaku.'",
    hikmah: "Kemurnian akidah tauhid tidak boleh dicampuradukkan dengan syirik, sambil tetap menjaga batasan toleransi."
  },
  {
    surat: 110,
    namaSurat: "An-Nasr",
    ayat: "1-3",
    judul: "Kabar Kemenangan Fathu Makkah dan Isyarat Dekatnya Wafat Nabi SAW",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari dari Ibnu Abbas RA.",
    peristiwa: "Sayyidina Umar bin Khattab mengajak Ibnu Abbas yang masih muda ke dalam majelis para sahabat senior Perang Badar. Sebagian sahabat bertanya mengapa pemuda diajak. Umar meminta mereka menafsirkan Surah An-Nasr. Mereka menjawab: 'Perintah bersyukur dan beristighfar jika Allah memberi pertolongan dan kemenangan.' Umar lalu bertanya kepada Ibnu Abbas: 'Apakah demikian menurutmu?' Ibnu Abbas menjawab: 'Bukan, itu adalah isyarat ajal Rasulullah SAW yang telah dekat, diberitahukan kepadanya bahwa jika kemenangan Makkah telah tiba maka tugas kenabiannya telah tuntas.' Umar membenarkan: 'Aku tidak mengetahui maknanya selain apa yang engkau katakan.'",
    hikmah: "Puncak kerendahan hati hamba adalah bertasbih dan memohon ampunan (istighfar) saat berada di puncak kesuksesan."
  },
  {
    surat: 111,
    namaSurat: "Al-Lahab",
    ayat: "1-5",
    judul: "Balasan Permusuhan Abu Lahab di Bukit Shafa",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Ibnu Abbas RA.",
    peristiwa: "Ketika turun perintah dakwah terang-terangan (QS. Asy-Syu'ara: 214), Rasulullah SAW menaiki Bukit Shafa lalu berseru lantang memanggil suku-suku Quraisy: 'Wahai Bani Fihr, wahai Bani 'Adi!' Mereka pun berkumpul. Nabi bertanya: 'Jika aku kabarkan kepada kalian ada pasukan berkuda di balik lembah hendak menyerang kalian, apakah kalian percaya?' Mereka serentak menjawab: 'Ya, kami tidak pernah mendapati engkau berdusta!' Nabi lalu bersabda: 'Sesungguhnya aku adalah pemberi peringatan kepada kalian sebelum azab yang keras.' Paman beliau, Abu Lahab, berteriak mencaci: 'Tabban laka sa'iral yaum! (Celakalah engkau sepanjang hari ini! Apakah hanya untuk ini engkau mengumpulkan kami?)' Maka turunlah surah ini.",
    hikmah: "Keadilan Allah yang membalas penghinaan terhadap risalah kebenaran, nasab mulia tidak berguna tanpa iman."
  },
  {
    surat: 112,
    namaSurat: "Al-Ikhlas",
    ayat: "1-4",
    judul: "Sifat dan Kesempurnaan Tauhid (Jawaban Atas Nasab Allah)",
    riwayat: "Diriwayatkan oleh Imam At-Tirmidzi dan Imam Ahmad dari Ubay bin Ka'ab RA.",
    peristiwa: "Orang-orang musyrik Quraisy dan beberapa pemuka Yahudi mendatangi Rasulullah SAW lalu bertanya: 'Wahai Muhammad, sebutkanlah kepada kami nasab (silsilah asal-usul) Tuhanmu! Terbuat dari apakah Dia? Emas, perak, atau tembaga?' Maka Allah SWT menurunkan Surah Al-Ikhlas yang bernilai sepertiga Al-Qur'an: 'Katakanlah (Muhammad): Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan, dan tidak ada sesuatu pun yang setara dengan-Nya.'",
    hikmah: "Kemurnian aqidah tauhid tanzih: Allah Maha Suci dari sifat menyerupai makhluk dan Maha Sempurna."
  },
  {
    surat: 113,
    namaSurat: "Al-Falaq",
    ayat: "1-5",
    judul: "Perlindungan dari Kejahatan Sihir dan Pendengki (Al-Mu'awwidzatain)",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Sayyidah Aisyah RA dan Zaid bin Arqam RA.",
    peristiwa: "Seorang dukun Yahudi dari Bani Zuraiq bernama Labid bin Al-A'sham membuat sihir jahat terhadap Rasulullah SAW menggunakan rambut beliau yang disisir dan gigi sisir, lalu diikatkan 11 simpul tali dan dibuang ke dalam sumur Dzarwan. Akibatnya Nabi merasa terganggu fisiknya. Dua malaikat datang memberitahukan letak sihir itu. Ketika tali diangkat dan Rasulullah membacakan ayat-ayat Surah Al-Falaq dan An-Nas (11 ayat), setiap satu ayat dibaca terbukalah satu simpul hingga Nabi merasa segar kembali bagaikan terlepas dari ikatan.",
    hikmah: "Senjata benteng rohani terkuat bagi orang mukmin dalam menangkal sihir, 'ain, kejahatan malam, dan hasad dengki."
  },
  {
    surat: 114,
    namaSurat: "An-Nas",
    ayat: "1-6",
    judul: "Perlindungan Mutlak dari Bisikan Setan Jin dan Manusia",
    riwayat: "Diriwayatkan oleh Imam Al-Bukhari & Muslim dari Sayyidah Aisyah RA.",
    peristiwa: "Dituturkan bersamaan dengan Surah Al-Falaq saat penawar sihir Labid bin Al-A'sham. Surah An-Nas secara khusus mengajarkan manusia untuk berlindung kepada Allah sebagai Penguasa (Rabb), Raja (Malik), dan Sembahan (Ilah) seluruh umat manusia dari bisikan jahat 'Al-Waswas Al-Khannas' (setan yang membisikkan keraguan saat manusia lalai dan bersembunyi saat manusia berdzikir), baik dari golongan jin maupun manusia.",
    hikmah: "Doa perlindungan hati dari keraguan, was-was, riya', dan bisikan godaan yang merusak keikhlasan ibadah."
  }
];

// ==============================================================================
// 3.1 PENGATUR MODE TAMPILAN AL-QUR'AN (PER AYAT / PER HALAMAN / TAFSIR / ASBAB)
// ==============================================================================
function setModeQuran(mode) {
  QURAN_CURRENT_MODE = mode;

  // Update tab buttons
  var tabs = {
    'ayat': document.getElementById('btnTabQuranAyat'),
    'halaman': document.getElementById('btnTabQuranHalaman'),
    'tafsir': document.getElementById('btnTabQuranTafsir'),
    'asbab': document.getElementById('btnTabQuranAsbab')
  };
  for (var k in tabs) {
    if (tabs[k]) {
      if (k === mode) tabs[k].classList.add('active');
      else tabs[k].classList.remove('active');
    }
  }

  // Sembunyikan semua kontainer
  var cList = document.getElementById('quranSurahListView');
  var cReader = document.getElementById('quranVerseReaderView');
  var cPage = document.getElementById('quranPageReaderView');
  var cTafsir = document.getElementById('quranTafsirView');
  var cAsbab = document.getElementById('quranAsbabView');

  if (cList) cList.classList.add('hidden');
  if (cReader) cReader.classList.add('hidden');
  if (cPage) cPage.classList.add('hidden');
  if (cTafsir) cTafsir.classList.add('hidden');
  if (cAsbab) cAsbab.classList.add('hidden');

  var modalTitle = document.getElementById('quranModalTitle');

  if (mode === 'ayat') {
    if (modalTitle) modalTitle.textContent = '📖 Al-Qur\'an Standar Kemenag (Per Ayat)';
    // Jika sedang di dalam surah reader, tetap di reader; jika tidak, buka list
    if (cReader && cReader.dataset.surahAktif) {
      cReader.classList.remove('hidden');
    } else if (cList) {
      cList.classList.remove('hidden');
    }
  } else if (mode === 'halaman') {
    if (modalTitle) modalTitle.textContent = '📄 Mushaf Al-Qur\'an Standar Kemenag (Per Halaman)';
    if (cPage) cPage.classList.remove('hidden');
    initJuzSelectDropdown();
    var lastHal = parseInt(localStorage.getItem('quran_last_page'), 10) || QURAN_PAGE_STATE.currentPage || 1;
    bacaHalamanQuran(lastHal);
  } else if (mode === 'tafsir') {
    if (modalTitle) modalTitle.textContent = '📚 Tafsir Al-Qur\'an Kemenag RI';
    if (cTafsir) cTafsir.classList.remove('hidden');
    initTafsirDropdowns();
    var sVal = parseInt(document.getElementById('tafsirSelectSurat').value, 10) || 1;
    bukaTafsirSurat(sVal);
  } else if (mode === 'asbab') {
    if (modalTitle) modalTitle.textContent = '💡 Asbabun Nuzul (Sebab Turunnya Ayat Al-Qur\'an)';
    if (cAsbab) cAsbab.classList.remove('hidden');
    initAsbabDropdowns();
    muatAsbabunNuzul('all', '');
  }
}

function bukaModalQuran() {
  var m = document.getElementById('modalQuran');
  if (!m) return;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  renderDaftarSuratQuran(QURAN_SURAHS);
  updateTampilanDurasiQuranSemua();

  // Buka mode terakhir atau default 'ayat'
  setModeQuran(QURAN_CURRENT_MODE || 'ayat');
}

function tutupModalQuran() {
  jedaTimerQuran();
  hentikanAudioAyat();
  var m = document.getElementById('modalQuran');
  if (m) m.classList.add('hidden');
  document.body.style.overflow = '';
  updateTampilanDurasiQuranSemua();
}

function tampilkanViewDaftarSurat() {
  var vList = document.getElementById('quranSurahListView');
  var vReader = document.getElementById('quranVerseReaderView');
  if (vList) vList.classList.remove('hidden');
  if (vReader) {
    vReader.classList.add('hidden');
    delete vReader.dataset.surahAktif;
  }
  var judulModal = document.getElementById('quranModalTitle');
  if (judulModal) judulModal.textContent = '📖 Al-Qur\'an Standar Kemenag (Per Ayat)';
  hentikanAudioAyat();
}

// Quick filter chips
function filterSuratQuick(noStr) {
  var inp = document.getElementById('cariSuratInput');
  if (inp) inp.value = noStr;
  filterDaftarSuratQuran();
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

// ==============================================================================
// 3.2 FITUR BACA PER AYAT (DENGAN AUDIO, KHOT NASKHI, TAFSIR & ASBAB SHORTCUT)
// ==============================================================================
async function bacaSuratQuran(nomorSurat, targetAyat) {
  var meta = QURAN_SURAHS.find(function (s) { return s.no === nomorSurat; });
  if (!meta) return;

  var vList = document.getElementById('quranSurahListView');
  var vReader = document.getElementById('quranVerseReaderView');
  if (vList) vList.classList.add('hidden');
  if (vReader) {
    vReader.classList.remove('hidden');
    vReader.dataset.surahAktif = nomorSurat;
  }

  var judulModal = document.getElementById('quranModalTitle');
  if (judulModal) judulModal.textContent = '📖 Surat ' + meta.nama + ' (' + meta.arab + ')';

  // Set reader header info dengan tombol cepat ke Tafsir & Asbabun Nuzul
  var hdr = document.getElementById('readerSurahHeader');
  if (hdr) {
    hdr.innerHTML = '<div style="text-align:center; background:linear-gradient(135deg, #f0fdf4, #ecfdf5); border:1.5px solid #a7f3d0; border-radius:14px; padding:14px;">' +
      '<h2 style="font-family: \'LPMQ Isep Misbah\', \'Amiri\', serif; font-size:34px; color:#047857; margin:0; direction:rtl;">' + meta.arab + '</h2>' +
      '<h3 style="font-size:18px; font-weight:800; color:var(--text); margin-top:4px;">' + meta.no + '. ' + meta.nama + ' (' + meta.arti + ')</h3>' +
      '<div style="font-size:12px; color:var(--muted); margin-top:2px;">' + meta.turun + ' • ' + meta.ayat + ' Ayat • <b>Halaman ' + meta.hal + '</b></div>' +
      '<div style="display:flex; justify-content:center; gap:6px; margin-top:10px; flex-wrap:wrap;">' +
        '<button class="btn btn-outline btn-sm" onclick="lompatKeHalamanQuranDariSurat(' + meta.hal + ')" style="font-size:11.5px; padding:3px 10px;">📄 Buka Hal. ' + meta.hal + '</button>' +
        '<button class="btn btn-outline btn-sm" onclick="bukaTafsirDariAyat(' + meta.no + ')" style="font-size:11.5px; padding:3px 10px; border-color:#059669; color:#047857;">📚 Tafsir Kemenag</button>' +
        '<button class="btn btn-outline btn-sm" onclick="bukaAsbabDariAyat(' + meta.no + ')" style="font-size:11.5px; padding:3px 10px; border-color:#ea580c; color:#c2410c;">💡 Asbabun Nuzul</button>' +
      '</div>' +
    '</div>';
  }

  // Mulai pelacak timer membaca
  mulaiTimerQuran(meta.no, meta.nama);

  var container = document.getElementById('readerAyatContainer');
  container.innerHTML = '<div style="text-align:center;padding:40px 10px;color:var(--muted);"><span class="spin">⏳</span> Memuat ayat-ayat Surat ' + meta.nama + ' versi Kemenag RI...</div>';

  // 1. Cek cache lokal
  if (QURAN_AYAT_CACHE[nomorSurat]) {
    renderAyatList(QURAN_AYAT_CACHE[nomorSurat].ayatList, meta, targetAyat);
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
      renderAyatList(json.data.ayat, meta, targetAyat);
      return;
    }
    throw new Error('Data tidak lengkap');
  } catch (err) {
    console.warn('Gagal memuat ayat online, menampilkan data darurat:', err);
    container.innerHTML = '<div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:16px;text-align:center;color:#991b1b;font-size:13px;line-height:1.6;">' +
      '⚠️ <b>Gagal memuat ayat secara online (koneksi terputus).</b><br>' +
      'Silakan periksa koneksi internet Anda.<br>' +
      '<button class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="bacaSuratQuran(' + nomorSurat + ')">🔄 Coba Lagi</button>' +
    '</div>';
  }
}

function renderAyatList(ayatList, meta, targetAyat) {
  var container = document.getElementById('readerAyatContainer');
  if (!container) return;

  var html = '';

  // Banner Bismillah (Kecuali Al-Fatihah dan At-Taubah)
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
    var audioUrl = (a.audio && (a.audio['05'] || a.audio['01'])) || '';

    // Cek apakah ada asbabun nuzul untuk surat dan ayat ini
    var hasAsbab = ASBABUN_NUZUL_DATABASE.some(function (item) {
      if (item.surat !== meta.no) return false;
      if (typeof item.ayat === 'number') return item.ayat === noAyat;
      if (typeof item.ayat === 'string' && item.ayat.includes('-')) {
        var parts = item.ayat.split('-').map(Number);
        return noAyat >= parts[0] && noAyat <= parts[1];
      }
      return false;
    });

    html += '<div class="ayat-card" id="cardAyat_' + meta.no + '_' + noAyat + '">' +
      '<div class="ayat-header-bar">' +
        '<span class="ayat-badge-pill">QS. ' + meta.nama + ': ' + noAyat + '</span>' +
        '<div class="ayat-actions-bar">' +
          '<button class="ayat-action-btn" id="btnAudio_' + meta.no + '_' + noAyat + '" onclick="putarAudioAyat(' + meta.no + ',' + noAyat + ', this)">🔊 Putar</button>' +
          '<button class="ayat-action-btn" onclick="bukaTafsirDariAyat(' + meta.no + ',' + noAyat + ')">📚 Tafsir</button>' +
          (hasAsbab ? '<button class="ayat-action-btn" style="border-color:#fdba74;color:#c2410c;background:#fff7ed;font-weight:700;" onclick="bukaAsbabDariAyat(' + meta.no + ',' + noAyat + ')">💡 Asbab</button>' : '') +
          '<button class="ayat-action-btn" onclick="salinTeksAyat(' + meta.no + ',' + noAyat + ', this)">📋 Salin</button>' +
        '</div>' +
      '</div>' +
      '<div class="ayat-arabic-text" style="font-size:' + QURAN_ARABIC_FONT_SIZE + 'px;">' + arab + ' <span class="ayat-end-number">۝' + toArabicDigits(noAyat) + '</span></div>' +
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
  toggleTampilanAyatOpsi();

  if (targetAyat) {
    setTimeout(function () {
      var el = document.getElementById('cardAyat_' + meta.no + '_' + targetAyat);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ayat-highlighted');
        setTimeout(function () { el.classList.remove('ayat-highlighted'); }, 3000);
      }
    }, 200);
  } else {
    container.scrollTop = 0;
  }
}

function ubahUkuranFontArab(delta) {
  QURAN_ARABIC_FONT_SIZE = Math.max(20, Math.min(44, QURAN_ARABIC_FONT_SIZE + delta));
  var els = document.querySelectorAll('.ayat-arabic-text');
  els.forEach(function (el) { el.style.fontSize = QURAN_ARABIC_FONT_SIZE + 'px'; });
}

function toggleTampilanAyatOpsi() {
  var showLatin = document.getElementById('chkShowLatin') ? document.getElementById('chkShowLatin').checked : true;
  var showArti = document.getElementById('chkShowArti') ? document.getElementById('chkShowArti').checked : true;

  document.querySelectorAll('.ayat-latin-text').forEach(function (el) {
    el.style.display = showLatin ? 'block' : 'none';
  });
  document.querySelectorAll('.ayat-indo-text').forEach(function (el) {
    el.style.display = showArti ? 'block' : 'none';
  });
}

function putarAudioAyat(noSurat, noAyat, btn) {
  if (CURRENT_PLAYING_AYAT && CURRENT_PLAYING_AYAT.surah === noSurat && CURRENT_PLAYING_AYAT.ayat === noAyat) {
    // Sedang berputar, klik untuk stop
    hentikanAudioAyat();
    return;
  }

  hentikanAudioAyat();

  var padSurat = String(noSurat).padStart(3, '0');
  var padAyat = String(noAyat).padStart(3, '0');
  var url = 'https://cdn.equran.id/audio-partial/Misyari-Rasyid-Al-Afasi/' + padSurat + padAyat + '.mp3';

  QURAN_AUDIO_PLAYER = new Audio(url);
  CURRENT_PLAYING_AYAT = { surah: noSurat, ayat: noAyat, btn: btn };

  if (btn) {
    btn.innerHTML = '⏹️ Hentikan';
    btn.classList.add('active-audio');
  }

  QURAN_AUDIO_PLAYER.play().catch(function (e) {
    console.warn('Audio play gagal:', e);
    hentikanAudioAyat();
  });

  QURAN_AUDIO_PLAYER.onended = function () {
    hentikanAudioAyat();
  };
}

function hentikanAudioAyat() {
  if (QURAN_AUDIO_PLAYER) {
    try {
      QURAN_AUDIO_PLAYER.pause();
      QURAN_AUDIO_PLAYER.currentTime = 0;
    } catch(e) {}
    QURAN_AUDIO_PLAYER = null;
  }
  if (CURRENT_PLAYING_AYAT && CURRENT_PLAYING_AYAT.btn) {
    CURRENT_PLAYING_AYAT.btn.innerHTML = '🔊 Putar';
    CURRENT_PLAYING_AYAT.btn.classList.remove('active-audio');
  }
  CURRENT_PLAYING_AYAT = null;
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

// Shortcut antar menu
function lompatKeHalamanQuranDariSurat(nomorHalaman) {
  setModeQuran('halaman');
  bacaHalamanQuran(nomorHalaman);
}

function bukaTafsirDariAyat(nomorSurat, nomorAyat) {
  setModeQuran('tafsir');
  var sel = document.getElementById('tafsirSelectSurat');
  if (sel) sel.value = nomorSurat;
  bukaTafsirSurat(nomorSurat, nomorAyat);
}

function bukaAsbabDariAyat(nomorSurat, nomorAyat) {
  setModeQuran('asbab');
  var sel = document.getElementById('asbabSelectSurat');
  if (sel) sel.value = nomorSurat;
  muatAsbabunNuzul(nomorSurat, '');
}

// ==============================================================================
// 3.3 FITUR BACA PER HALAMAN (MUSHAF STANDAR KEMENAG RI 604 HALAMAN)
// ==============================================================================
function initJuzSelectDropdown() {
  var sel = document.getElementById('selectJuzJumper');
  if (!sel || sel.children.length > 0) return;

  var optHtml = '';
  for (var j = 1; j <= 30; j++) {
    optHtml += '<option value="' + j + '">Juz ' + j + ' (Hal. ' + JUZ_START_PAGES[j - 1] + ')</option>';
  }
  sel.innerHTML = optHtml;
}

async function bacaHalamanQuran(pageNum) {
  var p = parseInt(pageNum, 10);
  if (isNaN(p) || p < 1) p = 1;
  if (p > 604) p = 604;

  QURAN_PAGE_STATE.currentPage = p;
  localStorage.setItem('quran_last_page', p);

  // Ambil Juz dan Surat yang memuat halaman ini
  var juz = getJuzFromPage(p);
  var surah = getSurahFromPage(p);

  // Update Ribbon Header
  var dispJuz = document.getElementById('mushafJuzText');
  var dispHal = document.getElementById('mushafPageNumberText');
  var dispSurah = document.getElementById('mushafSurahText');
  if (dispJuz) dispJuz.textContent = 'JUZ ' + juz;
  if (dispHal) dispHal.textContent = 'HALAMAN ' + p + ' / 604';
  if (dispSurah) dispSurah.textContent = surah.no + '. ' + surah.nama;

  // Update Jumper Inputs
  var selJuz = document.getElementById('selectJuzJumper');
  if (selJuz) selJuz.value = juz;
  var inpHal = document.getElementById('inputHalJumper');
  if (inpHal) inpHal.value = p;

  // Timer membaca aktif
  mulaiTimerQuran(surah.no, 'Halaman ' + p);

  // 1. Mode Visual Mushaf Gambar
  var imgEl = document.getElementById('mushafPageImage');
  var loader = document.getElementById('mushafImgLoader');
  if (loader) loader.style.display = 'flex';

  var padNum = String(p).padStart(3, '0');
  var imgUrl = 'https://files.quran.app/hafs/madani/width_1024/page' + padNum + '.png';

  if (imgEl) {
    imgEl.src = imgUrl;
  }

  // 2. Fetch data ayat teks halaman tersebut untuk mode teks & footer
  muatDataAyatHalaman(p, surah);
}

function onMushafImgLoaded() {
  var loader = document.getElementById('mushafImgLoader');
  if (loader) loader.style.display = 'none';
}

function onMushafImgError() {
  var loader = document.getElementById('mushafImgLoader');
  if (loader) {
    loader.innerHTML = '<div style="color:#b91c1c;padding:20px;text-align:center;">' +
      '⚠️ Gagal memuat gambar halaman.<br>' +
      '<button class="btn btn-outline btn-sm" onclick="setModeTampilanHalaman(\'teks\')" style="margin-top:8px;">Beralih ke Teks Khot Naskhi</button>' +
    '</div>';
  }
}

async function muatDataAyatHalaman(p, defaultSurah) {
  var footerEl = document.getElementById('mushafPageVersesRange');
  var textContainer = document.getElementById('mushafTextContent');

  if (QURAN_PAGE_CACHE[p]) {
    renderHalamanTeks(QURAN_PAGE_CACHE[p], p);
    return;
  }

  try {
    var res = await fetch('https://api.quran.com/api/v4/verses/by_page/' + p + '?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,verse_number,juz_number');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var json = await res.json();
    if (json && json.verses) {
      QURAN_PAGE_CACHE[p] = json.verses;
      renderHalamanTeks(json.verses, p);
      return;
    }
  } catch(e) {
    console.warn('Gagal fetch ayat halaman via API, fallback ke surat master:', e);
  }

  if (footerEl) {
    footerEl.textContent = 'Halaman ' + p + ' • Terkait Surah ' + defaultSurah.no + '. ' + defaultSurah.nama;
  }
  if (textContainer) {
    textContainer.innerHTML = '<div style="text-align:center;padding:20px;font-size:14px;color:var(--muted);">' +
      'Gunakan tombol <b>"Buka di Per Ayat"</b> di bawah untuk membaca seluruh ayat surat ' + defaultSurah.nama + ' secara lengkap dengan terjemahan.' +
    '</div>';
  }
}

function renderHalamanTeks(verses, pageNum) {
  var footerEl = document.getElementById('mushafPageVersesRange');
  var textContainer = document.getElementById('mushafTextContent');

  if (!verses || verses.length === 0) return;

  var firstV = verses[0];
  var lastV = verses[verses.length - 1];

  var sFirst = QURAN_SURAHS.find(function(s) { return s.no === firstV.chapter_id; }) || { nama: 'Surah ' + firstV.chapter_id };
  var sLast = QURAN_SURAHS.find(function(s) { return s.no === lastV.chapter_id; }) || { nama: 'Surah ' + lastV.chapter_id };

  var rangeInfo = '';
  if (firstV.chapter_id === lastV.chapter_id) {
    rangeInfo = 'QS. ' + sFirst.nama + ' ayat ' + firstV.verse_number + ' s/d ' + lastV.verse_number + ' (' + verses.length + ' Ayat)';
  } else {
    rangeInfo = 'QS. ' + sFirst.nama + ': ' + firstV.verse_number + ' s/d QS. ' + sLast.nama + ': ' + lastV.verse_number;
  }

  if (footerEl) footerEl.textContent = rangeInfo;

  if (textContainer) {
    var flowHtml = '';
    var currentChap = -1;

    for (var i = 0; i < verses.length; i++) {
      var v = verses[i];
      if (v.chapter_id !== currentChap) {
        currentChap = v.chapter_id;
        var sm = QURAN_SURAHS.find(function(s) { return s.no === currentChap; });
        if (sm) {
          flowHtml += '<div style="text-align:center;margin:16px 0 12px 0;border-bottom:1.5px solid #d4af37;padding-bottom:8px;">' +
            '<div style="font-size:26px;color:#047857;font-family:\'LPMQ Isep Misbah\',serif;">' + sm.arab + '</div>' +
            '<div style="font-size:12px;color:#475569;font-weight:700;">' + sm.no + '. Surat ' + sm.nama + ' (' + sm.turun + ', ' + sm.ayat + ' Ayat)</div>' +
          '</div>';
          if (sm.no !== 1 && sm.no !== 9 && v.verse_number === 1) {
            flowHtml += '<div style="text-align:center;font-size:24px;color:#047857;margin-bottom:12px;font-family:\'LPMQ Isep Misbah\',serif;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>';
          }
        }
      }

      var textUt = v.text_uthmani || '';
      flowHtml += '<span class="ayah-token" title="Ayat ' + v.verse_number + '">' + textUt + ' <span class="ayat-end-number" style="font-size:20px;color:#059669;">۝' + toArabicDigits(v.verse_number) + '</span> </span> ';
    }

    textContainer.innerHTML = flowHtml;
  }
}

function navigasiHalamanQuran(delta) {
  var p = (QURAN_PAGE_STATE.currentPage || 1) + delta;
  bacaHalamanQuran(p);
}

function lompatKeJuz(juzVal) {
  var j = parseInt(juzVal, 10) || 1;
  var targetHal = JUZ_START_PAGES[j - 1] || 1;
  bacaHalamanQuran(targetHal);
}

function lompatKeHalamanInput() {
  var val = parseInt(document.getElementById('inputHalJumper').value, 10);
  if (!isNaN(val)) bacaHalamanQuran(val);
}

function setModeTampilanHalaman(mode) {
  QURAN_PAGE_STATE.viewMode = mode;
  var vBox = document.getElementById('mushafVisualContainer');
  var tBox = document.getElementById('mushafTextContainer');
  var bVis = document.getElementById('btnViewMushafVisual');
  var bTek = document.getElementById('btnViewMushafTeks');

  if (mode === 'visual') {
    if (vBox) vBox.classList.remove('hidden');
    if (tBox) tBox.classList.add('hidden');
    if (bVis) { bVis.classList.add('btn-primary'); bVis.classList.remove('btn-outline'); }
    if (bTek) { bTek.classList.add('btn-outline'); bTek.classList.remove('btn-primary'); }
  } else {
    if (vBox) vBox.classList.add('hidden');
    if (tBox) tBox.classList.remove('hidden');
    if (bVis) { bVis.classList.add('btn-outline'); bVis.classList.remove('btn-primary'); }
    if (bTek) { bTek.classList.add('btn-primary'); bTek.classList.remove('btn-outline'); }
  }
}

function bukaHalamanIniDiPerAyat() {
  var p = QURAN_PAGE_STATE.currentPage || 1;
  var surah = getSurahFromPage(p);
  setModeQuran('ayat');
  bacaSuratQuran(surah.no);
}

function bukaHalamanIniDiTafsir() {
  var p = QURAN_PAGE_STATE.currentPage || 1;
  var surah = getSurahFromPage(p);
  setModeQuran('tafsir');
  var sel = document.getElementById('tafsirSelectSurat');
  if (sel) sel.value = surah.no;
  bukaTafsirSurat(surah.no);
}

// ==============================================================================
// 3.4 FITUR TAFSIR AL-QUR'AN KEMENAG RI (TAFSIR LENGKAP & RINGKAS RESMI)
// ==============================================================================
function initTafsirDropdowns() {
  var selSurat = document.getElementById('tafsirSelectSurat');
  if (!selSurat || selSurat.children.length > 0) return;

  var html = '';
  for (var i = 0; i < QURAN_SURAHS.length; i++) {
    var s = QURAN_SURAHS[i];
    html += '<option value="' + s.no + '">' + s.no + '. ' + s.nama + ' (' + s.ayat + ' Ayat)</option>';
  }
  selSurat.innerHTML = html;
}

async function bukaTafsirSurat(nomorSurat, targetAyat) {
  var sNum = parseInt(nomorSurat, 10) || 1;
  var meta = QURAN_SURAHS.find(function(s) { return s.no === sNum; });
  if (!meta) return;

  var selSurat = document.getElementById('tafsirSelectSurat');
  if (selSurat) selSurat.value = sNum;

  // Update pilihan filter ayat
  var selAyat = document.getElementById('tafsirSelectAyat');
  if (selAyat) {
    var optAyat = '<option value="all">Semua Ayat (1-' + meta.ayat + ')</option>';
    for (var a = 1; a <= meta.ayat; a++) {
      optAyat += '<option value="' + a + '">Ayat ' + a + '</option>';
    }
    selAyat.innerHTML = optAyat;
    if (targetAyat) selAyat.value = targetAyat;
    else selAyat.value = 'all';
  }

  var container = document.getElementById('tafsirAyatContainer');
  var introBox = document.getElementById('tafsirSurahIntroBox');

  container.innerHTML = '<div style="text-align:center;padding:40px 10px;color:var(--muted);"><span class="spin">⏳</span> Memuat Tafsir Resmi Kemenag RI untuk Surat ' + meta.nama + '...</div>';

  // Mulai timer membaca saat menelaah tafsir
  mulaiTimerQuran(meta.no, 'Tafsir ' + meta.nama);

  // Ambil data tafsir dari cache atau fetch equran.id
  var tafsirData = QURAN_TAFSIR_CACHE[sNum];
  if (!tafsirData) {
    try {
      var res = await fetch('https://equran.id/api/v2/tafsir/' + sNum);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var json = await res.json();
      if (json && json.data) {
        tafsirData = json.data;
        QURAN_TAFSIR_CACHE[sNum] = tafsirData;
      } else {
        throw new Error('Data tafsir kosong');
      }
    } catch(err) {
      console.warn('Gagal memuat tafsir online:', err);
      container.innerHTML = '<div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:16px;text-align:center;color:#991b1b;font-size:13px;">' +
        '⚠️ Gagal memuat data tafsir online. Silakan periksa koneksi internet.<br>' +
        '<button class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="bukaTafsirSurat(' + sNum + ')">🔄 Coba Lagi</button>' +
      '</div>';
      return;
    }
  }

  // Render Intro Box Kemenag
  if (introBox) {
    introBox.innerHTML = '<div style="background:linear-gradient(135deg, #f0fdf4, #ecfdf5); border:1.5px solid #a7f3d0; border-radius:14px; padding:14px;">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">' +
        '<div>' +
          '<h3 style="margin:0; color:#047857; font-size:16px;">Tafsir Surat ' + meta.nama + ' (' + meta.arab + ')</h3>' +
          '<div style="font-size:12px; color:var(--muted); margin-top:2px;">' + meta.arti + ' • ' + meta.turun + ' • ' + meta.ayat + ' Ayat • Tafsir Standar Kementerian Agama RI</div>' +
        '</div>' +
        '<button class="btn btn-outline btn-sm" onclick="bacaSuratQuran(' + meta.no + ')" style="font-size:11.5px;">📜 Buka Teks Ayat</button>' +
      '</div>' +
      (tafsirData.deskripsi ? '<div style="font-size:12.5px; color:#334155; line-height:1.6; margin-top:10px; border-top:1px dashed #a7f3d0; padding-top:8px;"><b>Mukaddimah & Pokok Kandungan:</b><br>' + tafsirData.deskripsi + '</div>' : '') +
    '</div>';
  }

  renderTafsirView(tafsirData, sNum, targetAyat);
}

function onTafsirSuratChanged() {
  var sVal = parseInt(document.getElementById('tafsirSelectSurat').value, 10) || 1;
  bukaTafsirSurat(sVal);
}

function onTafsirAyatFilterChanged() {
  var sVal = parseInt(document.getElementById('tafsirSelectSurat').value, 10) || 1;
  var aVal = document.getElementById('tafsirSelectAyat').value;
  var tafsirData = QURAN_TAFSIR_CACHE[sVal];
  if (tafsirData) {
    renderTafsirView(tafsirData, sVal, aVal === 'all' ? null : parseInt(aVal, 10));
  }
}

function filterTafsirText() {
  var sVal = parseInt(document.getElementById('tafsirSelectSurat').value, 10) || 1;
  var tafsirData = QURAN_TAFSIR_CACHE[sVal];
  if (tafsirData) {
    var kw = (document.getElementById('tafsirCariInput').value || '').trim().toLowerCase();
    renderTafsirView(tafsirData, sVal, null, kw);
  }
}

function renderTafsirView(tafsirData, sNum, targetAyat, searchKw) {
  var container = document.getElementById('tafsirAyatContainer');
  if (!container || !tafsirData || !tafsirData.tafsir) return;

  var meta = QURAN_SURAHS.find(function(s) { return s.no === sNum; });
  var ayatArr = tafsirData.tafsir;

  // Filter jika ada nomor ayat tertentu
  var aFilterVal = document.getElementById('tafsirSelectAyat') ? document.getElementById('tafsirSelectAyat').value : 'all';
  if (aFilterVal !== 'all' && !targetAyat) {
    targetAyat = parseInt(aFilterVal, 10);
  }

  if (targetAyat) {
    ayatArr = ayatArr.filter(function(item) { return item.ayat === targetAyat; });
  }

  // Filter kata kunci pencarian
  if (searchKw) {
    ayatArr = ayatArr.filter(function(item) {
      return item.teks.toLowerCase().includes(searchKw) || String(item.ayat) === searchKw;
    });
  }

  if (ayatArr.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">Tidak ada tafsir ayat yang cocok dengan filter atau pencarian Anda.</div>';
    return;
  }

  var html = '';
  // Cek apakah ada ayat text dari cache
  var suratAyatCache = QURAN_AYAT_CACHE[sNum] ? QURAN_AYAT_CACHE[sNum].ayatList : null;

  for (var i = 0; i < ayatArr.length; i++) {
    var item = ayatArr[i];
    var noA = item.ayat;
    var teksTafsir = item.teks;

    var arabPreview = '';
    var artiPreview = '';
    if (suratAyatCache) {
      var aObj = suratAyatCache.find(function(x) { return x.nomorAyat === noA; });
      if (aObj) {
        arabPreview = aObj.teksArab;
        artiPreview = aObj.teksIndonesia;
      }
    }

    html += '<div class="tafsir-card" id="cardTafsir_' + sNum + '_' + noA + '">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
        '<span class="ayat-badge-pill" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;">QS. ' + meta.nama + ': Ayat ' + noA + '</span>' +
        '<div style="display:flex; gap:6px;">' +
          '<button class="ayat-action-btn" onclick="bacaSuratQuran(' + sNum + ',' + noA + ')">📜 Lihat Ayat</button>' +
          '<button class="ayat-action-btn" onclick="bukaAsbabDariAyat(' + sNum + ',' + noA + ')">💡 Asbab</button>' +
        '</div>' +
      '</div>';

    if (arabPreview) {
      html += '<div class="tafsir-ayat-preview">' + arabPreview + ' <span class="ayat-end-number" style="font-size:20px;">۝' + toArabicDigits(noA) + '</span></div>';
    }
    if (artiPreview) {
      html += '<div style="font-size:12.5px;color:#047857;margin-bottom:8px;font-style:italic;">"' + escHtml(artiPreview) + '"</div>';
    }

    html += '<div class="tafsir-body-text">' +
      '<div style="font-weight:700;color:#065f46;font-size:12px;margin-bottom:4px;">📖 Tafsir Kemenag RI:</div>' +
      nl2br(teksTafsir) +
    '</div>' +
    '</div>';
  }

  container.innerHTML = html;

  if (targetAyat) {
    setTimeout(function() {
      var el = document.getElementById('cardTafsir_' + sNum + '_' + targetAyat);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  } else {
    container.scrollTop = 0;
  }
}

// ==============================================================================
// 3.5 FITUR ASBABUN NUZUL (SEBAB-SEBAB TURUNNYA AYAT AL-QUR'AN)
// ==============================================================================
function initAsbabDropdowns() {
  var sel = document.getElementById('asbabSelectSurat');
  if (!sel || sel.children.length > 1) return;

  var html = '<option value="all">🌟 Semua Surat yang Memiliki Asbabun Nuzul</option>';
  for (var i = 0; i < QURAN_SURAHS.length; i++) {
    var s = QURAN_SURAHS[i];
    var count = ASBABUN_NUZUL_DATABASE.filter(function(x) { return x.surat === s.no; }).length;
    var badge = count > 0 ? ' (' + count + ' Riwayat)' : '';
    html += '<option value="' + s.no + '">' + s.no + '. ' + s.nama + badge + '</option>';
  }
  sel.innerHTML = html;
}

function onAsbabSuratChanged() {
  var sVal = document.getElementById('asbabSelectSurat').value;
  var q = (document.getElementById('asbabCariInput').value || '').trim();
  muatAsbabunNuzul(sVal, q);
}

function filterAsbabunNuzul() {
  var sVal = document.getElementById('asbabSelectSurat').value;
  var q = (document.getElementById('asbabCariInput').value || '').trim();
  muatAsbabunNuzul(sVal, q);
}

function muatAsbabunNuzul(suratFilter, query) {
  var container = document.getElementById('asbabListContainer');
  if (!container) return;

  var list = ASBABUN_NUZUL_DATABASE.slice();

  if (suratFilter && suratFilter !== 'all') {
    var sNum = parseInt(suratFilter, 10);
    list = list.filter(function(item) { return item.surat === sNum; });
  }

  if (query) {
    var qLower = query.toLowerCase();
    list = list.filter(function(item) {
      return item.judul.toLowerCase().includes(qLower) ||
             item.peristiwa.toLowerCase().includes(qLower) ||
             item.namaSurat.toLowerCase().includes(qLower) ||
             item.hikmah.toLowerCase().includes(qLower);
    });
  }

  if (list.length === 0) {
    // Jika memilih surat yang tidak ada riwayat ayat tertentu di database lokal, tampilkan deskripsi pewahyuan Kemenag
    if (suratFilter && suratFilter !== 'all') {
      var sNum2 = parseInt(suratFilter, 10);
      var meta2 = QURAN_SURAHS.find(function(s) { return s.no === sNum2; });
      container.innerHTML = '<div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:14px;padding:18px;text-align:center;">' +
        '<div style="font-size:28px;">📜</div>' +
        '<h4 style="color:#9a3412;margin:8px 0 4px 0;">Konteks Pewahyuan Surat ' + meta2.nama + '</h4>' +
        '<div style="font-size:12px;color:var(--muted);margin-bottom:10px;">' + meta2.turun + ' • ' + meta2.ayat + ' Ayat • Rujukan Lajnah Pentashihan Mushaf Al-Qur\'an (LPMQ)</div>' +
        '<div style="font-size:13px;color:#78350f;line-height:1.7;text-align:justify;background:#ffffff;padding:12px 14px;border-radius:10px;border:1px dashed #fdba74;">' +
          'Surat <b>' + meta2.nama + '</b> diturunkan dalam fase dakwah <b>' + meta2.turun + '</b>. Ayat-ayat di dalam surat ini turun secara tematik berkesinambungan membimbing umat dalam aqidah, ibadah, dan pembinaan akhlak mulia. Riwayat rinci makna dan hikmah ayat dapat Anda telaah selengkapnya melalui menu <b>Tafsir Kemenag</b>.' +
        '</div>' +
        '<div style="margin-top:14px;display:flex;justify-content:center;gap:8px;">' +
          '<button class="btn btn-outline btn-sm" onclick="bacaSuratQuran(' + meta2.no + ')">📜 Baca Surat ' + meta2.nama + '</button>' +
          '<button class="btn btn-outline btn-sm" onclick="bukaTafsirDariAyat(' + meta2.no + ')" style="border-color:#059669;color:#047857;">📚 Buka Tafsir Kemenag</button>' +
        '</div>' +
      '</div>';
      return;
    }

    container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">Riwayat Asbabun Nuzul tidak ditemukan untuk pencarian ini.</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    html += '<div class="asbab-card">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">' +
        '<span class="asbab-badge">QS. ' + item.namaSurat + ' (Surat ' + item.surat + '): Ayat ' + item.ayat + '</span>' +
        '<div style="display:flex; gap:6px;">' +
          '<button class="ayat-action-btn" onclick="lompatKeAyatDariAsbab(' + item.surat + ',' + (typeof item.ayat === 'number' ? item.ayat : item.ayat.split('-')[0]) + ')">📜 Buka Ayat</button>' +
          '<button class="ayat-action-btn" onclick="bukaTafsirDariAyat(' + item.surat + ',' + (typeof item.ayat === 'number' ? item.ayat : item.ayat.split('-')[0]) + ')">📚 Tafsir</button>' +
        '</div>' +
      '</div>' +
      '<h4 class="asbab-title">' + escHtml(item.judul) + '</h4>' +
      '<div style="font-size:11.5px;color:#9a3412;margin-bottom:8px;"><b>Sumber Sanad:</b> ' + escHtml(item.riwayat) + '</div>' +
      '<div class="asbab-riwayat-box">' +
        '<b>Peristiwa & Sebab Turunnya:</b><br>' +
        nl2br(item.peristiwa) +
      '</div>' +
      '<div class="asbab-hikmah-box">' +
        '<b>💡 Kandungan Hukum & Pelajaran:</b><br>' +
        nl2br(item.hikmah) +
      '</div>' +
    '</div>';
  }

  container.innerHTML = html;
  container.scrollTop = 0;
}

function lompatKeAyatDariAsbab(nomorSurat, nomorAyat) {
  setModeQuran('ayat');
  bacaSuratQuran(nomorSurat, nomorAyat);
}

function nl2br(str) {
  if (!str) return '';
  return String(str).replace(/\n/g, '<br>');
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
