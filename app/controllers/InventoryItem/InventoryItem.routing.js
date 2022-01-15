const express = require('express');
const router = express.Router();

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('./InventoryItem.action');

router.get('/item/', getItems);
router.get('/item/:id', getItem);
router.post('/item', createItem);
router.patch('/item/:id', updateItem);
router.delete('/item/:id', deleteItem);

module.exports = router;
