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
        controller.brand.Create
    )
    .put(
        "/brand",
        middleware.fileUpload.array('brandImg'),
        controller.brand.Update
    )
    .delete(
        "/brand",
        controller.brand.Delete
    )

module.exports = brand

