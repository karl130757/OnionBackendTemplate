const express = require('express');
const ProfileRepository = require('../infrastructure/db/ProfileRepository');
const ProfileController = require('../presentation/controllers/ProfileController');

const router = express.Router();
const profileController = new ProfileController(new ProfileRepository());

router.post('/', (req, res) => profileController.create(req, res));

module.exports = router;
