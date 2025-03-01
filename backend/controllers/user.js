import { validationResult, matchedData } from "express-validator";

import UserService from "../services/user.js";

class UserController {
  async findUserByUsername(req, res) {
    try {
      const user = await UserService.findUserByUsername(req.params.username);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async findUserByEmail(req, res) {
    try {
      const user = await UserService.findUserByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async findUserById(req, res) {
    try {
      const user = await UserService.findUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const body = matchedData(req);
      const user = await UserService.updateUser(req.params.id, body);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const body = matchedData(req);
      const user = await UserService.createUser(body);
      res.status(201).json({
        message: "User created",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new UserController();
