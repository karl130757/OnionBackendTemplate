const express = require('express');
const UserRepository = require('../infrastructure/db/UserRepository');
const AuthService = require('../application/services/AuthService');
const AuthController = require('../presentation/controllers/AuthController');

const router = express.Router();
const authController = new AuthController(new UserRepository(), new AuthService(process.env.JWT_SECRET));

router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
