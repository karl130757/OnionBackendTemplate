const CreateProfile = require('../../application/use-cases/CreateProfile');

class ProfileController {
  constructor(profileRepository) {
    this.createProfile = new CreateProfile(profileRepository);
  }

  async create(req, res) {
    try {
      const { userId, bio, location } = req.body;
      const profile = await this.createProfile.execute({ userId, bio, location });
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProfileController;
