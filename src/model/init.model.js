const { Sequelize } = require("sequelize")
const mysql = require('mysql2');
require('dotenv').config()

let dbUser = process.env.DB_USER
let dbPassword = process.env.DB_PASSWORD
let hostName = process.env.DB_HOST_NAME_DEV
let dbName = process.env.DB_NAME
let dbPort = process.env.DB_PORT

console.log("mod :  ", process.env.MODE);
if (process.env.MODE === "production") {
    hostName = 'db'
    // dbName = process.env.DB_NAME
    dbPort = 3306
}

const initSql = mysql.createConnection(
    {
        host: hostName,
        port: dbPort,
        user: dbUser,
        password: dbPassword,
    }
)

const sequelize = new Sequelize(
    dbName, dbUser, dbPassword,
    {
        host: hostName,
        port: dbPort,
        dialect: "mysql",
        host: hostName,
        port: dbPort,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 2,
            acquire: 60000, // 60 วินาที
            idle: 30000     // 30 วินาที
        },
    },
)

async function dropDatabase() {
    try {
        await sequelize.getQueryInterface().dropAllTables();
        console.log('All tables dropped.');
        await sequelize.close();
    } catch (error) {
        console.error('Error dropping database:', error);
    }
}

async function createDatabase() {
    try {
        await sequelize.query(`CREATE DATABASE ${dbName};`);
        console.log(`Database ${dbName} created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await sequelize.close();
    }
}


module.exports = {
    sequelize,
    initSql,
    dropDatabase,
    createDatabase
}