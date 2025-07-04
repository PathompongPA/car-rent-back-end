/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
function verifyImage(req, res, next) {
    let isHaveImage = req.files.length > 0
    if (isHaveImage) {
        next()
    } else {
        req.jsonResult.msg = "ไม่มีรูป"
        res.json()
    }
}

module.exports = {
    verifyImage
};
