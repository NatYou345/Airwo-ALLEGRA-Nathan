import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { compare } from "bcryptjs";
import { createToken } from "../../../lib/auth";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body ?? {};
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return res.status(200).json({
    user: safeUser,
    token: createToken(safeUser),
  });
}
