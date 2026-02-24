
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
    .get("/viewBoard", controller.content.viewBoard.read)
    .post(
        "/view-board",
        middleware.verifyUser,
        middleware.fileUpload.fields([{ name: "viewBoard" },]),
        controller.content.viewBoard.update
    )
    .delete(
        "/view-board",
        middleware.verifyUser,
        controller.content.viewBoard.delete
    )
    .get(
        "/logo",
        controller.content.logo.read
    )
    .post(
        "/logo",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "logo", },
        ]),
        controller.content.logo.update
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

