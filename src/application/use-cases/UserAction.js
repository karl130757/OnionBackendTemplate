class UserAction {
    constructor(userRepository, authService) {
      this.userRepository = userRepository;
      this.authService = authService;
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await this.authService.verifyPassword(password, user.password))) {
          throw new Error('Invalid email or password');
        }
        return this.authService.generateToken(user.id);
      }
  
    async create(user) {
      const existingProfile = await this.userRepository.findByEmail(user.email);
      const hashedPassword = await this.authService.hashPassword(user.password);
      user.password = hashedPassword;
      if (existingProfile) throw new Error('User Already Exist!');
      return this.userRepository.create(user);
    }
  }
  
  module.exports = UserAction;
  