"use strict";
const sharp = require('sharp');
const path = require('path');
const AppError = require('../error/app.error');
const convertFile = async (file, format, next) => {
    try {
        const filePath = file.originalFilename
            .replace(/jpg|jpeg|png/g, format)
            .replace(/ /g, '');
        setTimeout(() => {
            sharp(file.filepath)
                .toFormat(String(format), { mozjpeg: true })
                .toFile(filePath);
        }, 0);
        return path.join('http://localhost:3000', 'api', 'download', filePath);
    }
    catch (error) {
        return next(new AppError(error.message, 404));
    }
};
module.exports = { convertFile };
//# sourceMappingURL=file.service.js.map