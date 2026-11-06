import { sign } from "jsonwebtoken";

const JWT_EXPIRES_IN = "1h";

export type SafeUser = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters");
  }
  return secret;
}

export function createToken(user: SafeUser) {
  return sign({ sub: user.id, email: user.email }, getJwtSecret(), {
    expiresIn: JWT_EXPIRES_IN,
  });
}
