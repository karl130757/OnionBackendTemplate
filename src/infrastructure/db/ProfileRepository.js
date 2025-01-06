const IProfileRepository = require('../../core/interfaces/IProfileRepository');
const Profile = require('../../core/entities/Profile')
const ProfileModel = require('./models/ProfileModel');

class ProfileRepository extends IProfileRepository {
  async create(profile) {
    const {userId, bio, location} = profile;
    const profileEntity = new Profile({userId, bio, location})
    return ProfileModel.create(profileEntity);
  }

  async findByUserId(userId) {
    return ProfileModel.findOne({ userId });
  }
}

module.exports = ProfileRepository;
