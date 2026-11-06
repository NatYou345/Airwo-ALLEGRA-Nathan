import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = Number(req.query.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ message: "Invalid place id" });
  }

  const place = await prisma.place.findUnique({
    where: {
      id,
    },
    include: {
      city: true,
      host: {
        select: { id: true, name: true, email: true, avatar: true },
      },
    },
  });
  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }
  return res.status(200).json(place);
}
