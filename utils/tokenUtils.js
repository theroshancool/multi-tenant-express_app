import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "accessSecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "resreshSecret";

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err) {
    return null;
  }
};
