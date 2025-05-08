// routes/index.js
const express = require('express');
const router  = express.Router();
const authRoutes            = require('./authRoutes');
const profileRoutes         = require('./profileRoutes');
const accountSettingsRoutes = require('./accountSettingsRoutes');

router.get('/', (_,res) => res.send('API is working'));
router.use('/auth',    authRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
