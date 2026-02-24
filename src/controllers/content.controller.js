
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
        // try {
        res.success(await services.content.read(req))
        // } catch (error) {
        //     res.fail(error.message)
        // }

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
    // logo: {
    //     update: async (req, res) => {
    //         try {
    //             res.success(await services.content.logo.update(req))
    //         } catch (error) {
    //             res.fail(error.message)
    //         }
    //     },
    //     delete: async (req, res) => {
    //         try {
    //             res.success(await services.content.logo.delete(req))
    //         } catch (error) {
    //             res.fail(error.message)
    //         }
    //     }
    // },
    viewBoard: {
        read: async (req, res) => {
            try {
                res.success(await services.content.viewBoard.read(req))
            } catch (error) {
                res.fail(error.message)
            }
        },
        update: async (req, res) => {
            try {
                res.success(await services.content.viewBoard.update(req))
            } catch (error) {
                res.fail(error.message)
            }
        },
        delete: async (req, res) => {
            try {
                res.success(await services.content.viewBoard.delete(req))
            } catch (error) {
                res.fail(error.message)
            }
        }
    },
    logo: {
        read: async (req, res) => {
            try {
                res.success(await services.content.logo.read(req))
            } catch (error) {
                res.fail(error.message)
            }
        },
        update: async (req, res) => {
            try {
                res.success(await services.content.logo.update(req))
            } catch (error) {
                res.fail(error.message)
            }
        },
        delete: async (req, res) => {
            try {
                res.success(await services.content.viewBoard.delete(req))
            } catch (error) {
                res.fail(error.message)
            }
        }
    }
}

module.exports = content

