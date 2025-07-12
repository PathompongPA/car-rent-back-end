const controller = require('../controllers');
const middleware = require('../middlewares');

const booking = require('express').Router()
    .get(
        "/",
        controller.booking.Read
    )
    .post(
        "/",
        middleware.fileUpload.array('slip'),
        middleware.verifyImage,
        controller.booking.Create
    )
    .put(
        "/",
        middleware.fileUpload.array('brandImg'),
        controller.booking.Update
    )
    .delete(
        "/",
        controller.booking.Delete
    )

module.exports = booking

