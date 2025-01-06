const IProfileRepository = require('../../core/interfaces/IProfileRepository');
const ProfileModel = require('./models/ProfileModel');

class ProfileRepository extends IProfileRepository {
  async create(profile) {
    return ProfileModel.create(profile);
  }

  async findByUserId(userId) {
    return ProfileModel.findOne({ userId });
  }
}

module.exports = ProfileRepository;
