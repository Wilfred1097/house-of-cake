@echo off
echo Starting build process...

:: Create necessary directories
mkdir dist 2>nul

:: Run the build
call npm run build

:: Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo Build successful
    
    :: List contents of directories
    echo Contents of current directory:
    dir
    
    echo Contents of dist directory:
    dir dist
) else (
    echo Build failed
    exit /b 1
) 