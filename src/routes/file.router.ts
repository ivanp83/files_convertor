<<<<<<< HEAD
const express = require('express');
const { validateParams } = require('../middlewares/validate-params.middleware');
const fileController = require('../controllers/file.controller');

const router = express.Router();

router.route('/upload').post(validateParams, fileController.upload);
=======
const express = require("express");
const { validateParams } = require("../middlewares/validate-params.middleware");
const fileController = require("../controllers/file.controller");

const router = express.Router();

router.route("/upload").post(validateParams, fileController.upload);
//   .post(bookingController.createBooking);
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193

module.exports = router;
