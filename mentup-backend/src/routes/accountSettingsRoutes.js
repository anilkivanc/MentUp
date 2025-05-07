const express = require('express');
const router = express.Router();
const accountSettingsController = require("../controllers/accountSettingsController");
const { verifyToken } = require('../middlewares/authMiddleware');

// Mevcut şifreyi kontrol etmek için POST isteği
router.post('/checkPassword', verifyToken, accountSettingsController.checkCurrentPassword);

// E-posta bilgisini almak için GET isteği
router.get('/getEmail', verifyToken, accountSettingsController.getOwnEmail);

// Şifreyi güncellemek için POST isteği
router.post('/changePassword', verifyToken, accountSettingsController.updateOwnPassword);

module.exports = router;
