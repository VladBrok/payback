import prisma from "lib/db/prisma";
import { handle } from "lib/api/server";
import { getUser } from "lib/db/user";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const user = await getUser(+req.query.id);
  if (!user) {
    res.status(404).end();
  } else {
    res.status(200).json(user);
  }
}
handleGet.allowUnauthorized = true;
