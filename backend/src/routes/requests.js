const express = require('express');
const router = express.Router();
const { createRequest, getRequest, updateRequestStatus, getMyRequests, getRequestsForMyItems } = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createRequest);
router.get('/my-requests', protect, getMyRequests);
router.get('/received', protect, getRequestsForMyItems);
router.get('/:id', protect, getRequest);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;
