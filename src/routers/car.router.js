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

    .put(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "carImage", },
            { name: "carThumbnail" }
        ]),
        controller.car.Update
    )

    .delete("/",
        middleware.verifyUser,
        controller.car.Delete
    )

module.exports = car
