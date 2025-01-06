const IUserRepository = require('../../core/interfaces/IUserRepository');
const UserModel = require('./models/UserModel');

class UserRepository extends IUserRepository {
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(user) {
    return UserModel.create(user);
  }
}

module.exports = UserRepository;
