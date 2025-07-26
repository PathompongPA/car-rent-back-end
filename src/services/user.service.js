const bcrypt = require('bcrypt');
const model = require('../model');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validationPassword(hashPassword, password) {
    return await bcrypt.compare(password, hashPassword)
}

const user = {
    login:
        async (req, res) => {
            const { password } = req.body;
            let response = { msg: "login fail, user or password wrong" }
            let userInDb = await model.USER.findOne({ where: { userName: "admin" } })
            let isPasswordValid = validationPassword(userInDb.password, password)
            if (isPasswordValid) {
                res.cookie("token", jwt.sign(userInDb.id, process.env.SECRET))
                response.msg = "login success"
            }
            return response
        },

    create: async (req) => {
    },
    read: async (req) => {
    },

    update: async (req) => {
    },

    delete: async (req) => {
    }
}

module.exports = user

