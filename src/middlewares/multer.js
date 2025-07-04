const fileUpload = require('multer')({ storage: require('multer').memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 }, });
module.exports = fileUpload
