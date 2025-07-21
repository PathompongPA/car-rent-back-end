require('dotenv').config()
const dayjs = require('dayjs');
const { app } = require("./app");
const model = require("./model");

let app_port = process.env.APP_PORT || 3000
app.listen(app_port, async () => {
    try {
        model.initSql.connect()
        await model.sequelize.sync()
        console.log(`${dayjs()} : [Server] Server started ... `)
        console.log(`${dayjs()} : [Server] Server On Port \x1b[36m ${app_port} \x1b[0m `);
        const amountContent = await model.CONTENT.count()
        if (amountContent === 0) {
            await model.CONTENT.bulkCreate([
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
            console.log(`${dayjs()} : [Model Content] json content in db \x1b[32 created`)
        } else {
            console.log(`${dayjs()} : [Model Content] Table has json content in db, \x1b[33mSkipping\x1b[0m`)
        }
    } catch (error) {
        console.log("\x1b[31" + error);
    }
})