
const controller = require('../controllers');
const middleware = require('../middlewares');

const content = require('express').Router()
    .get(
        "/",
        controller.content.Read
    )
    .post(
        "/",
        middleware.fileUpload.fields([
            { name: "viewBoard", },
            { name: "logo", },
        ]),
        controller.content.Create
    )
    .put(
        "/",
        controller.content.Update
    )
    .delete(
        "/",
        controller.content.Delete
    )

module.exports = content

