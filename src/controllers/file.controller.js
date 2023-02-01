const sharp = require("sharp");
const {
  readdir,
  writeFileSync,
  writeFile,
  readFileSync,
  readFile,
} = require("fs");
const { createReadStream, createWriteStream } = require("fs");
const formidable = require("formidable");
const AppError = require("../error/app.error");
const path = require("path");
const { converFile } = require("../services/file.service");

const arr = [];
exports.upload = async (req, res, next) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return new AppError(err.message, 409);
      }
      files.file.forEach((file, i) => {
        arr.push({ ...file, ind: i });
      });

      const format = String(req.query.format);
      for await (const file of arr) {
        console.log(file);
        const ws = createReadStream(file.filepath);
        const rs = createWriteStream(
          `./uploads/${file.originalFilename.replace(/jpg|jpeg|png/g, format)}`
        );
        ws.pipe(rs);

        var newData = JSON.stringify({ new: "sds" }, null, 2);
        console.log(newData);
        // writeFile("base.json", newData, (err) => {
        //   // error checking
        //   if (err) throw err;

        //   console.log("New data added");
        // });
        var data = readFileSync("base.json");
        var myObject = JSON.parse(data);
        console.log(myObject);
        // console.log(items);
        // sharp(file.filepath)
        //   .toFormat(String(format), { mozjpeg: true })
        //   .toFile(Date.now() + "." + format);
      }
      // const items = readdir(
      //   "./uploads",
      //   { withFileTypes: true },
      //   (err, files) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(files);
      //     }
      //   }
      // );

      res.json({ message: data });
    });
  } catch (err) {
    return new AppError("Error while converting file!", 409);
  }
};
