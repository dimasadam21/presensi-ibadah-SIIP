@echo off
chcp 65001 >nul
echo ==============================================================================
echo    MENGHENTIKAN AUTO GIT PUSH
echo ==============================================================================
echo.
echo Mencari proses auto_git_push.js...
wmic process where "caption='node.exe' and commandline like '%auto_git_push.js%'" delete >nul 2>&1
echo.
echo [SUKSES] Layanan Auto Git Push berhasil dihentikan.
echo.
pause
