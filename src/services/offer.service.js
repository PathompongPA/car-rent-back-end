const model = require("../model")

let offer = {
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @returns 
     */
    read: async (req, res) => {
        const { carId } = req.query;
        if (carId) return await model.OFFER.findAndCountAll({ where: { carId } })
        return await model.OFFER.findAndCountAll()

    },
    create: async (req, res) => {
        const { carId, offerPrice, offerAmountDay } = req.body;
        if (carId) throw new Error("ไม่พบ carId.")
        return await model.OFFER.create({ carId, offerPrice, offerAmountDay })
    },
    update: async (req, res) => {
        const { id, offerPrice, offerAmountDay, carId } = req.body;
        if (id) throw new Error("ไม่พบ offer id.")
        return await model.OFFER.update({ carId, offerPrice, offerAmountDay }, { where: { id } })
    },
    delete: async (req, res) => {
        const { id } = req.body;
        await model.OFFER.destroy({ where: { id } })
    }
}

module.exports = offer