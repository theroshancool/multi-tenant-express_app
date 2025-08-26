import pool from "../config/db.js";
import { authClient } from "../utils/auth-client.js";
import { generateTokens } from "../utils/tokenUtils.js";

// -------------------- SIGNUP --------------------
export const signup = async (req, res) => {
  const { email, password, name, image } = req.body;

  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      callbackURL: "http://localhost:3000/dashboard",
    });

    if (error) {
      console.error("BetterAuth signup error:", error);
      return res.status(400).json({ message: error.message });
    }

    // Ensure user exists in DB
    const result = await pool.query("SELECT * FROM user WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (name, email, image) VALUES ($1, $2, $3)",
        [name || "New User", email, image || null]
      );
    }

    return res.status(201).json({
      message: "Signup successful. Please verify your email.",
      data,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authClient.signIn.email({
      email,
      password,
      callbackURL: "http://localhost:3000/dashboard",
      // res.redirect("/dashboard");
    });

    // BetterAuth returns tokens/session info
    const user = response.user;

    // Sync with DB if not present
    let result = await pool.query("SELECT * FROM user WHERE email = $1", [
      email,
    ]);
    let dbUser = result.rows[0];

    if (!dbUser) {
      const insertRes = await pool.query(
        "INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *",
        [user?.name || "New User", email]
      );
      dbUser = insertRes.rows[0];
    }

    const tokens = generateTokens(dbUser);

    res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });

    // return res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// -------------------- SSO LOGIN --------------------
export const loginWithSSO = async (req, res) => {
  const { email } = req.body;

  try {
    const data = await authClient.signIn.sso({
      email: "john@example.com",
      organizationSlug: "example-org",
      providerId: "example-provider",
      domain: "example.com",
      callbackURL: "https://example.com/callback", // required
      errorCallbackURL: "https://example.com/callback",
      newUserCallbackURL: "https://example.com/new-user",
      scopes: ["openid", "email", "profile", "offline_access"],
      requestSignUp: true,
    });

    return res.redirect(data);
  } catch (err) {
    console.error("SSO login error:", err);
    res.status(500).json({ message: "SSO login failed" });
  }
};

// -------------------- CALLBACK --------------------
export const ssoCallback = async (req, res) => {
  try {
    const authRes = await authClient.handleCallback(req);
    const { email, name } = authRes.user;

    // Ensure user exists in DB
    let result = await pool.query("SELECT * FROM user WHERE email = $1", [
      email,
    ]);
    let user = result.rows[0];

    if (!user) {
      const insertRes = await pool.query(
        "INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *",
        [name || "New User", email]
      );
      user = insertRes.rows[0];
    }

    const tokens = generateTokens(user);

    res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });

    return res.redirect("/dashboard");
  } catch (err) {
    console.error("SSO callback error:", err);
    res.status(500).json({ message: "SSO callback failed" });
  }
};
