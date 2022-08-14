import { isSignatureValid } from "lib/payment/server";
import prisma from "lib/db/prisma";

// fixme: change error codes
// fixme: protect with next-auth
// fixme: dup
export default async function handler(req, res) {
  let handle;

  if (req.method === "POST") {
    handle = handlePost;
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  try {
    await handle(req, res);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Fail" });
  }
}

async function handlePost(req, res) {
  const data = req.body;
  if (!isSignatureValid(data)) {
    throw new Error("Invalid signature");
  }

  const id = +req.query.id;
  await prisma.product.update({ where: { id }, data: { isSold: true } });
  res.status(200).end();
}
