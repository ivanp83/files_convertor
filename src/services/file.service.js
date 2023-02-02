const sharp = require("sharp");
const path = require("path");
exports.converFile = async (file, format) => {
  try {
    const newFielePath = path.join(
      "uploads",
      file.originalFilename.replace(/jpg|jpeg|png/g, format).replace(/ /g, "")
    );
    setTimeout(() => {
      sharp(file.filepath)
        .toFormat(String(format), { mozjpeg: true })
        .toFile(newFielePath);
    }, 0);
    return newFielePath;
  } catch (error) {
    console.log(error);
  }
};
