import { createAuthClient } from "better-auth/client";
import { ssoClient } from "@better-auth/sso/client";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  Plugin: [ssoClient()],
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient();
