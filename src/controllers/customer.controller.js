const services = require("../services")

const customer = {
    Create: async (req, res) => {
        try {
            res.success(await services.customer.create(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Read: async (req, res) => {
        try {
            res.success(await services.customer.read(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Update: async (req, res) => {
        try {
            res.success(await services.customer.update(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async (req, res) => {
        try {
            res.success(await services.customer.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    }

}

module.exports = customer
