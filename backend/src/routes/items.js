const express = require('express');
const router = express.Router();
const { getAllItems, getItem, createItem, updateItem, deleteItem, getMyItems } = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

router.get('/', getAllItems);
router.get('/my-items', protect, getMyItems);
router.get('/:id', getItem);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
