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
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//SSR
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    defaultLayout: "index",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

//STATIC FILES
app.use(express.static(path.join(__dirname, "/public")));

//ROUTES
app.get("/", (req, res) => {
  res.render("main");
});
app.use("/api/files", fileRouter);
app.all("*", (req, res, err, next) => {
  console.log(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//SERVER
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log(" SIGTERM RECEIVED.");
  server.close(() => {
    console.log("Process terminated!");
  });
});
