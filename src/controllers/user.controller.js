
const services = require("../services");
const jwt = require('jsonwebtoken');

const user = {

    Login: async (req, res) => {
        try {
            res.success(await services.user.login(req, res))
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

