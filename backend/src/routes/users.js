const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUserItems } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/:id', protect, getProfile);
router.put('/:id', protect, updateProfile);
router.get('/:id/items', protect, getUserItems);

module.exports = router;
