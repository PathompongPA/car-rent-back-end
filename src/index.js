const { app } = require("./app");
const { initSql, sequelize } = require("./model");
require('dotenv').config()

let app_port = process.env.APP_PORT
app.listen(app_port, async () => {
    try {
        initSql.connect()
        await sequelize.sync()
        console.log("port is : ", app_port);
    } catch (error) {
        console.log(error);
    }
})