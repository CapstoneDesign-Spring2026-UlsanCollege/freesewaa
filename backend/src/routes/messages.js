const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, getConversations, markAsRead, getUnreadCount } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/unread', protect, getUnreadCount);
router.get('/:conversationId', protect, getConversation);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
