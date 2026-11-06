import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { hash } from "bcryptjs";
import { createToken } from "../../../lib/auth";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, name } = req.body ?? {};
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string" ||
    !email.trim() ||
    name.trim().length < 2 ||
    password.length < 12
  ) {
    return res.status(400).json({
      message: "Name, email, and a password of at least 12 characters are required",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingUser) {
    return res.status(409).json({ message: "An account already exists" });
  }

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: await hash(password, 12),
      name: name.trim(),
    },
  });
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return res.status(201).json({
    user: safeUser,
    token: createToken(safeUser),
  });
}
