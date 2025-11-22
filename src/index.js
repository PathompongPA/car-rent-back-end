require('dotenv').config()
const dayjs = require('dayjs');
const { app } = require("./app");
const model = require("./model");

let app_port = process.env.APP_PORT || 3000
app.listen(app_port, async () => {
    try {
        // model.initSql.connect()
        await model.sequelize.sync({ alter: true })
        console.log(`${dayjs()} : [Server] Server started ... `)
        console.log(`${dayjs()} : [Server] Server On Port \x1b[36m ${app_port} \x1b[0m `);
        const amountContent = await model.CONTENT.count()
        if (amountContent === 0) {
            await model.CONTENT.bulkCreate([
                {
                    "id": "contact.card",
                    "value": [
                        { "list": [{ "link": "", "title": "" },], "title": "โทรศัพท์" },
                        { "list": [{ "link": "", "title": "" },], "title": "facebook" },
                        { "list": [{ "link": "", "title": "" },], "title": "line" },
                    ]
                },
                { "id": "contact.title", "value": [{ "text": "ติดต่อเรา" }] },
                { "id": "footer.addess", "value": { "text": "" } },
                {
                    "id": "journeyBooking.card",
                    "value": [
                        { "title": "หัวข้อ 1", "detail": [""] },
                        { "title": "หัวข้อ 2", "detail": [""] },
                        { "title": "หัวข้อ 3", "detail": [""] },
                    ]
                },
                {
                    "id": "journeyBooking.title",
                    "value": { "text": "ขั้นตอนการจอง" }
                },
                {
                    "id": "logo",
                    "value": { "image": "" }
                },
                {
                    "id": "navbar.title",
                    "value": [
                        { "link": "booking", "text": "จอง" },
                        { "link": "journeyBooking", "text": "ขั้นตอนการจอง" },
                        { "link": "review", "text": "รีวิว" },
                        { "link": "contact", "text": "ติดต่อเรา" },
                        { "link": "Qa", "text": "คำถามที่พบบ่อย" },
                    ]
                },
                {
                    "id": "Qa.card", "value": [
                        { "answer": "Anser 1", "question": "Question 1" },
                        { "answer": "Anser 2", "question": "Question 2" },
                        { "answer": "Anser 3", "question": "Question 3" },
                    ]
                },
                { "id": "Qa.title", "value": { "text": "คำถามที่พบบ่อย" } },
                { "id": "viewBoard.image", "value": [] }
            ], {
                individualHooks: true

            })
            console.log(`${dayjs()} : [Model Content] json content in db \x1b[32 created`)
        } else {
            console.log(`${dayjs()} : [Model Content] Table has json content in db, \x1b[33mSkipping\x1b[0m`)
        }
    } catch (error) {
        console.log("\x1b[31" + error);
    }
})