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
            let response = { isLogin: false, msg: "login fail, user or password wrong" }
            let userInDb = await model.USER.findOne({ where: { userName: "admin" } })
            let isPasswordValid = await validationPassword(userInDb.password, password)
            if (isPasswordValid) {
                res.cookie(
                    "token",
                    jwt.sign(userInDb.id, process.env.SECRET),
                    {
                        sameSite: 'lax',
                        maxAge: 1000 * 60 * 60 * 4,
                    }
                )
                response.msg = "login success"
                response.isLogin = true
            }
            return response
        },

    create: async (req) => {
        console.log(req.body.password)
        req.body.password = await hashPassword(req.body.password)
        return await model.USER.create(req.body)
    },
    read: async (req) => {
    },

    update: async (req) => {
    },

    delete: async (req) => {
    }
}

module.exports = user

