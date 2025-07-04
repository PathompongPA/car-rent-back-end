const middleware = require('../middlewares');
const controller = require('../controllers');

const customer = require('express').Router()

    .get(
        "/",
        controller.customer.Read
    )

    .post(
        "/",
        middleware.fileUpload.fields([
            { name: "customerDriverLicense", },
            { name: "customerIdCard" },
            { name: "customerFacebook" }
        ]),
        middleware.verifyUser,
        controller.customer.Create
    )

    .put(
        "/",
        middleware.fileUpload.fields([
            { name: "customerDriverLicense", },
            { name: "customerIdCard" },
            { name: "customerFacebook" }
        ]),
        controller.customer.Update
    )

    .delete("/",
        controller.customer.Delete
    )

module.exports = customer
