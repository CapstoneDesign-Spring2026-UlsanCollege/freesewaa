const express = require('express');
const router = express.Router();
const { createRequest, getRequest, updateRequestStatus, getMyRequests, getRequestsForMyItems } = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new item request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 request:
 *                   $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, createRequest);

/**
 * @swagger
 * /api/requests/my-requests:
 *   get:
 *     summary: Get current user's requests (as requester)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 */
router.get('/my-requests', protect, getMyRequests);

/**
 * @swagger
 * /api/requests/received:
 *   get:
 *     summary: Get requests received on user's items (as donor)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of received requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 */
router.get('/received', protect, getRequestsForMyItems);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get request by ID
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 request:
 *                   $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found
 */
router.get('/:id', protect, getRequest);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   put:
 *     summary: Update request status (accept/reject)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, rejected]
 *     responses:
 *       200:
 *         description: Request status updated
 *       404:
 *         description: Request not found
 */
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;
