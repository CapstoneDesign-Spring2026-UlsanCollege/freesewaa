const Request = require('../models/Request');
const Item = require('../models/Item');

exports.createRequest = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    if (item.status !== 'available') {
      return res.status(400).json({
        message: 'Item is not available for request'
      });
    }

    if (item.donor.toString() === req.user.id) {
      return res.status(400).json({
        message: 'Cannot request your own item'
      });
    }

    const existingRequest = await Request.findOne({
      item: itemId,
      requester: req.user.id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        message: 'You already have a pending request for this item'
      });
    }

    const request = await Request.create({
      item: itemId,
      requester: req.user.id,
      donor: item.donor,
      message
    });

    await request.populate('requester', 'name email');
    await request.populate('donor', 'name email');
    await request.populate('item', 'title image');

    res.status(201).json({
      success: true,
      request
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('requester', 'name email')
      .populate('donor', 'name email')
      .populate('item', 'title image');

    if (!request) {
      return res.status(404).json({
        message: 'Request not found'
      });
    }

    res.json({
      success: true,
      request
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: 'Request not found'
      });
    }

    if (request.donor.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to update this request'
      });
    }

    request.status = status;
    await request.save();

    if (status === 'approved') {
      await Item.findByIdAndUpdate(request.item, {
        status: 'reserved'
      });
    }

    await request.populate('requester', 'name email');
    await request.populate('donor', 'name email');
    await request.populate('item', 'title image');

    res.json({
      success: true,
      request
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id })
      .sort({ createdAt: -1 })
      .populate('requester', 'name email')
      .populate('donor', 'name email')
      .populate('item', 'title image');

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getRequestsForMyItems = async (req, res) => {
  try {
    const requests = await Request.find({ donor: req.user.id })
      .sort({ createdAt: -1 })
      .populate('requester', 'name email')
      .populate('donor', 'name email')
      .populate('item', 'title image');

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
