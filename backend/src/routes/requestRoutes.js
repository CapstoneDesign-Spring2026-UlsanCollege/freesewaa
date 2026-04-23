const express = require('express');
const controller = require('../controllers/requestController');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.get('/mine', requireAuth, controller.listMyRequests);
router.post('/', requireAuth, controller.createRequest);
router.patch('/:id/status', requireAuth, controller.updateRequestStatus);

module.exports = router;
