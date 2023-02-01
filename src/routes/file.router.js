const express = require("express");
const { validateParams } = require("../middlewares/validate-params.middleware");
const fileController = require("./../controllers/file.controller");

const router = express.Router();

router.route("/upload").post(fileController.upload);

module.exports = router;
