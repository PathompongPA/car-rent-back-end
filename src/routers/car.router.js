const middleware = require('../middlewares');
const controller = require('../controllers');



const car = require('express').Router()

    .get(
        "/",
        controller.car.Read
    )

    .post(
        "/",
        middleware.fileUpload.fields([
            { name: "carImage", },
            { name: "carThumbnail" }
        ]),
        middleware.verifyUser,
        controller.car.Create
    )

    .put(
        "/",
        middleware.fileUpload.fields([
            { name: "carImage", },
            { name: "carThumbnail" }
        ]),
        controller.car.Update
    )

    .delete("/",
        controller.car.Delete
    )

module.exports = car
