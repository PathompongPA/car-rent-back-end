
const services = require("../services");

const user = {

    Create: async (req, res) => {
        try {
            res.success(await services.user.create(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Read: async (req, res) => {
        try {
            res.success(await services.user.read(req))
        } catch (error) {
            res.fail(error.message)
        }

    },

    Update: async (req, res) => {
        try {
            res.success(await services.user.update(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async (req, res) => {
        try {
            res.success(await services.user.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    },
}

module.exports = user

