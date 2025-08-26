import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./Auth.js";

export const protect = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    req.user = session.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized" });
  }
};
