const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../../auth');

router.get('/', authenticateToken, userController.getUsers);
router.post('/completeInfo', userController.getCompleteInfo);
router.post('/status', authenticateToken, userController.updateStatus);
router.post('/createEnquiry', userController.createEnquiry);

module.exports = router;

