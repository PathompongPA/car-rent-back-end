const controller = require('../controllers');
const middleware = require('../middlewares');

const booking = require('express').Router()
    .get(
        "/",
        controller.booking.Read
    )
    .post(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "customerDriverLicense", },
            { name: "customerIdCard" },
            { name: "customerFacebook" },
            { name: "slip" }
        ]),
        controller.booking.Create
    )
    .put(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.array('brandImg'),
        controller.booking.Update
    )
    .delete(
        "/",
        middleware.verifyUser,
        controller.booking.Delete
    )

module.exports = booking

