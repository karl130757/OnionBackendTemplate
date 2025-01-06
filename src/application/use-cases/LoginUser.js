class LoginUser {
    constructor(userRepository, authService) {
      this.userRepository = userRepository;
      this.authService = authService;
    }
  
    async execute(email, password) {
      const user = await this.userRepository.findByEmail(email);
      if (!user || !(await this.authService.verifyPassword(password, user.password))) {
        throw new Error('Invalid email or password');
      }
  
      return this.authService.generateToken(user.id);
    }
  }
  
  module.exports = LoginUser;
  