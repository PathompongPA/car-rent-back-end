const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const file = {
    genFileName: async (files = []) => {
        let arr = []
        for (let index = 0; index < files.length; index++) {
            const ext = await path.extname(files[index].originalname);
            arr.push(`${await uuid.v4()}${ext}`)
        }
        return arr
    },

    saveFile: (_fileNames = [], _files = []) => {
        if (Array.isArray(_fileNames) & Array.isArray(_files)) {
            for (let index = 0; index < _files.length; index++) {
                const uploadDir = path.join(__dirname, '../../../uploads');
                let file = _files[index]
                let fileName = _fileNames[index]

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const filePath = path.join(uploadDir, fileName);

                if (!file || !file.buffer) {
                    throw new Error('File buffer is missing. Check multer storage type.');
                }
                fs.writeFileSync(filePath, file.buffer);
            }
        } else {
            const uploadDir = path.join(__dirname, '../../../uploads');
            let file = _files[0]
            let fileName = _fileNames

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, fileName);

            if (!file || !file.buffer) {
                throw new Error('File buffer is missing. Check multer storage type.');
            }
            fs.writeFileSync(filePath, file.buffer);
        }
    },

    deleteFile: (filesName = []) => {
        if (Array.isArray(filesName)) {
            for (filename in filesName) {
                if (typeof filename !== 'string' || filename.trim() === '') {
                    console.warn(`deleteFile: invalid filename: ${fileName}`);
                    return;
                }
                const filePath = path.join(__dirname, '../../../uploads', filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted: ${filename}`);
                } else {
                    // console.warn(`deleteFile: file not found: ${fileName}`);
                }
            }
        } else {
            if (typeof filesName !== 'string' || filesName.trim() === '') {
                console.warn(`deleteFile: invalid filename: ${fileName}`);
                return;
            }
            const filePath = path.join(__dirname, '../../../uploads', filesName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted: ${filesName}`);
            } else {
                console.warn(`deleteFile: file not found: ${filesName}`);
            }
        }
    },

    deleteUploadedFile: (filenames) => {
        if (Array.isArray(filenames)) {
            for (let index = 0; index < filenames.length; index++) {
                deleteFile(filenames[index])
            }
        } else {
            deleteFile(filenames)
        }
    }

};

module.exports = file
