import express from "express";
import { checkSchema } from "express-validator";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";
import { requiredUserSchema } from "../validations/user.js";
import {
  authRefreshJWT,
  authVerifyJWT,
  googleAuth,
  googleAuthCallback,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refreshToken", authRefreshJWT, AuthController.refreshToken);
router.get("/verifyToken", authVerifyJWT, AuthController.verifyToken);

router.post(
  "/create",
  checkSchema(requiredUserSchema),
  UserController.createUser
);

//google authentication
router.get("/google", googleAuth, AuthController.googleAuth);
router.get("/google/callback", googleAuthCallback, AuthController.googleAuthCB);

export default router;
