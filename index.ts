import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const fileRouter = require('./src/routes/file.router');
const downloadRouter = require('./src/routes/download.router');
const path = require('path');
const AppError = require('./src/error/app.error');
require('dotenv').config();

export const STORAGEDIR = path.join(process.cwd(), 'uploads');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, '/uploads')));

app.use('/api/files', fileRouter);
app.use('/api/download', downloadRouter);
app.all('*', (req: Request, res: Response, err: any, next: NextFunction) => {
  console.log(err);
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req: Request, res: Response) => {
  res.render('main');
});

app.use('/api/files', fileRouter);

app.all('*', (req: Request, res: Response, err: any, next: NextFunction) => {
  console.log(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log(' SIGTERM RECEIVED.');
  server.close(() => {
    console.log('Process terminated!');
  });
});
