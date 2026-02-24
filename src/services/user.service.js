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
            const { userName, password } = req.body;
            if (!userName) throw new Error("ต้องการ user")
            console.log(req.body);
            let response = { isLogin: false, msg: "login ไม่สำเร็จ <user name หรือ password ไม่ถูกต้อง>" }
            let userInDb = await model.USER.findOne({ where: { userName: userName } })
            let isPasswordValid = userInDb && await validationPassword(userInDb.password, password)
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

