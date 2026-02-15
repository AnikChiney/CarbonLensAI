//prefix   /auth

import express from "express";
import {
  createUser,
  loginUser,
  googleAuth,
  logoutUser,
  authTest,
  authPostTest,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/authTest", authTest);
router.post("/authPostTest", authPostTest);

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);   // 👈 IMPORTANT
router.post("/logout", logoutUser);

export default router;

