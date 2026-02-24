require('dotenv');
const { where } = require('sequelize');
const model = require("../model");
const { genFileName, saveFile, deleteFile } = require('../utility/saveFile');


const content = {
    create: async (req) => {
        await model.CONTENT.upsert({ id: "content", value: req.body.data })
        return { msg: "create success." }

    },
    read: async () => {
        return await model.CONTENT.findOne(
            {
                where: { id: "content" },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }).then(res => {
                return res === null ? {} : res
            })
    },

    update: async (req) => {
    },

    delete: async (req) => {
    },
    logo: {
        read: async (req) => {
            let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
            const baseUrl = `${protocol}://${req.hostname}/uploads/`;
            return await model.CONTENT.findAll({
                where: { value: "logo" },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', "value"]
                }
            }).then((item) => {
                return {
                    "logo": item.map(item => baseUrl + item.id)[0]
                }
            })
        },
        update: async (req) => {
            let files = { ...req.files }.logo
            let fileName = await genFileName(files)
            await saveFile(fileName, files)
            let oldFile = await model.CONTENT.findOne({ where: { value: "logo" } })
            oldFile?.id && await deleteFile(oldFile.id) & oldFile.destroy()
            await model.CONTENT.upsert({ id: fileName[0], value: "logo" },)
            return { ...req.files }
        },
    },
    viewBoard: {
        read: async (req) => {
            let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
            const baseUrl = `${protocol}://${req.hostname}/uploads/`;
            return await model.CONTENT.findAll(
                {
                    where: { value: "viewBoard" },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', "value"]
                    }
                }).then((item) => {
                    return {
                        "viewBoard": item.map(item => baseUrl + item.id)
                    }
                })
        },
        update: async (req) => {
            let files = { ...req.files }.viewBoard
            let fileName = await genFileName(files)
            await saveFile(fileName, files)
            await model.CONTENT.create({ id: fileName[0], value: "viewBoard" })
            return { ...req.files }
        },
        delete: async (req) => {
            console.log(req.body);
            await model.CONTENT.destroy({ where: req.body }).then(async () => {
                await deleteFile(req.body.id)
            })
            return { some: req.body }
        }
    }
    // logo: {
    // }
}

module.exports = content
