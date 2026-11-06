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

  const places = await prisma.place.findMany({
    include: {
      city: true,
      host: {
        select: { id: true, name: true, email: true, avatar: true },
      },
    },
  });
  return res.status(200).json(places);
}
