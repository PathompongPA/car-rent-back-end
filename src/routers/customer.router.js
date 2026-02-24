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
            { name: "customerIdCard" },
            { name: "customerDriverLicense", },
            { name: "customerFacebook" }
        ]),
        controller.customer.Create
    )

    .put(
        "/",
        middleware.verifyUser,
        middleware.fileUpload.fields([
            { name: "customerIdCard" },
            { name: "customerDriverLicense", },
            { name: "customerFacebook" }
        ]),
        controller.customer.Update
    )

    .delete("/",
        middleware.verifyUser,
        controller.customer.Delete
    )

module.exports = customer
