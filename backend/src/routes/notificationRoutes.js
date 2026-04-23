const express = require('express');
const controller = require('../controllers/notificationController');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.get('/', requireAuth, controller.getNotifications);
router.patch('/read', requireAuth, controller.markRead);

module.exports = router;
