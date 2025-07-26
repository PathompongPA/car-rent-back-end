const jwt = require('jsonwebtoken');
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
function verifyUser(req, res, next) {
    try {
        jwt.verify(req.cookies.token, "secret")
        next()
    } catch (error) {
        res.fail("Not allow,please login")
    }
}

module.exports = {
    verifyUser
};
