const controller = require('../controllers');

const offer = require('express').Router()
    .get(
        "/",
        controller.offer.Read
    )
    .post(
        "/",
        controller.offer.Create
    )
    .put(
        "/",
        controller.car.Update
    )
    .delete("/",
        controller.car.Delete
    )

module.exports = offer
