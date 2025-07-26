const dayjs = require("dayjs");

const logging = (req, res, next) => {
    let timeStart = dayjs()
    let detail = {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        body: JSON.stringify(req.body),
        query: { ...req.query },
    }
    res.on("finish", () => {
        console.log(`[${dayjs()}] ${req.method} ${dayjs().diff(timeStart)} ms ${req.url}`, JSON.stringify(detail));
    })
    next();
};


module.exports = { logging };
