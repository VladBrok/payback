import prisma from "lib/db/prisma";
import { handle } from "lib/api/server";
import { enrichUser } from "lib/db/enrichUser";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    res.status(404).end();
    return;
  }

  await enrichUser(id, user);
  res.status(200).json(user);
}
handleGet.allowUnauthorized = true;
