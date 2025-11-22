const services = require("../services")


const car = {
    Create: async function (req, res) {
        try {
            res.success(await services.car.create(req))
        } catch (error) {
            console.log(error)
            res.fail(error.message)
        }
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {*} res 
     */
    Read: async function (req, res) {
        try {
            res.success(await services.car.read(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Update: async function (req, res) {
        try {
            res.success(await services.car.update(req))
        } catch (error) {
            res.fail(error.name)
        }
    },

    UpdateIndex: async function (req, res) {
        try {
            res.success(await services.car.updateIndex(req))
        } catch (error) {
            res.fail(error.name)
        }
    },

    Hide: async function (req, res) {
        try {
            res.success(await services.car.Hide(req))
        } catch (error) {
            res.fail(error.message)
        }
    },

    Delete: async function (req, res) {
        try {
            res.success(await services.car.delete(req))
        } catch (error) {
            res.fail(error.message)
        }
    }
}

module.exports = car
