const { logging } = require("./logger");
const fileUpload = require("./multer");
const responseHelper = require("./responseHelper");
const { verifyImage } = require("./verifyImage");
const { verifyUser } = require("./verifyUser");

const middleware =
{
    verifyUser,
    verifyImage,
    fileUpload,
    responseHelper,
    logging

};

module.exports = middleware
