@echo off

echo : Checking for Internet Connection
ping www.google.nl -n 1 -w 1000 >NUL
if errorlevel 1 goto noInternetConnection

echo : Checking for Node installation
:: Check for Node Installation
node -v 2>NUL
if errorlevel 1 goto errorNoNode
echo : Node Installed, installing dependencies
goto:checkReact

:errorNoNode
echo : Node not installed, please complete installation before continuing
node-v20.13.1-x64.msi
pause

:checkReact
echo : installing react-charts
CALL npm install react-chartjs-2 --save >NUL
echo : installed react-charts
echo : installing react-scripts
CALL npm install react-scripts --save >NUL
echo : installed react-scripts

echo : Checking for Python installation
:: Check for Python Installation
python --version 2>NUL
if errorlevel 1 goto errorNoPython
echo : Python Installed, installing dependencies
goto:installPythonDependencies

:errorNoPython
echo.
echo : Python not installed, please complete installation before continuing
python-3.12.3-amd64.exe
pause

:installPythonDependencies
python -m pip install Flask >NUL
python -m pip install flask-cors >NUL
python -m pip install Pillow >NUL
echo : Python dependencies installed, starting Flask Server
goto startFlaskServer

:noInternetConnection
echo : No Internet Connection, Cannot Verify Dependencies
echo : Attempting to Start Servers
echo : If Servers do not start, connect to Internet and try again
echo : If issues arise, connect to internet and re-run script to verify dependencies

:startFlaskServer
cd .\src\components\
start flaskServer.bat
if errorlevel 1 goto startReactServer
echo : Flask Server started,

:startReactServer
echo : Starting React Server
start reactServer.bat
if errorlevel 1 goto endProcess
echo : React Server Started

echo : All processes started, enjoy!
:endProcess
timeout /t 10 >NUL