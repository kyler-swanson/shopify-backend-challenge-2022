const { validate } = require('jsonschema');
const mongoose = require('mongoose');

const InventoryItem = require('../../models/InventoryItem.model');
const { itemCreateSchema, itemUpdateSchema } = require('../../schemas');

module.exports.getItems = async (req, res, next) => {
  try {
    const items = await InventoryItem.find({});

    if (!items) {
      return res.status(404).json({
        success: false,
        err: 'No items exist'
      });
    }

    res.json({
      success: true,
      items: items.map((item) => item.toObject())
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports.getItem = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      err: 'Invalid item ID'
    });
  }

  try {
    const item = await InventoryItem.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        err: 'Item not found'
      });
    }

    res.json({
      success: true,
      item: item.toObject()
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports.createItem = async (req, res, next) => {
  const validationResult = validate(req.body, itemCreateSchema);
  if (!validationResult.valid) {
    return res.status(400).json({
      success: false,
      err: validationResult.errors.map((e) => e.stack).join('. ')
    });
  }

  try {
    const item = new InventoryItem(req.body);

    // look for duplicate
    const duplicate = await InventoryItem.findOne({ sku: item.sku });
    if (duplicate) {
      return res.status(409).json({
        success: false,
        err: `Item with SKU "${item.sku}" already exists`
      });
    }

    const result = await item.save();

    res.status(201).json({
      success: true,
      item: result.toObject()
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports.updateItem = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      err: 'Invalid item ID'
    });
  }

  const validationResult = validate(req.body, itemUpdateSchema);
  if (!validationResult.valid) {
    return res.status(400).json({
      success: false,
      err: validationResult.errors.map((e) => e.stack).join('. ')
    });
  }

  try {
    const result = await InventoryItem.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        err: `Item with ID "${i}" not found`
      });
    }

    res.status(200).json({
      success: true,
      item: result.toObject()
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      err: 'Invalid item ID'
    });
  }

  try {
    const result = await InventoryItem.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        err: `Item with ID "${id}" not found`
      });
    }

    res.json({
      success: true,
      item: result
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};
