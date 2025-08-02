const { Sequelize } = require("sequelize")
const mysql = require('mysql2');
require('dotenv').config()

let dbUser = process.env.DB_USER || "kiatpaisan"
let dbPassword = process.env.DB_PASSWORD || "admin123456"
let hostName = process.env.DB_HOST_NAME_DEV || "localhost"
let dbName = process.env.DB_NAME || "demo"
let dbPort = process.env.DB_PORT || 3306

// console.log("mod :  ", process.env.MODE);
// if (process.env.MODE === "production") {
//     hostName = 'localhost'
//     dbName = process.env.DB_NAME
//     dbPort = dbPort
// }

// const initSql = mysql.createConnection(
//     {
//         host: hostName,
//         port: dbPort,
//         user: dbUser,
//         password: dbPassword,
//     }
// )

const sequelize = new Sequelize(
    dbName, dbUser, dbPassword,
    {
        host: hostName,
        port: dbPort,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 2,
            acquire: 60000, // 60 วินาที
            idle: 30000     // 30 วินาที
        },
        logging: false
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
    // initSql,
    dropDatabase,
    createDatabase
}