#!/bin/bash
# ล้างหน้าจอ
clear

# ดึง IP address ที่ขึ้นต้นด้วย 192.168.
IP=$(ip addr show | grep "inet " | grep "192\.168\." | awk '{print $2}' | cut -d'/' -f1 | head -n 1)

echo "SERVER_IP=$IP" > .env
echo "Set .env with SERVER_IP=$IP"

# รับค่าจากผู้ใช้
read -p "Enter db port: " db_port
read -p "Enter phpMyAdmin port: " pma_port
read -p "Enter App port: " app_port

clear

read -p "Enter MySQL password: " mysql_password
read -p "Enter database name: " db_name

# เขียนค่าลงใน .env
cat <<EOF >> .env
DB_PORT=$db_port
PMA_PORT=$pma_port
APP_PORT=$app_port
DB_USER=root
DB_PASSWORD=$mysql_password
DB_NAME=$db_name
DB_HOST_NAME_DEV=localhost
DB_HOST_NAME_PRODUCTION=db-booking-db-1
EOF

# เขียนอีกชุดใน src/.env
mkdir -p src
cat <<EOF > src/.env
DB_PORT=$db_port
PMA_PORT=$pma_port
APP_PORT=$app_port
DB_USER=root
DB_PASSWORD=$mysql_password
DB_NAME=$db_name
DB_HOST_NAME_DEV=localhost
DB_HOST_NAME_PRODUCTION=db-booking-db-1
EOF

echo "✅ Created .env and src/.env successfully."
