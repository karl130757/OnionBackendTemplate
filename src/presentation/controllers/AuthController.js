const LoginUser = require('../../application/use-cases/LoginUser');

class AuthController {
  constructor(userRepository, authService) {
    this.loginUser = new LoginUser(userRepository, authService);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.loginUser.execute(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
