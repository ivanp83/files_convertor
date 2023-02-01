const sharp = require("sharp");
const { readdir } = require("fs");
exports.converFile = async (file) => {
  try {
    const items = await readdir(".", { withFileTypes: true }).then((items) =>
      items.filter((dir) => dir.name !== "node_modules")
    );
    return items;
    // sharp(file.filepath)
    //   .toFormat(String(format), { mozjpeg: true })
    //   .toFile(
    //     path.join(
    //       __dirname,
    //       "uploads",
    //       file.filepath + "-converted" + "." + format
    //     )
    //   );
  } catch (error) {}
};
