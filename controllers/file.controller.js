"use-strict";
const multiparty = require("multiparty");
const path = require("path");
const { httpError } = require("../utils/error");
const { MIME_TYPES } = require("../utils/types");
const {
  prepareFile,
  convertFile,
  writeFile,
} = require("../services/file.service");

const { Queue } = require("../services/queue.service");
let requestId = Date.now();

const uploadFile = async (req, res) => {
  const PUBLIC_PATH = path.join(process.cwd(), "/public/uploads/");
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    requestId += 1;
    form.parse(req, async (err, fields, files) => {
      const filesArr = [];
      if (err) {
        httpError(res, 500, "Error Reading Files");
      } else {
        for await (let file of files.files) {
          const filePath = await writeFile(PUBLIC_PATH, file);
          filesArr.push(filePath);
        }
        resolve(filesArr);
      }
    });
  }).then((files) => {
    global.memory.set(requestId, {
      files,
      status: "pending",
    });
    const queue = Queue.channels(3)
      .process((task, next) => {
        convertFile(task.originalFileName, "webp").then((_) => {
          next(null, task);
        });
      })
      .done((err, res) => {
        const { count } = queue;
        const waiting = queue.waiting.length;
        console.log(`Done: ${res.name}, count:${count}, waiting: ${waiting}`);
      })
      .success((res) => {
        console.log(`Success: ${res.name}`);
      })
      .failure((err) => console.log(`Failure: ${err}`))
      .drain(() => console.log("Queue drain"));

    for (let i = 0; i < files.length; i++) {
      queue.add({
        originalFileName: files[i],
        requestId,
      });
    }
    res.writeHead(200, { "content-type": MIME_TYPES.json });
    res.end(JSON.stringify({ requestId }, null, 2));
  });
};

const getFilesInfo = async (requestId, res) => {
  if (!global.memory.has(requestId)) {
    httpError(res, 404, "Not Found");
    return;
  }

  const request = global.memory.get(requestId);
  const data = { status: request.status };
  if (request.status === "complete") {
    data.files = request.files;
  }
  res.writeHead(200, { "content-type": MIME_TYPES.json });
  res.end(JSON.stringify(data, null, 2));
};
const retrieveFile = async (filePath, res) => {
  const file = await prepareFile(filePath);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { "Content-Type": mimeType });
  return file.stream.pipe(res);
};

module.exports = { uploadFile, retrieveFile, getFilesInfo };
