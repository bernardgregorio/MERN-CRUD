import User from "../models/user.js";

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async findUserByUsername(username) {
    return await User.findOne({ username }).populate("status").exec();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email }).populate("status").exec();
  }

  async findUserById(id) {
    return await User.findById(id).populate("status").exec();
  }

  async getAllUsers() {
    return await User.find().populate("status").exec();
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id).exec();
  }

  async saveRefreshToken(id, token) {
    return await User.findByIdAndUpdate(
      id,
      { refreshToken: token },
      { new: true }
    ).exec();
  }

  async findUserByRefreshToken(token) {
    return await User.findOne({ refreshToken: token }).exec();
  }

  async findUserByGoogleId(id) {
    return await User.findOne({ googleId: id });
  }

  async saveRefreshTokenByGoogleId(googleId, token) {
    return await User.findOneAndUpdate(
      { googleId },
      { refreshToken: token },
      { new: true }
    ).exec();
  }
}

export default new UserRepository();
