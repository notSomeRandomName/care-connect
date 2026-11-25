@echo off
title CARECONNECT - Smart Hospital Management Ecosystem
cd /d "%~dp0"
echo ============================================================
echo   Starting CARECONNECT - Smart Hospital Platform
echo   URL: http://localhost:3000/
echo ============================================================
echo.
echo Opening browser...
start http://localhost:3000/
echo.
echo Starting Vite Server (Do not close this window while using the app)...
call npm.cmd run dev
pause
