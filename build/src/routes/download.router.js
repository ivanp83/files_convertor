"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { download } = require('../controllers/file.controller');
router.route('/:name').get(download);
module.exports = router;
//# sourceMappingURL=download.router.js.map