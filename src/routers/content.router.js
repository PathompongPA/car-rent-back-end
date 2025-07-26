
const controller = require('../controllers');
const middleware = require('../middlewares');

const content = require('express').Router()
    .get(
        "/",
        controller.content.Read
    )
    .post(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "viewBoard", },
            { name: "logo", },
        ]),
        controller.content.Create
    )
    .put(
        "/",
        middleware.verifyUser,
        controller.content.Update
    )
    .delete(
        "/",
        middleware.verifyUser,
        controller.content.Delete
    )

module.exports = content

