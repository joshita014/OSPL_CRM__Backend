import express from "express";
import UserController from "./user.controller.js";
import { validateUserCreation } from "../../middlewares/validator.middleware.js";
const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", validateUserCreation, userController.signup);
userRouter.post("/signin", userController.signin);
userRouter.post("/signout", userController.signout);

export default userRouter;
