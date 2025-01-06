const UserAction = require('../../application/use-cases/UserAction');

class UserController {
  constructor(userRepository, authService) {
    this.userAction = new UserAction(userRepository, authService);
  }

  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userAction.create({ email, password });
      return res.status(201).json(user);
    } catch (error) {
        console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
