require('dotenv');
const model = require("../model")
const utility = require("../utility")

const brand = {

    create: async (req) => {
        const files = req.files
        let body = { ...req.body }
        console.log(body)
        console.log("body : ", body)
        console.log("file : ", files)
        let filenames = await utility.file.genFileName(files)
        body.brandImg = filenames[0]

        return await model.BRAND.create(body).then((_res) => { utility.file.saveFile(filenames, files) })
    },

    read: async (req) => {
        let result = await model.BRAND.findAll({
            where: { isDelete: false },
            attributes: { exclude: ['createdAt', 'updatedAt', "isDelete"] },
            order: [["index", "ASC"]],
            include: [
                {
                    model: model.CAR,
                    where: { isDelete: false },
                    attributes: [],
                    required: true
                }
            ]
        })
            .then((res) => {
                return res.map(
                    (item) => {
                        let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
                        const baseUrl = `${protocol}://${req.hostname}/uploads`;
                        const data = item.toJSON()
                        return { ...data, brandImg: [`${baseUrl}/${data.brandImg}`] }
                    }
                )
            })

        return result
    },

    readAll: async (req) => {
        let result = await model.BRAND.findAll({
            include: [
                {
                    model: model.CAR,
                    required: false,
                    where: { isDelete: false },
                    attributes: ["id"]
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', "isDelete"] },
            order: [["index", "ASC"]],
        })
            .then((res) => {
                return res.map(
                    (item) => {
                        let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
                        const baseUrl = `${protocol}://${req.hostname}/uploads`;
                        const data = item.toJSON()
                        return { ...data, brandImg: `${baseUrl}/${data.brandImg}` }
                    }
                )
            })

        return result
    },

    update: async (req) => {
        let body = { ...req.body }
        let file = req.files

        let brand = await model.BRAND.findOne(
            {
                where: { id: body.id },
                attributes: { exclude: ['createdAt', 'updatedAt', "isDelete"] }
            }
        )

        if (file.length > 0) {
            let fileName = await utility.file.genFileName(file)
            utility.file.deleteFile(brand.brandImg)
            utility.file.saveFile(fileName, file)
            body.brandImg = fileName[0]
        }

        await model.BRAND.update(
            body,
            {
                where: { id: body.id }
            }
        )
    },

    updateIndex: async (req) => {
        let body = { ...req.body.payload }
        console.log("body : ", body)
        const updatePromises = Object.values(body).map((item) => model.BRAND.update({ index: item.index }, { where: { id: item.id } }))
        await Promise.all(updatePromises)
        return { msg: "ลำดับยี่ห้อ" }
    },

    delete: async (req) => {
        return await model.BRAND.update({ isDelete: true }, { where: req.body })
        // let fileName = result.brandImg
        // utility.file.deleteFile(fileName)
        // await result.destroy()

    }
}

module.exports = brand
