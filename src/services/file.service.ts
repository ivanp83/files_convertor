const sharp = require('sharp');
const path = require('path');
import { AppTypes } from '@shared/types';
import { NextFunction } from 'express';
const AppError = require('../error/app.error');

const convertFile = async (
  file: AppTypes.FileType,
  format: string,
  next: NextFunction
) => {
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
  } catch (error: any) {
    return next(new AppError(error.message, 404));
  }
};
export = { convertFile };
