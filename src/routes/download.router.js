const express = require("express");
const router = express.Router();

const { retrieveImageFile } = require("../controllers/uploadImageController");

router.route("/:dir/:name").get(retrieveImageFile);
module.exports = router;
