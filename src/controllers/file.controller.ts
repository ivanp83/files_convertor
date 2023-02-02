import { Request, Response, NextFunction } from 'express';
const sharp = require('sharp');
const formidable = require('formidable');
exports.upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = formidable({ multiples: true });
    //????????????
    form.parse(req, (err: any, fields: any[], files: any[]) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });
  } catch (error) {
    console.log(error);
  }
};
