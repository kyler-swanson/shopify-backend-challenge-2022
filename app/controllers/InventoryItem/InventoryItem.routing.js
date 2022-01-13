const express = require('express');
const router = express.Router();

const { createItem } = require('./InventoryItem.action');

router.post('/create', createUser);

module.exports = router;
