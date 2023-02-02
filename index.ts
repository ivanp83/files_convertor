import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const port = process.env.PORT || 3000;
const cors = require('cors');
const fileRouter = require('./src/routes/file.router');
const path = require('path');
const AppError = require('./src/error/app.error');
require('dotenv').config();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//SSR
// app.engine(
//   '.hbs',
//   engine({
//     extname: '.hbs',
//     layoutDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials/',
//     defaultLayout: 'index',
//   })
// );
// // задать параметры приложения:
// // view engine (используемый шаболнизатор)
// // view (каталог, в которм лежат файлы шаблонов)
// app.set('view engine', '.hbs');
// app.set('views', './views');

//STATIC FILES
//app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.resolve(__dirname, '../client/dist')));

//ROUTES
// app.get('/', (req: Request, res: Response) => {
//   res.render('main');
// });

app.use('/api/files', fileRouter);
app.all('*', (req: Request, res: Response, err: any, next: NextFunction) => {
  // console.log(err);
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

//SERVER
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
