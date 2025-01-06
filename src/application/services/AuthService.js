const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(secret) {
    this.secret = secret;
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  generateToken(userId) {
    return jwt.sign({ userId }, this.secret, { expiresIn: '1h' });
  }
}

module.exports = AuthService;
