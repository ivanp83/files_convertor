"use-strict";
const http = require("node:http");
const { router } = require("./controllers/routing.controller");
const fs = require("fs");
const path = require("path");
const PORT = 8000;

global.memory = new Map();

const folderDir = path.join(__dirname, "public", "uploads", "done");

if (!fs.existsSync(folderDir)) {
  fs.promises.mkdir(folderDir, { recursive: true });
}

const server = http.createServer(async (req, res) => {
  router({ req, res });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) =>
  console.error("uncaughtException", err)
);
process.on("unhandledRejection", (err) =>
  console.error("unhandledRejection", err)
);
