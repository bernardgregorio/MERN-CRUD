import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult, matchedData } from "express-validator";

import UserService from "../services/user.js";
import { clearCookie, createCookie } from "../utils/cookieUtils.js";
import { createError } from "../utils/errorUtils.js";
import { logger } from "../utils/loggerUtils.js";

dotenv.config();

class AuthController {
  async login(req, res, next) {
    try {
      const user = await UserService.findUserByUsername(req.body.username);
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) throw createError("Invalid credentials", 401);

      const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      await UserService.saveRefreshToken(user._id, refreshToken);
      createCookie("jwt", refreshToken, 24 * 60 * 60 * 1000, res);
      res.status(200).json({ token: accessToken });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async logout(req, res, next) {
    if (!req.cookies && !req.cookies.jwt) {
      return res.status(400).json({ message: "No token found" });
    }

    clearCookie("jwt", res);
    res.status(200).json({ message: "Logged out" });
  }

  async register(req, res, next) {
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

  async refreshToken(req, res, next) {
    const user = req.user;
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: accessToken });
  }

  async googleAuth(req, res, next) {
    logger.info("Google Auth");
  }

  async googleAuthCB(req, res, next) {
    logger.info("Google Callback");

    const user = req.user;

    const verifyToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3m" }
    );

    createCookie("verifyToken", verifyToken, 60 * 1000, res);

    res.status(200).redirect(`http://localhost:5173/google`);
  }

  async verifyToken(req, res, next) {
    logger.info("Google Verify");

    const user = req.user;
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    await UserService.saveRefreshToken(user._id, refreshToken);
    createCookie("jwt", refreshToken, 24 * 60 * 60 * 1000, res);
    res.status(200).json({ token: accessToken });
  }
}

export default new AuthController();
