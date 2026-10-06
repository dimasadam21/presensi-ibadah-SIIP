@echo off
chcp 65001 >nul
title Quick Push Git - Presensi Ibadah
cd /d "%~dp0"

echo ==============================================================================
echo    QUICK PUSH GIT - PRESENSI IBADAH KOMPLIT
echo ==============================================================================
echo.
set /p PESAN="Masukkan pesan revisi/commit (kosongkan untuk otomatis tanggal jam): "

if "%PESAN%"=="" (
    for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
    set TGL=%dt:~6,2%/%dt:~4,2%/%dt:~0,4% %dt:~8,2%:%dt:~10,2%:%dt:~12,2%
    set PESAN=Update dan revisi sistem: %TGL%
)

echo.
echo [1/3] Menambahkan file yang berubah (git add .)...
git add .

echo.
echo [2/3] Membuat commit...
git commit -m "%PESAN%"

echo.
echo [3/3] Melakukan push ke GitHub (git push origin main)...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo [SUKSES] Seluruh perubahan berhasil di-push ke GitHub!
    echo ==============================================================================
) else (
    echo.
    echo [GAGAL] Terjadi kesalahan saat melakukan push. Periksa koneksi internet Anda.
)

echo.
pause
