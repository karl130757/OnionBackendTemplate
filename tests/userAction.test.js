const UserAction = require('../src/application/use-cases/UserAction');
const mockUserRepository = require('../src/infrastructure/db/UserRepository');
const mockAuthService = require('../src/application/services/AuthService');

jest.mock('../src/infrastructure/db/UserRepository');
jest.mock('../src/application/services/AuthService');

describe('UserAction', () => {
  let userAction;
  let mockUserRepo;
  let mockAuthSvc;

  beforeEach(() => {
    mockUserRepo = new mockUserRepository();
    mockAuthSvc = new mockAuthService();
    userAction = new UserAction(mockUserRepo, mockAuthSvc);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email, password: 'hashedPassword' };
      const mockToken = 'mocked-jwt-token';

      mockUserRepo.findByEmail = jest.fn().mockResolvedValue(user);
      mockAuthSvc.verifyPassword = jest.fn().mockResolvedValue(true);
      mockAuthSvc.generateToken = jest.fn().mockResolvedValue(mockToken);

      const token = await userAction.login(email, password);

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith(email);
      expect(mockAuthSvc.verifyPassword).toHaveBeenCalledWith(password, user.password);
      expect(mockAuthSvc.generateToken).toHaveBeenCalledWith(user.id);
      expect(token).toBe(mockToken);
    });

    it('should throw an error if login fails due to invalid email or password', async () => {
      const email = 'wrong@example.com';
      const password = 'wrongpassword';

      mockUserRepo.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(userAction.login(email, password)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('create', () => {
    it('should create a user successfully if the email does not exist', async () => {
      const newUser = { email: 'new@example.com', password: 'password123' };
      const hashedPassword = 'hashed-password';

      mockUserRepo.findByEmail = jest.fn().mockResolvedValue(null);
      mockAuthSvc.hashPassword = jest.fn().mockResolvedValue(hashedPassword);

      mockAuthSvc.hashPassword.mockImplementation((password) => {
        return Promise.resolve(hashedPassword);
      });

      mockUserRepo.create = jest.fn().mockResolvedValue({ ...newUser, password: hashedPassword });

      const createdUser = await userAction.create({ ...newUser, password: hashedPassword });

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith(newUser.email);
      expect(mockAuthSvc.hashPassword).toHaveBeenCalledWith(hashedPassword);
      expect(mockUserRepo.create).toHaveBeenCalledWith({ email: newUser.email, password: hashedPassword });
      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.password).toBe(hashedPassword);
    });

    it('should throw an error if the user already exists', async () => {
      const existingUser = { email: 'existing@example.com', password: 'password123' };

      mockUserRepo.findByEmail = jest.fn().mockResolvedValue(existingUser);

      await expect(userAction.create(existingUser)).rejects.toThrow('User Already Exist!');
    });
  });
});
