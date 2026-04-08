const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  try {
    const { category, condition, search, status = 'available', page = 1, limit = 20 } = req.query;

    const query = { status };

    if (category) {
      query.category = category;
    }

    if (condition) {
      query.condition = condition;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('donor', 'name email location');

    const total = await Item.countDocuments(query);

    res.json({
      success: true,
      count: items.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      items
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('donor', 'name email location');

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    item.views += 1;
    await item.save();

    res.json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, condition, location, image } = req.body;

    const item = await Item.create({
      title,
      description,
      category,
      condition,
      location,
      image,
      donor: req.user.id
    });

    await item.populate('donor', 'name email location');

    res.status(201).json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    if (item.donor.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to update this item'
      });
    }

    const { title, description, category, condition, location, image, status } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, description, category, condition, location, image, status },
      { new: true, runValidators: true }
    ).populate('donor', 'name email location');

    res.json({
      success: true,
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    if (item.donor.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to delete this item'
      });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ donor: req.user.id })
      .sort({ createdAt: -1 })
      .populate('donor', 'name email location');

    res.json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
