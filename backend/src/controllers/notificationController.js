const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
  res.json({ notifications });
};

exports.markRead = async (req, res) => {
  await Notification.updateMany({ user: req.user._id, _id: { $in: req.body.ids || [] } }, { $set: { read: true } });
  res.json({ success: true });
};
