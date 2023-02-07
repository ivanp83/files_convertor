"use-strict";

const fs = require("node:fs");
const { MIME_TYPES } = require("../utils/types");
const path = require("path");
const { httpError } = require("../utils/error");
const { retrieveFile, uploadFile, getFilesInfo } = require("./file.controller");

const routing = {
  "/": async ({ req, res }) => {
    switch (req.method) {
      case "GET":
        await sendHTML(res, "index");
        break;

      default:
        await sendHTML(res, "404");
        break;
    }
  },
  "/api/files/info/*": async ({ req, res }) => {
    const requestId = req.url.split("/").pop();

    switch (req.method) {
      case "GET":
        await getFilesInfo(+requestId, res);
        break;

      default:
        httpError(res, 500, "Route Not Found");
        break;
    }
  },
  "/api/files/*": async ({ req, res }) => {
    const reqFile = req.url.substring(4);

    switch (req.method) {
      case "GET":
        await retrieveFile(reqFile, res);
        break;
      case "POST":
        await uploadFile(req, res);
        break;

      default:
        httpError(res, 500, "Route Not Found");
        break;
    }
  },
};

const types = {
  object: function (o) {
    return JSON.stringify(o);
  },
  string: function (s) {
    return s;
  },
  number: function (n) {
    return n + "";
  },
  undefined: function () {
    return "Not found";
  },
  function: function (fn, par, client) {
    return fn(client, par);
  },
};

let matching = [];
for (key in routing) {
  if (key.indexOf("*") !== -1) {
    const rx = new RegExp(key.replace("*", "(.*)"));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

function router(client) {
  let rx,
    par,
    route = routing[client.req.url];

  if (route === undefined) {
    for (let i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];
      par = client.req.url.match(rx[0]);

      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  const renderer = types[typeof route];
  return renderer(route, par, client);
}

async function sendHTML(res, html) {
  try {
    const filePath = path.join(process.cwd(), `./views/${html}.html`);
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      "Content-Type": MIME_TYPES.html,
      "Content-Length": stat.size,
    });
    const rs = fs.createReadStream(filePath);
    return rs.pipe(res);
  } catch (err) {
    httpError(res, 500, JSON.stringify(err));
  }
}

module.exports = { router };
