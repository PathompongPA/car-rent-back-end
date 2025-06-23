@echo off
cls

set /P db_port=Enter db port : 
set /P pma_port=Enter php my admin port : 
set /P app_port=Enter App post : 
cls

set /P mysql_password=Enter mysql password : 
set /P db_name=Enter database name : 

echo DB_PORT=%db_port%> .env
echo PMA_PORT=%pma_port%>> .env
echo APP_PORT=%app_port%>> .env
echo DB_USER=root>> .env
echo DB_PASSWORD=%mysql_password%>> .env
echo DB_NAME=%db_name%>> .env
echo DB_HOST_NAME_DEV=localhost>> .env
echo DB_HOST_NAME_PRODUCTION=db-booking-db-1>> .env

call cd src
echo DB_PORT=%db_port%> .env
echo PMA_PORT=%pma_port%>> .env
echo APP_PORT=%app_port%>> .env
echo DB_USER=root>> .env
echo DB_PASSWORD=%mysql_password%>> .env
echo DB_NAME=%db_name%>> .env
echo DB_HOST_NAME_DEV=localhost>> .env
echo DB_HOST_NAME_PRODUCTION=db-booking-db-1>> .env
call cd ..

echo create .env successfully.