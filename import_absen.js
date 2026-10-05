const fs = require('fs');
const path = require('path');

// Skrip Node.js otomatis untuk mengimpor seluruh data dari db_presensi ibadah.xlsx ke Supabase
const SUPABASE_URL = 'https://pkjnbuzfknbcakmtfkif.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBram5idXpma25iY2FrbXRma2lmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTE4Mjk5MCwiZXhwIjoyMTA2NzU4OTkwfQ.8hA0mhkYjf_jt1N_ICCFES5dS31TUWJ5raC_xYw4yTY';

let XLSX;
try {
  XLSX = require('xlsx');
} catch (e) {
  XLSX = require('C:/Users/admin/.gemini/antigravity-ide/brain/c0a9ef01-f7a6-42af-939e-e2f11b630030/scratch/node_modules/xlsx');
}

const excelPath = path.join(__dirname, 'db_presensi ibadah.xlsx');
console.log('Membaca:', excelPath);
const wb = XLSX.readFile(excelPath);

function parseDate(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') {
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    return d.toISOString().split('T')[0];
  }
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const p = s.split('/');
    return p[2] + '-' + p[1].padStart(2, '0') + '-' + p[0].padStart(2, '0');
  }
  return s;
}

function parseTime(v) {
  if (v == null || v === '') return '00:00:00';
  if (typeof v === 'number') {
    const totalSeconds = Math.round(v * 86400);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }
  const s = String(v).trim();
  const parts = s.split(':').map(p => p.padStart(2, '0'));
  if (parts.length === 2) parts.push('00');
  return parts.slice(0, 3).join(':');
}

function parseCoord(val, mapsLink, isLng) {
  if (mapsLink && typeof mapsLink === 'string') {
    const m = mapsLink.match(/q=([-\d\.]+),([-\d\.]+)/);
    if (m) return parseFloat(isLng ? m[2] : m[1]);
  }
  if (val == null || val === '') return null;
  let num = parseFloat(val);
  if (isNaN(num)) return null;
  const max = isLng ? 180 : 90;
  while (Math.abs(num) > max) {
    num /= 10;
  }
  return parseFloat(num.toFixed(7));
}

async function runImport() {
  const aRows = XLSX.utils.sheet_to_json(wb.Sheets['AbsenSholat']);
  console.log('Total Absen di Excel:', aRows.length);

  const formatted = aRows.map(r => ({
    absen_id: String(r.AbsenID || ('ABS_' + r.NIS + '_' + Math.random())),
    nis: String(r.NIS).trim(),
    nama: String(r.Nama || '-').trim(),
    kelas: String(r.Kelas || '-').trim(),
    jk: (String(r.JK || 'L').toUpperCase().startsWith('P')) ? 'P' : 'L',
    tanggal: parseDate(r.Tanggal),
    sholat: String(r.Sholat || 'Dzuhur').trim(),
    jam: parseTime(r.Jam),
    status: String(r.Status || 'Hadir').trim(),
    keterangan: String(r.Keterangan || '').trim(),
    latitude: parseCoord(r.Latitude, r.MapsLink, false),
    longitude: parseCoord(r.Longitude, r.MapsLink, true),
    jarak: (r.Jarak != null && !isNaN(r.Jarak)) ? parseFloat(parseFloat(r.Jarak).toFixed(1)) : null,
    maps_link: String(r.MapsLink || '').trim(),
    foto_url: String(r.FotoUrl || '').trim()
  }));

  const batchSize = 100;
  let inserted = 0;
  for (let i = 0; i < formatted.length; i += batchSize) {
    const batch = formatted.slice(i, i + batchSize);
    const res = await fetch(SUPABASE_URL + '/rest/v1/absen_sholat', {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(batch)
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Gagal pada batch ' + i + ':', err);
      if (err.includes('22P02')) {
        console.log('\n⚠️ PERHATIAN: Jalankan perintah ini di SQL Editor Supabase terlebih dahulu:\nALTER TABLE public.absen_sholat ALTER COLUMN absen_id TYPE VARCHAR(100);\n');
      }
      return;
    }
    inserted += batch.length;
    process.stdout.write('\rBerhasil mengimpor: ' + inserted + ' / ' + formatted.length + ' data absen...');
  }
  console.log('\n✅ Seluruh ' + inserted + ' riwayat absen sholat berhasil masuk ke Supabase!');
}

runImport().catch(console.error);
