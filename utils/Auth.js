import { betterAuth } from "better-auth";
import pool from "../config/db.js";
import { sso } from "@better-auth/sso";

export const auth = betterAuth({
  database: pool,
  plugins: [sso()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
});
