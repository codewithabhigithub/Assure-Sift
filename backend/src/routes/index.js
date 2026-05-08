const express = require('express');
const router = express.Router();

const blogRoutes = require('./blogRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/blogs', blogRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
