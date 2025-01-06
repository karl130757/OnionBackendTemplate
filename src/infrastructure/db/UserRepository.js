const IUserRepository = require('../../core/interfaces/IUserRepository');
const User = require('../../core/entities/User');
const UserModel = require('./models/UserModel');

class UserRepository extends IUserRepository {
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(user) {
    const {email, password} = user;
    const userEntity = new User({email, password});
    return UserModel.create(userEntity);
  }
}

module.exports = UserRepository;
