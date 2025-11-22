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
        "/hide",
        controller.car.Hide
    )

    .put(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "carImage", },
            { name: "carThumbnail" }
        ]),
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

module.exports = car
