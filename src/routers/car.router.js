const middleware = require('../middlewares');
const controller = require('../controllers');

const car = require('express').Router()

    .get(
        "/",
        controller.car.Read
    )

    .post(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "carImage", },
            { name: "carThumbnail" }
        ]),
        controller.car.Create
    )
    .post(
        "/image",
        middleware.verifyUser,
        middleware.fileUpload.fields([{ name: "image", },]),
        controller.car.addImage
    )
    .post(
        "/thumbnail",
        middleware.verifyUser,
        middleware.fileUpload.fields([{ name: "thumbnail", },]),
        controller.car.addThumbnail
    )

    .post(
        "/hide",
        controller.car.Hide
    )

    .put(
        "/",
        middleware.verifyUser,
        controller.car.Update
    )

    .put(
        "/index",
        middleware.verifyUser,
        controller.car.UpdateIndex
    )

    .delete("/",
        middleware.verifyUser,
        controller.car.Delete
    )
    .delete("/image",
        middleware.verifyUser,
        controller.car.DeleteImage
    )

module.exports = car
