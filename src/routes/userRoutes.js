const express = require('express');
const UserRepository = require('../infrastructure/db/UserRepository');
const UserController = require('../presentation/controllers/UserController');
const AuthService = require('../application/services/AuthService');

const router = express.Router();
const userController = new UserController(new UserRepository(), new AuthService(process.env.JWT_SECRET));

router.post('/create', (req, res) => userController.create(req, res));

module.exports = router;
