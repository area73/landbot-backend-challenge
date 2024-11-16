import { Router } from "express";
import { login, register } from "../controllers/authController";

export const authRoutes = {
  login: "/login",
  register: "/register",
};

const router = Router();
router.post(authRoutes.login, login);
router.post(authRoutes.register, register);

export const authRouter = router;
