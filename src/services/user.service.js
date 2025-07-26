const bcrypt = require('bcrypt');
const model = require('../model');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validationPassword(hashPassword, password) {
    return await bcrypt.compare(password, hashPassword)
}

const user = {
    login: async (req) => {
        console.log("body : ", req.body)
        return
        // const { password } = req.body;
        // let userInDb = await model.USER.findOne({ where: { userName: "admin" } })
        // return { isLogin: await validationPassword(userInDb.password, password), id: userInDb.id }
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

