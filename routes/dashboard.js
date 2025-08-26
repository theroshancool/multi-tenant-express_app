import express, { request } from "express";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});

export default router;
