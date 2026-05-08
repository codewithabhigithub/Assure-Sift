const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/upload');
const { authenticateToken } = require('../../auth');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', authenticateToken, upload.single('image'), blogController.createBlog);
router.put('/:id', authenticateToken, upload.single('image'), blogController.updateBlog);
router.delete('/:id', authenticateToken, blogController.deleteBlog);

module.exports = router;

