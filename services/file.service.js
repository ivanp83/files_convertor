const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const PUBLIC_PATH = path.join(process.cwd(), "./public/");

const prepareFile = async (url) => {
  const paths = [PUBLIC_PATH, url];
  if (url.endsWith("/")) paths.push("/views/index.html");
  const filePath = path.join(...paths);

  const pathTraversal = !filePath.startsWith(PUBLIC_PATH);
  const exists = await fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });

  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : PUBLIC_PATH + "/views/" + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};
const convertFile = async (originalFileName, format) => {
  return new Promise((resolve, reject) => {
    const uuid = Date.now();
    try {
      const filePath = path.join(
        PUBLIC_PATH,
        "uploads",
        "done",
        `${uuid}.${format}`
      );

      sharp(originalFileName)
        .toFormat(String(format), {
          mozjpeg: true,
        })
        .toFile(filePath)
        .then((_) => resolve(filePath));
    } catch (err) {
      reject(err);
    }
  });
};
const writeFile = (PUBLIC_PATH, file) => {
  return new Promise((resolve) => {
    const rs = fs.createReadStream(file.path);
    const ws = fs.createWriteStream(PUBLIC_PATH + file.originalFilename);
    rs.on("data", function (chunk) {
      ws.write(chunk);
    });
    rs.on("error", function (err) {
      httpError(res, 500, "Stream Error");
    });
    rs.on("end", function (data) {
      resolve(PUBLIC_PATH + file.originalFilename);
    });
  });
};

module.exports = { prepareFile, convertFile, writeFile };
