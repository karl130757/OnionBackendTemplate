const UserAction = require('../../application/use-cases/UserAction');

class AuthController {
  constructor(userRepository, authService) {
    this.userAction = new UserAction(userRepository, authService);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.userAction.login(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
