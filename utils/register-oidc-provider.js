import { authClient } from "./auth-client.js";

const { headers } = await signInWithTestUser();
await auth.api.registerSSOProvider({
  body: {
    providerId: "example-provider",
    issuer: "https://idp.example.com",
    domain: "example.com",
    oidcConfig: {
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
      authorizationEndpoint: "https://idp.example.com/authorize",
      tokenEndpoint: "https://idp.example.com/token",
      jwksEndpoint: "https://idp.example.com/jwks",
      discoveryEndpoint:
        "https://idp.example.com/.well-known/openid-configuration",
      scopes: ["openid", "email", "profile"],
      pkce: true,
    },
    mapping: {
      id: "sub",
      email: "email",
      emailVerified: "email_verified",
      name: "name",
      image: "picture",
    },
  },
  headers,
});
