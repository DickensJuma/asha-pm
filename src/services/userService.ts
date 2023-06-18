import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface UserData {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

class UserService {
  static async registerUser(userData: any) {
    console.log(userData);
   
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user with the hashed password
    const user: UserData = await User.create({ ...userData, password: hashedPassword });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secretKey');

    return { user, token };
  }

  static async loginUser(email: string, password: string) {
    // Find the user by their email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secretKey');

    return {result: { user, token } };
  }

  static async getAllUsers() {
    return User.findAll();
  }

  static async getUser(userId: string) {

    return User.findByPk(userId);

  }

  static async createUser(userData: any) {
    return User.create(userData);
  }

  static async updateUser(userId: string, userData: any) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(userData);
  }

  static async deleteUser(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.destroy();
  }
  
}

export default UserService;
