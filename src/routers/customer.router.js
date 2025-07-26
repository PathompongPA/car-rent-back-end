const middleware = require('../middlewares');
const controller = require('../controllers');

const customer = require('express').Router()

    .get(
        "/",
        controller.customer.Read
    )

    .post(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "customerDriverLicense", },
            { name: "customerIdCard" },
            { name: "customerFacebook" }
        ]),
        controller.customer.Create
    )

    .put(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "customerDriverLicense", },
            { name: "customerIdCard" },
            { name: "customerFacebook" }
        ]),
        controller.customer.Update
    )

    .delete("/",
        middleware.verifyUser,
        controller.customer.Delete
    )

module.exports = customer
