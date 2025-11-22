call docker desktop start
call docker compose   down 
call docker compose -f compose.dev.yaml up -d --build 
call cd src/www/car-rent-front-end
call git pull
call cd ../../..
call cd nginx-1.29.2
call start nginx
call cd ..
