require('dotenv').config()
const { app } = require("./app");
const model = require("./model");

let app_port = process.env.APP_PORT
app.listen(app_port, async () => {
    try {
        model.initSql.connect()
        await model.sequelize.sync()
        console.log("port is : ", app_port);
    } catch (error) {
        console.log(error);
    }
})