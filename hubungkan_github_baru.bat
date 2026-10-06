@echo off
chcp 65001 >nul
echo ==============================================================================
echo    SCRIPT PENGHUBUNG REPOSITORI GITHUB BARU - PRESENSI IBADAH KLONING
echo ==============================================================================
echo.
echo Pastikan Anda telah membuat repositori baru di GitHub (misal: Presensi-Ibadah-Kloning).
echo.
set /p REPO_URL="Masukkan URL Repositori GitHub Baru (contoh: https://github.com/dimasadam21/Presensi-Ibadah-Kloning.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] URL Repositori tidak boleh kosong!
    pause
    exit /b
)

echo.
echo [1/5] Menyiapkan Git Staging...
git add .

echo.
echo [2/5] Melakukan Commit Awal...
git commit -m "Initial commit aplikasi Presensi Ibadah Kloning"

echo.
echo [3/5] Menghubungkan remote origin baru...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [4/5] Mengatur branch main...
git branch -M main

echo.
echo [5/5] Mengunggah (Push) ke GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo [SUKSES] Repositori baru berhasil diunggah ke GitHub!
    echo Sekarang Anda dapat mengimpor repositori ini ke Vercel untuk deployment.
    echo ==============================================================================
) else (
    echo.
    echo [PERHATIAN] Terjadi kendala saat push. Pastikan koneksi internet aktif
    echo dan Anda memiliki akses tulis ke repositori GitHub tersebut.
)

echo.
pause
