const formidable = require("formidable");
const validateParams = (req, res, next) => {
  console.log(req.ip);
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
  });

  next();
};

module.exports = { validateParams };
