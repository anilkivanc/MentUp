const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { signupValidation, loginValidation } = require('../services/userValidation');

// Signup route
router.post('/signup', validate(signupValidation), authController.signup);

// Login route
router.post('/login', validate(loginValidation), authController.login);

module.exports = router;

