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
            res.fail(error)
        }
    },

    addImage: async function (req, res) {
        try {
            res.success(await services.car.addImage(req))
        } catch (error) {
            res.fail(error)
        }

    },
    addThumbnail: async function (req, res) {
        try {
            res.success(await services.car.addThumbnail(req))
        } catch (error) {
            res.fail(error)
        }

    },
    Update: async function (req, res) {
        try {
            res.success(await services.car.update(req))
        } catch (error) {
            res.fail(error)
        }
    },

    UpdateIndex: async function (req, res) {
        try {
            res.success(await services.car.updateIndex(req))
        } catch (error) {
            res.fail(error)
        }
    },

    Hide: async function (req, res) {
        try {
            res.success(await services.car.Hide(req))
        } catch (error) {
            res.fail(error)
        }
    },

    Delete: async function (req, res) {
        try {
            res.success(await services.car.delete(req))
        } catch (error) {
            res.fail(error)
        }
    },
    DeleteImage: async function (req, res) {
        try {
            res.success(await services.car.deleteImage(req))
        } catch (error) {
            res.fail(error)
        }
    }
}

module.exports = car
