const express = require('express');
const router = express.Router();
const { getApplications, getApplicationById } = require('../controllers/adminPanelController');

// Tüm başvuruları listeleme
router.get('/applications', getApplications);

// Tekil başvuru detaylarını getirme
router.get('/applications/:id', getApplicationById);

module.exports = router;
