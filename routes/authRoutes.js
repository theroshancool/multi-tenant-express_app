import express from "express";
// import { signup, login, refresh } from "../controllers/authController.js";
import { protect } from "../utils/protect.js";
import {
  signup,
  login,
  loginWithSSO,
  ssoCallback,
} from "../controllers/authController.js";

const router = express.Router();

// new
router.post("/signup", signup);
router.post("/login", login);
router.post("/login/sso", loginWithSSO);
router.get("/callback", ssoCallback);

router.get("/ping", (_req, res) => {
  res.json({ message: "Auth Routes active" });
});

router.get("/secure", protect, (req, res) => {
  res.json({
    message: ` Welcome back, ${req.user.email}!`,
    user: req.user,
  });
});

export default router;
