class ProfileAction {
    constructor(profileRepository) {
      this.profileRepository = profileRepository;
    }
  
    async create({ userId, bio, location }) {
      const existingProfile = await this.profileRepository.findByUserId(userId);
      if (existingProfile) throw new Error('Profile already exists for this user');
  
      return this.profileRepository.create({ userId, bio, location });
    }
  }
  
  module.exports = ProfileAction;
  