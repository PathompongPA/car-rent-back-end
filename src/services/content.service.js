require('dotenv');
const model = require("../model")
const utility = require("../utility")

function removeBaseUrlFrom(url) {
    return url.split("/").at(-1)
}

const content = {

    create: async (req) => {
        let data = JSON.parse(req.body.data)
        let { logo, viewBoard } = { ...req.files }
        let fileNameLogo = await utility.file.genFileName(logo); utility.file.saveFile(fileNameLogo, logo)
        let fileNameViewBoard = await utility.file.genFileName(viewBoard); utility.file.saveFile(fileNameViewBoard, viewBoard)
        let newData = [...data].map(({ id, value }) => {
            if (id === "logo") value = !logo ? removeBaseUrlFrom(value) : fileNameLogo
            if (id === "viewBoard.image") value = value.map((image) => removeBaseUrlFrom(image))
            if (id === "viewBoard.image" && viewBoard) value = value.concat(fileNameViewBoard)
            return { id, value }
        })
        await Promise.all(newData.map((item) => { model.CONTENT.upsert(item) }))
        return { msg: "create success." }

    },
    read: async (req) => {
        let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
        const baseUrl = `${protocol}://${req.hostname}/uploads/`;
        return await model.CONTENT.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).then((item) => {
            let res = [...JSON.parse(JSON.stringify(item))].map(({ id, value }) => {
                if (id === "viewBoard.image") value = value.map((image) => baseUrl + image)
                if (id === "logo") value = baseUrl + value;
                return { id, value }
            });
            return res;
        })
    },

    update: async (req) => {
    },

    delete: async (req) => {
    }
}

module.exports = content
