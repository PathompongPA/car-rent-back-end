const model = require("../model")
const utility = require("../utility")

const brand = {

    create: async (req) => {
        const files = req.files

        let body = { ...req.body }
        let filenames = await utility.file.genFileName(files)
        body.brandImg = filenames[0]

        return await model.BRAND.create(body).then((_res) => { utility.file.saveFile(filenames, files) })
    },

    read: async (req) => {
        let result = await model.BRAND.findAll({
            where: { isDelete: false },
            attributes: { exclude: ['createdAt', 'updatedAt', "isDelete"] },
            order: [["brandName", "ASC"]]
        })
            .then((res) => {
                return res.map(genUrlImage)
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

    delete: async (req) => {
        console.log(req.body)
        const result = await model.BRAND.findOne({ where: req.body })
        let fileName = result.brandImg
        utility.file.deleteFile(fileName)
        await result.destroy()

    }
}

module.exports = brand

function genUrlImage(item) {
    const baseUrl = `http://${process.env.SERVER_IP}:9999/uploads`;
    const data = item.toJSON()
    return { ...data, brandImg: [`${baseUrl}/${data.brandImg}`] }
}