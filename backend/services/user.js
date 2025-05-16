import bcrypt from "bcrypt";
import UserRepository from "../repositories/user.js";
import { createError } from "../utils/errorUtils.js";

class UserService {
  async createUser(data) {
    const userExist = await UserRepository.findUserByUsername(data.username);

    if (userExist) throw createError("Username already exists.", 409);

    const emailExist = await UserRepository.findUserByEmail(data.email);

    if (emailExist) throw createError("Email address already exists.", 409);

    data.password = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.createUser(data);

    if (!user) throw createError("Unable to create user", 500);

    return user;
  }

  async findUserByUsername(username) {
    const user = await UserRepository.findUserByUsername(username);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async findUserByEmail(email) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async findUserById(id) {
    const user = await UserRepository.findUserById(id);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();

      if (!users) throw createError("User not found", 404);
      console.log(users[0].status.name);
      return users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        expirationDate: user.expirationDate.toISOString().split("T")[0],
      }));
    } catch (error) {
      throw createError("Failed to fetch all users", 500);
    }
  }

  async updateUser(id, data) {
    const user = await UserRepository.updateUser(id, data);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async deleteUser(id) {
    const user = await UserRepository.deleteUser(id);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async saveRefreshToken(userId, token) {
    const user = await UserRepository.saveRefreshToken(userId, token);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async findUserByRefreshToken(token) {
    const user = await UserRepository.findUserByRefreshToken(token);

    if (!user) throw createError("User not found", 404);

    return user;
  }

  async findOrCreate(data) {
    let user = await UserRepository.findUserByGoogleId(data.googleId);

    if (!user) {
      user = await UserRepository.createUser(data);
      if (!user) throw createError("Unable to create user", 500);
    }

    return user;
  }

  async saveRefreshTokenByGoogleId(googleId, token) {
    const user = await UserRepository.saveRefreshTokenByGoogleId(
      googleId,
      token
    );

    if (!user) throw createError("User not found", 404);

    return user;
  }
}

export default new UserService();
