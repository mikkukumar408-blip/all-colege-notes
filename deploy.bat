@echo off
title College Notes - 1-Click Vercel Deployer
color 0B
cls

echo =======================================================
echo    COLLEGE NOTES & STUDY HUB - AUTO VERCEL DEPLOYER    
echo =======================================================
echo.

:: 1. Navigate to project root
cd /d C:\Users\bhavy\all-colege-notes

:: 2. Optional custom commit message
set /p commitMsg="Enter commit message (or press Enter for default): "
if "%commitMsg%"=="" set commitMsg=Auto-deploy update: %date% %time%

echo.
echo [1/3] Staging all modified and new files...
git add .

echo [2/3] Committing changes...
git commit -m "%commitMsg%"

echo [3/3] Pushing to GitHub (Triggering live Vercel build)...
git push origin main

echo.
if %ERRORLEVEL% equ 0 (
    color 0A
    echo =======================================================
    echo   SUCCESS: Changes pushed to GitHub!
    echo   Vercel is now building and deploying live to:
    echo   https://all-college-notes.vercel.app/
    echo =======================================================
) else (
    color 0C
    echo =======================================================
    echo   ERROR: Push failed. Check your internet or git status.
    echo =======================================================
)

echo.
pause