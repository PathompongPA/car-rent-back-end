call docker desktop start
call docker compose   down 
call docker compose -f compose.dev.yaml up -d --build 