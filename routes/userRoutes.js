import express from "express";
import {
  userSignup,
  userLogin,
  refresh,
} from "../controllers/usercontroller.js";
import { protect } from "../utils/protect.js";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "Auth Routes active" });
});

router.get("/secure", protect, (req, res) => {
  res.json({
    message: ` Welcome back, ${req.user.email}!`,
    user: req.user,
  });
});

// router.post("/login", login);
// router.post("/signup", signup);

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/refresh-token", refresh);

// router.post("/login", login);
// router.post("/refresh-token", refresh);

export default router;
