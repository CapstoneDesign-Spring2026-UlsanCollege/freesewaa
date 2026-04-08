const Message = require('../models/Message');

const generateConversationId = (user1, user2) => {
  const sorted = [user1, user2].sort();
  return `${sorted[0]}_${sorted[1]}`;
};

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, itemId, message } = req.body;

    const conversationId = generateConversationId(req.user.id, receiverId);

    const newMessage = await Message.create({
      conversationId,
      sender: req.user.id,
      receiver: receiverId,
      item: itemId,
      message
    });

    await newMessage.populate('sender', 'name email');
    await newMessage.populate('receiver', 'name email');

    res.status(201).json({
      success: true,
      message: newMessage
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    const total = await Message.countDocuments({ conversationId });

    res.json({
      success: true,
      count: messages.length,
      total,
      messages: messages.reverse()
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $match: { $or: [{ sender: req.user._id }, { receiver: req.user._id }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [{ $and: [{ $eq: ['$receiver', req.user._id] }, { $eq: ['$read', false] }] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user.id,
      read: false
    });

    res.json({
      success: true,
      unreadCount: count
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
