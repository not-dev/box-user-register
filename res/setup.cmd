@echo off
cd %~dp0
set CONFIG_JSON=
echo *******
echo Drag ^& Drop boxAppSettings json here and press Enter
echo:
set /P CONFIG_JSON=
echo:
echo *******
echo:
copy %CONFIG_JSON% box-user-register-1.0.0\\resources\\app\\src\\boxapi.json
echo:
echo Done
echo:
echo Exit Press Any Keys...
pause > nul
