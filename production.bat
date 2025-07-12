@REM call createEnv
call docker desktop start
call docker compose down 
call docker compose up -d --build 