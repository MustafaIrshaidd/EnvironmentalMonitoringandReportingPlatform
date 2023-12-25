import express from "express";
import AuthController from "../controllers/auth.controller.js";
const AuthRouter = express.Router();

// Post Routes
AuthRouter.post("/", AuthController.loginAndGetToken);

export default AuthRouter;
