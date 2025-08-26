import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { generateTokens, verifyRefreshToken } from "../utils/tokenUtils.js";
import { authClient } from "../utils/auth-client.js";

export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  console.log("existingUser", existingUser);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createUser(name, email, hashed);
  console.log("userid", userId);

  res.redirect("/dashboard");
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email =$1",
      [email]
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateTokens(user);
    // res.json(tokens);

    return res.redirect("/dashboard");
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const payload = verifyRefreshToken(refreshToken);
  if (!payload)
    return res.status(403).json({ message: "Invalid refresh token" });

  const tokens = generateTokens({ id: payload.id, email: payload.email });
  res.json(tokens);

  res.json({
    message: "Token refreshed successfully",
    tokens,
  });
};

// export const logout
