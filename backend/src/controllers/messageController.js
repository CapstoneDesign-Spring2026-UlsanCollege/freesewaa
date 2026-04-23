const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Listing = require('../models/Listing');
const Notification = require('../models/Notification');

exports.getConversations = async (req, res) => {
  const conversations = await Conversation.find({ participants: req.user._id })
    .populate('listing', 'title images')
    .populate('participants', 'firstName lastName avatarUrl city region')
    .sort({ lastMessageAt: -1 })
    .lean();

  res.json({ conversations });
};

exports.getMessages = async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found.' });
  if (!conversation.participants.some(id => String(id) === String(req.user._id))) {
    return res.status(403).json({ error: 'Not allowed.' });
  }

  const messages = await Message.find({ conversation: conversation._id })
    .populate('sender', 'firstName lastName')
    .sort({ createdAt: 1 })
    .lean();

  res.json({ messages });
};

exports.startConversation = async (req, res) => {
  const listing = await Listing.findById(req.body.listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found.' });

  const participantIds = [String(req.user._id), String(listing.owner)].sort();
  let conversation = await Conversation.findOne({ listing: listing._id, participants: { $all: participantIds, $size: 2 } });
  if (!conversation) {
    conversation = await Conversation.create({ listing: listing._id, participants: participantIds, lastMessageAt: new Date() });
  }

  res.status(201).json({ conversation });
};

exports.sendMessage = async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found.' });
  if (!conversation.participants.some(id => String(id) === String(req.user._id))) {
    return res.status(403).json({ error: 'Not allowed.' });
  }

  const message = await Message.create({
    conversation: conversation._id,
    sender: req.user._id,
    body: req.body.body,
    readBy: [req.user._id]
  });

  conversation.lastMessageAt = new Date();
  await conversation.save();

  const recipientIds = conversation.participants.filter(id => String(id) !== String(req.user._id));
  const notifications = recipientIds.map(userId => ({
    user: userId,
    type: 'message',
    text: `${req.user.firstName} sent you a new message.`,
    meta: { conversationId: conversation._id }
  }));
  if (notifications.length) await Notification.insertMany(notifications);

  const populated = await Message.findById(message._id).populate('sender', 'firstName lastName').lean();
  res.status(201).json({ message: populated });
};
