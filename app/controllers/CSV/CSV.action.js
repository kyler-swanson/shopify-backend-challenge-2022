const mongoose = require('mongoose');

const InventoryItem = require('../../models/InventoryItem.model');

module.exports.generateCSV = async (req, res, next) => {
  try {
    const items = await InventoryItem.find({});

    if (!items) {
      return res.status(404).json({
        success: false,
        err: 'No items exist'
      });
    }

    let out = 'SKU,Name,Description,Price,Cost,In Stock,Qty in Stock,Image URL\n';

    items.map((item) => {
      out += `${item.sku},${item.name},${item.description},${item.price},${item.cost},${item.available ? 'Yes' : 'No'},${item.inventoryCount},${item.image}\n`;
    });

    res.set('Content-Type', 'text/csv');
    res.send(out);
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message
    });
  }
};
