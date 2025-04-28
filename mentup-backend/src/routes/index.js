const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');


// Health-check
router.get('/', (req, res) => {
  res.send('API is working');
});

// Auth işlemleri (signup, login, profile)
router.use('/auth', authRoutes);

router.use('/profile', profileRoutes);

module.exports = router;
