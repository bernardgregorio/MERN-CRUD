import express from "express";
import { checkSchema } from "express-validator";

import UserController from "../controllers/user.js";
import { requiredUserSchema, updateUserSchema } from "../validations/user.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router
  .route("/:id")
  .get(UserController.findUserById)
  .put(checkSchema(requiredUserSchema), UserController.updateUser)
  .patch(checkSchema(updateUserSchema), UserController.updateUser)
  .delete(UserController.deleteUser);

router.post(
  "/create",
  checkSchema(requiredUserSchema),
  UserController.createUser
);

export default router;
