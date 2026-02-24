require('dotenv').config()
const dayjs = require('dayjs');
const { app } = require("./app");
const model = require("./model");

let app_port = process.env.APP_PORT || 3000
app.listen(app_port, async () => {
    try {
        // model.initSql.connect()
        await model.sequelize.sync()
        console.log(`${dayjs()} : [Server] Server started ... `)
        console.log(`${dayjs()} : [Server] Server On Port \x1b[36m ${app_port} \x1b[0m `);
    } catch (error) {
        console.log("\x1b[31" + error);
    }
})