
const middleware = require('../middlewares');
const controller = require('../controllers');

const user = require('express').Router()

    .get(
        "/",
        controller.user.Read
    )

    .post(
        "/",
        middleware.verifyUser,
        controller.user.Create
    )

    .put(
        "/",
        controller.user.Update
    )

    .delete("/",
        controller.user.Delete
    )

module.exports = user
