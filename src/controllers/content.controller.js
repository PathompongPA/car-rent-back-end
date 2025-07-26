
const services = require("../services");

const content = {

    Create: async (req, res) => {
        try {
            res.success(await services.content.create(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Read: async (req, res) => {
        try {
            res.success(await services.content.read(req))
        } catch (error) {
            res.fail(error.message)
        }

    },

    Update: async (req, res) => {
        try {
            res.success(await services.content.update(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async (req, res) => {
        try {
            res.success(await services.content.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    },
}

module.exports = content

