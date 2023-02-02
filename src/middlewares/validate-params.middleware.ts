import { Request, Response, NextFunction } from 'express';
const formidable = require('formidable');
const validateParams = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err: any, fields: any[], files: any[]) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
    }
  });

  next();
};

module.exports = { validateParams };
