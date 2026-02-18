// prefix /auth

import express from "express";
import {
  createUser,
  loginUser,
  googleAuth,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// -------------------- AUTH ROUTES -------------------- //
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);   // 👈 Google OAuth
router.post("/logout", logoutUser);

export default router;
