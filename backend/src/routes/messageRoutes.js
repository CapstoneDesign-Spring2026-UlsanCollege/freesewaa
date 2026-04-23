const express = require('express');
const controller = require('../controllers/messageController');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.get('/conversations', requireAuth, controller.getConversations);
router.post('/conversations', requireAuth, controller.startConversation);
router.get('/conversations/:id/messages', requireAuth, controller.getMessages);
router.post('/conversations/:id/messages', requireAuth, controller.sendMessage);

module.exports = router;
