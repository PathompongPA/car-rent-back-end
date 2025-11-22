const services = require("../services");

const brand = {

    Create: async (req, res) => {
        try {
            res.success(await services.brand.create(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    ReadAll: async (req, res) => {
        try {
            res.success(await services.brand.readAll(req))
        } catch (error) {
            res.fail(error.message)
        }

    },

    Read: async (req, res) => {
        try {
            res.success(await services.brand.read(req))
        } catch (error) {
            res.fail(error.message)
        }

    },

    Update: async (req, res) => {
        try {
            res.success(await services.brand.update(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    UpdateIndex: async (req, res) => {
        try {
            res.success(await services.brand.updateIndex(req, res))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async (req, res) => {
        try {
            res.success(await services.brand.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    },
}

module.exports = brand

