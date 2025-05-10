const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileUpload');
const { createMentorApplication } = require('../controllers/applyMentorshipController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkApplicationStatus } = require('../controllers/applyMentorshipController');


// Mentor başvuru ve CV yükleme
router.post('/apply', verifyToken, upload.single('cv'), createMentorApplication);


// Başvuru durumunu kontrol etmek için GET isteği
router.get('/check-application', verifyToken, checkApplicationStatus);

module.exports = router;