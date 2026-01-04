call docker desktop start
call docker compose down  -v
call docker compose -f compose.dev.yaml up -d --build 
call cd src/www/car-rent-front-end
call git pull
@REM call cd ../../..
@REM call cd nginx-1.29.2
@REM call start nginx
@REM call cd ..
