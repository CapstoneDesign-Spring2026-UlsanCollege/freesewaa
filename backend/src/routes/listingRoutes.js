const express = require('express');
const controller = require('../controllers/listingController');
const requireAuth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();
router.get('/', controller.listListings);
router.get('/:id', controller.getListing);
router.post('/', requireAuth, upload.array('images', 5), controller.createListing);
router.put('/:id', requireAuth, controller.updateListing);
router.delete('/:id', requireAuth, controller.deleteListing);

module.exports = router;
