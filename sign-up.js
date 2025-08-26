import { authClient } from "./utils/auth-client";

const { data, error } = await authClient.signUp.email(
  {
    email,
    password,
    name,
    image,
    callbackURL: "/api/tenant",
  },
  {
    onRequest: (ctx) => {},
    onSuccess: (ctx) => {},
    onError: (ctx) => {
      alert(ctx.error.message);
    },
  }
);
