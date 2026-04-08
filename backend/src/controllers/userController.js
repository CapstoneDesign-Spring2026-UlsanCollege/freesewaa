const User = require('../models/User');
const Item = require('../models/Item');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, location, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ donor: req.params.id })
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
