/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
function verifyUser(req, res, next) {
    let isHaveKey = req.headers.key === "asdf"
    if (isHaveKey) {
        next()
    } else {
        req.jsonResult.msg = "Not allow,please login"
        res.status(401).json(req.jsonResult)
    }
}

module.exports = {
    verifyUser
};
