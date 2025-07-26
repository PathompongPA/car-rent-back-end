
const middleware = require('../middlewares');
const controller = require('../controllers');

const user = require('express').Router()

    .get(
        "/",
        controller.user.Read
    )

    .post(
        "/login",
        controller.user.Login
    )

    .put(
        "/",
        controller.user.Update
    )

    .delete("/",
        controller.user.Delete
    )

module.exports = user
