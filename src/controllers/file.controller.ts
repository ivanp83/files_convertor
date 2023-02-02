import { Request, Response, NextFunction } from 'express';
const formidable = require('formidable');
import { AppTypes } from '@shared/types';
const { convertFile } = require('../services/file.service');
const { AppError } = require('../error/app.error');
const path = require('path');
const fs = require('fs');
const store: any = {};
const getFromCash = (path: string) => {
  return !!store[path];
};
const setToCash = (path: string, value: any) => {
  store[path] = value;
};
const upload = async (req: Request, res: Response): Promise<any> => {
  try {
    const form = formidable({ multiples: true });
    form.parse(
      req,
      async (
        err: AppTypes.AppErrorType,
        fields: Array<string>,
        files: { file: Array<AppTypes.FileType> }
      ): Promise<any> => {
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
      }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

const download = async (req: Request, res: Response, next: NextFunction) => {
  // const {  name } = req.params;
  console.log('req.params');
  // const { hash } = req.query;
  // const path = `${dir}/${hash}`;
  try {
    //   // if (getFromCash(path)) {
    //   //   return res.sendFile(`${STORAGEDIR}/${name}`);
    //   // }

    const filePath = path.join(process.cwd(), 'uploads', req.params.name);
    res.sendFile(filePath);
    // const stat = fs.statSync(filePath);
    // res.writeHead(200, {
    //   'Content-Length': stat.size,
    // });
    // const readStream = fs.createReadStream(filePath);

    // readStream.pipe(res);

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
  } catch (err) {
    console.log(err);
  } finally {
    setToCash(path, false);
  }
};

module.exports = { upload, download };
// const file = fs.createReadStream(filePath);
// const stat = fs.statSync(filePath);
// console.log(stat);
// res.setHeader('Content-Length', stat.size);
// res.setHeader('Content-Type', 'application/pdf');
// res.setHeader(
//   'Content-Disposition',
//   'attachment; filename=declaration.pdf'
// );
// file.pipe(res);
