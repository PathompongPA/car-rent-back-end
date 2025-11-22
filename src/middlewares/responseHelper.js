function responseHelper(req, res, next) {
    res.success = function (data) {
        res.json({
            isSuccess: true,
            data,
        });
    };

    res.fail = function (message, code = 400) {
        console.log("msg error : ", message)
        res.status(code).json({
            isSuccess: false,
            msg: message,
        });
    };

    next();
}

module.exports = responseHelper;
