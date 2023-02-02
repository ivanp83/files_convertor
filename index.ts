<<<<<<< HEAD
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
//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//STATIC FILES
// app.use(express.static(path.join(__dirname, '/public')));

// app.use(express.static(path.resolve(__dirname, '../client/dist')));

//ROUTES
// app.get('/', (req: Request, res: Response) => {
//   res.render('main');
// });

app.use('/api/files', fileRouter);
app.use('/api/download', downloadRouter);
app.all('*', (req: Request, res: Response, err: any, next: NextFunction) => {
  // console.log(err);
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
=======
import { Request, Response, NextFunction } from "express";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const port = process.env.PORT || 3000;
const cors = require("cors");
const fileRouter = require("./src/routes/file.router");
const path = require("path");
const AppError = require("./src/error/app.error");
require("dotenv").config();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  })
);

//SSR
app.engine(".hbs", engine({
    extname: ".hbs",
    layoutDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    defaultLayout: "index"
  })
);
// задать параметры приложения:
// view engine (используемый шаболнизатор)
// view (каталог, в которм лежат файлы шаблонов)
app.set("view engine", ".hbs");
app.set("views", "./views");
app.set("trust proxy", true),
  //STATIC FILES
  app.use(express.static(path.join(__dirname, "/public")));

//ROUTES
app.get("/", (req: Request, res: Response) => {
  res.render("main");
});

app.use("/api/files", fileRouter);
<<<<<<<< HEAD:index.js
//app.use("/api/", storageRoutes);

app.all("*", (req, res, err, next) => {
========
app.all("*", (req: Request, res: Response, err: any , next: NextFunction) => {
>>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193:index.ts
  console.log(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193
});

//SERVER
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

<<<<<<< HEAD
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION!');
=======
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION!");
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

<<<<<<< HEAD
process.on('SIGTERM', () => {
  console.log(' SIGTERM RECEIVED.');
  server.close(() => {
    console.log('Process terminated!');
=======
process.on("SIGTERM", () => {
  console.log(" SIGTERM RECEIVED.");
  server.close(() => {
    console.log("Process terminated!");
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193
  });
});
