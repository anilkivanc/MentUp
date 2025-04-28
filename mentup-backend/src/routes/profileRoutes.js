const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Kullanıcının kendi profilini al
router.get('/me', verifyToken, profileController.getOwnProfile);

// Profil oluştur/güncelle
router.put('/me', verifyToken, profileController.updateOwnProfile);

module.exports = router;
