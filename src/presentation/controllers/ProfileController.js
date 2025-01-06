const ProfileAction = require('../../application/use-cases/ProfileAction');

class ProfileController {
  constructor(profileRepository) {
    this.profileAction = new ProfileAction(profileRepository);
  }

  async create(req, res) {
    try {
      const { userId, bio, location } = req.body;
      const profile = await this.profileAction.create({ userId, bio, location });
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProfileController;
