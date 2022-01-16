const express = require('express');
const router = express.Router();

const { generateCSV } = require('./CSV.action');

router.get('/csv/', generateCSV);

module.exports = router;
