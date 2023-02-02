const formidable = require("formidable");
const AppError = require("../error/app.error");
const { converFile } = require("../services/file.service");

const arr = [];
console.log(arr);
exports.upload = async (req, res, next) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return new AppError(err.message, 409);
      }
      // files.file.forEach((file, i) => {
      //   arr.push({ ...file, ind: i });
      // });
      const newUser = {};

      const format = String(req.query.format);
      let arrAddress = [];
      for await (const file of files.file) {
        const fileAdderss = await converFile(file, format);
        arrAddress.push(fileAdderss);
        newUser.id = req.id;
        newUser.downloadFile = fileAdderss;
        arr.push(newUser);
      }

      // res.render("main", {
      //   arrAddress,
      // });
    });
  } catch (err) {
    return new AppError("Error while converting file!", 409);
  }
};
// const ws = createReadStream(file.filepath);
// const rs = createWriteStream(
//   `./uploads/${file.originalFilename.replace(/jpg|jpeg|png/g, format)}`
// );
// ws.pipe(rs);

// var newData = JSON.stringify({ new: "sds" }, null, 2);
// console.log(newData);
// writeFile("base.json", newData, (err) => {
//   // error checking
//   if (err) throw err;

//   console.log("New data added");
// });
// var data = readFileSync("base.json");
// var myObject = JSON.parse(data);
// console.log(myObject);
// console.log(items);
// sharp(file.filepath)
//   .toFormat(String(format), { mozjpeg: true })
//   .toFile(Date.now() + "." + format);
//}
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
