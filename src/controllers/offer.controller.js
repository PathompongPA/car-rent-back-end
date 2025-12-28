const services = require("../services")

const offer = {
    Create: async function (req, res) {
        try {
            res.success(await services.offer.create(req))
        } catch (error) {
            res.fail(error)
        }
    },
    Read: async function (req, res) {
        try {
            res.success(await services.offer.read(req))
        } catch (error) {
            res.fail(error)
        }
    },
    Update: async function (req, res) {
        try {
            res.success(await services.offer.update(req))
        } catch (error) {
            res.fail(error)
        }
    },
    Delete: async function (req, res) {
        try {
            res.success(await services.offer.delete(req))
        } catch (error) {
            res.fail(error)
        }
    },
}

module.exports = offer
