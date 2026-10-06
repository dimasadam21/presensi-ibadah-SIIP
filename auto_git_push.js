/**
 * ==============================================================================
 * AUTO GIT PUSH WATCHER - PRESENSI IBADAH KOMPLIT
 * ==============================================================================
 * Skrip ini memantau perubahan berkas secara realtime di dalam folder ini.
 * Setiap kali Anda melakukan revisi, penambahan, atau pengeditan:
 * skrip akan otomatis melakukan:
 * 1. git add .
 * 2. git commit -m "Auto-update: [tanggal jam] - [daftar file]"
 * 3. git push origin main
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = process.cwd();
const DEBOUNCE_MS = 4000; // Tunggu 4 detik setelah selesai mengetik/save sebelum push
const POLL_INTERVAL_MS = 10000; // Pemeriksaan berkala tiap 10 detik

let debounceTimer = null;
let isPushing = false;

function getWaktuSekarang() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const tgl = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const jam = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return `${tgl} ${jam}`;
}

function cekPerubahanGit() {
  try {
    const status = execSync('git status --porcelain', { cwd: PROJECT_DIR, encoding: 'utf8' }).trim();
    return status;
  } catch (err) {
    return '';
  }
}

function jalankanGitAutoPush() {
  if (isPushing) return;
  isPushing = true;

  try {
    const status = cekPerubahanGit();
    if (!status) {
      isPushing = false;
      return;
    }

    const lines = status.split('\n').filter(Boolean);
    const fileList = lines.map(line => line.trim().slice(3)).slice(0, 4).join(', ');
    const sisa = lines.length > 4 ? ` (+${lines.length - 4} file lainnya)` : '';
    const pesanCommit = `Auto-update: ${getWaktuSekarang()} - ${fileList}${sisa}`;

    console.log(`\n[${getWaktuSekarang()}] 🔍 Terdeteksi ${lines.length} perubahan berkas:`);
    lines.forEach(l => console.log(`   ${l}`));

    console.log(`[${getWaktuSekarang()}] 📦 Menjalankan 'git add .' ...`);
    execSync('git add .', { cwd: PROJECT_DIR, stdio: 'inherit' });

    console.log(`[${getWaktuSekarang()}] 📝 Melakukan commit: "${pesanCommit}" ...`);
    execSync(`git commit -m "${pesanCommit}"`, { cwd: PROJECT_DIR, stdio: 'inherit' });

    console.log(`[${getWaktuSekarang()}] 🚀 Mengunggah (git push origin main) ...`);
    execSync('git push origin main', { cwd: PROJECT_DIR, stdio: 'inherit' });

    console.log(`[${getWaktuSekarang()}] ✅ SUKSES! Seluruh perubahan berhasil di-push ke GitHub.\n`);
  } catch (err) {
    console.error(`[${getWaktuSekarang()}] ⚠️ Gagal auto-push:`, err.message || err);
  } finally {
    isPushing = false;
  }
}

function jadwalkanPush() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    jalankanGitAutoPush();
  }, DEBOUNCE_MS);
}

// Mulai Pemantauan Folder
console.log('==============================================================================');
console.log('         AUTO GIT PUSH AKTIF - PRESENSI IBADAH KOMPLIT (KLONING)              ');
console.log('==============================================================================');
console.log(`📁 Lokasi Folder : ${PROJECT_DIR}`);
console.log(`🕒 Waktu Mulai   : ${getWaktuSekarang()}`);
console.log('👀 Memantau perubahan file secara realtime...');
console.log('💡 Setiap kali ada file yang di-save/diubah, git push akan otomatis berjalan.');
console.log('Tekan Ctrl + C untuk menghentikan pemantau.');
console.log('==============================================================================\n');

// 1. Cek langsung saat skrip pertama kali dijalankan
if (cekPerubahanGit()) {
  console.log('⚠️ Terdeteksi perubahan yang belum di-push saat mulai. Memproses...');
  jalankanGitAutoPush();
}

// 2. File System Watcher
try {
  fs.watch(PROJECT_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    // Abaikan berkas internal .git dan .env
    if (filename.includes('.git') || filename.startsWith('.env') || filename.includes('node_modules')) {
      return;
    }
    jadwalkanPush();
  });
} catch (e) {
  console.warn('fs.watch recursive tidak didukung penuh, mengandalkan polling berkala.');
}

// 3. Fallback Polling Tiap 10 Detik
setInterval(() => {
  if (!isPushing && cekPerubahanGit()) {
    jadwalkanPush();
  }
}, POLL_INTERVAL_MS);
