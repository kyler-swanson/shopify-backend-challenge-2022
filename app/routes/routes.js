const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ success: true, message: 'Hello!' });
});

const InventoryItem = require('../controllers/InventoryItem/InventoryItem.routing');
router.use('/', InventoryItem);

module.exports = router;
