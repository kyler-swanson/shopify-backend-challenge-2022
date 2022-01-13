const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hello!' });
});

const InventoryItem = require('../controllers/InventoryItem/InventoryItem.routing');
router.use('/user', InventoryItem);

module.exports = router;
