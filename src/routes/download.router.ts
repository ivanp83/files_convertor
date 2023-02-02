import { Request, Response } from 'express';

export {};
const express = require('express');
const router = express.Router();

const { download } = require('../controllers/file.controller');

router.route('/:name').get(download);
module.exports = router;
