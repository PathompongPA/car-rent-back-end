const controller = require('../controllers');
const middleware = require('../middlewares');

const brand = require('express').Router()
    .get(
        "/brand",
        controller.brand.Read
    )
    .post(
        "/brand",
        middleware.fileUpload.array('brandImg'),
        middleware.verifyImage,
        middleware.verifyUser,
        controller.brand.Create
    )
    .put(
        "/brand",
        middleware.fileUpload.array('brandImg'),
        middleware.verifyUser,
        controller.brand.Update
    )
    .delete(
        "/brand",
        middleware.verifyUser,
        controller.brand.Delete
    )

module.exports = brand

