require('dotenv').config()
const { app } = require("./app");
const model = require("./model");

let app_port = process.env.APP_PORT
app.listen(app_port, async () => {
    try {
        model.initSql.connect()
        await model.sequelize.sync()
        console.log("port is : ", app_port);
        const amountContetn = await model.CONTENT.count()
        if (count === 0) {
            await Role.bulkCreate([
                { "id": "contact.card", "value": [{ "list": [{ "link": "", "title": "" },], "title": "" },] },
                { "id": "contact.title", "value": [{ "text": "" }] },
                { "id": "footer.addess", "value": { "text": "" } },
                { "id": "journeyBooking.card", "value": [{ "title": "", "detail": [""] },] },
                { "id": "journeyBooking.title", "value": { "text": "" } },
                { "id": "logo", "value": { "image": "" } },
                { "id": "navbar.title", "value": [{ "link": "", "text": "" }] },
                { "id": "Qa.card", "value": [{ "answer": "", "question": "" },] },
                { "id": "Qa.title", "value": { "text": "" } },
                { "id": "viewBoard.image", "value": [] }
            ])
            console.log('create json content in db')
        } else {
            console.log('Table has json content in db, Skipping')
        }
    } catch (error) {
        console.log(error);
    }
})