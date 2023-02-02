"use strict";
const formidable = require('formidable');
const { convertFile } = require('../services/file.service');
const { AppError } = require('../error/app.error');
const path = require('path');
const fs = require('fs');
const store = {};
const getFromCash = (path) => {
    return !!store[path];
};
const setToCash = (path, value) => {
    store[path] = value;
};
const upload = async (req, res) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return new AppError(err.message, 409);
            }
            const format = String(req.query.format);
            let downloadLinks = [];
            for await (const file of files.file) {
                const fileAdderss = await convertFile(file, format);
                downloadLinks.push(fileAdderss);
                // newUser.id = req.id;
                // newUser.downloadFile = fileAdderss;
                // arr.push(newUser);
            }
            res.status(200).json([...downloadLinks]);
        });
    }
    catch (err) {
        throw new Error(err);
    }
};
const download = async (req, res, next) => {
    // const {  name } = req.params;
    console.log(req.params);
    // const { hash } = req.query;
    // const path = `${dir}/${hash}`;
    try {
        //   // if (getFromCash(path)) {
        //   //   return res.sendFile(`${STORAGEDIR}/${name}`);
        //   // }
        //   res.sendFile(`localhost/${dir}/${name}`);
        const filePath = path.join(process.cwd(), 'uploads', req.params.name);
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Length': stat.size,
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
        // fs.exists(filePath, function (exists) {
        //   if (exists) {
        //     // Content-type is very interesting part that guarantee that
        //     // Web browser will handle response in an appropriate manner.
        //     res.writeHead(200, {
        //       'Content-Type': 'application/octet-stream',
        //       'Content-Disposition': 'attachment; filename=' + fileName,
        //     });
        //     fs.createReadStream(filePath).pipe(response);
        //     return;
        //   }
        //   response.writeHead(400, { 'Content-Type': 'text/plain' });
        //   response.end('ERROR File does not exist');
        // });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        setToCash(path, false);
    }
};
module.exports = { upload, download };
//# sourceMappingURL=file.controller.js.map