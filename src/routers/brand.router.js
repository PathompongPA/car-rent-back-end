const controller = require('../controllers');
const middleware = require('../middlewares');

const brand = require('express').Router()
    .get(
        "/",
        controller.brand.Read
    )
    .get(
        "/all",
        controller.brand.ReadAll
    )
    .post(
        "/",
        middleware.fileUpload.array('brandImg'),
        middleware.verifyImage,
        middleware.verifyUser,
        controller.brand.Create
    )
    .put(
        "/",
        middleware.fileUpload.array('brandImg'),
        middleware.verifyUser,
        controller.brand.Update
    )
    .delete(
        "/",
        middleware.verifyUser,
        controller.brand.Delete
    )

module.exports = brand

