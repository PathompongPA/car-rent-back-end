
const services = require("../services");

const booking = {

    Create: async (req, res) => {
        try {
            res.success(await services.booking.create(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Read: async (req, res) => {
        try {
            res.success(await services.booking.read(req))
        } catch (error) {
            res.fail(error.message)
        }

    },

    Update: async (req, res) => {
        try {
            res.success(await services.booking.update(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async (req, res) => {
        try {
            res.success(await services.booking.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    },
}

module.exports = booking

