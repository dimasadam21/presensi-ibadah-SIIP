@echo off
chcp 65001 >nul
title Auto Git Push - Presensi Ibadah
cd /d "%~dp0"

echo ==============================================================================
echo    MEMULAI AUTO GIT PUSH - PRESENSI IBADAH KOMPLIT
echo ==============================================================================
echo.
echo Skrip ini akan berjalan di latar belakang terminal.
echo Setiap kali Anda menyimpan / mengedit file, perubahan akan otomatis di-push!
echo.
node auto_git_push.js
pause
