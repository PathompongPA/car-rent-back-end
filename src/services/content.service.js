const model = require("../model")
const utility = require("../utility")
const dayjs = require('dayjs');
const customer = require("./customer.service");

const content = {

    create: async (req) => {
        let data = JSON.parse(req.body.data)
        // console.log(req.files)
        let { logo, viewBoard } = { ...req.files }
        let newData = [...data]
        console.log(viewBoard)

        let fileNameLogo = await utility.file.genFileName(logo)
        utility.file.saveFile(fileNameLogo, logo)

        let fileNameViewBoard = await utility.file.genFileName(viewBoard)
        utility.file.saveFile(fileNameViewBoard, viewBoard)

        if (logo !== undefined) {
            newData[5].value.image = fileNameLogo[0]
        } else {
            newData[5].value.image = newData[5].value.image.split("/").at(-1)
        }
        if (viewBoard !== undefined) {
            newData[9].value = newData[9]?.value.map(item => { return item.split("/").at(-1) })
            newData[9].value = data[9].value.concat(fileNameViewBoard)
        } else {
            newData[9].value = newData[9].value.map(item => { return item.split("/").at(-1) })
            console.log(newData[9].value)
        }
        await Promise.all(
            newData.map((item) => {
                model.CONTENT.update(
                    { value: item.value },
                    { where: { id: item.id } }
                )
            })
        )

    },
    read: async (req) => {
        const baseUrl = `http://${process.env.SERVER_IP}:9999/uploads/`;
        return await model.CONTENT.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, }).then((item) => {
            let res = [...item]
            if (res[9].length > 0 & res[5].length > 0) {
                res[5].value.image = baseUrl + res[5].value.image
                res[9].value.map((viewBoard, indexViewBoard) => { res[9].value[indexViewBoard] = baseUrl + viewBoard })
            }
            return res
        })
    },

    update: async (req) => {
    },

    delete: async (req) => {
    }
}

module.exports = content
