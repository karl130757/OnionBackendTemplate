class IUserRepository {
    async findByEmail(email) {
      throw new Error('findByEmail method not implemented');
    }
    async create(user) {
      throw new Error('create method not implemented');
    }
  }
  
  module.exports = IUserRepository;
  