class IProfileRepository {
    async create(profile) {
      throw new Error('create method not implemented');
    }
    async findByUserId(userId) {
      throw new Error('findByUserId method not implemented');
    }
  }
  
  module.exports = IProfileRepository;
  