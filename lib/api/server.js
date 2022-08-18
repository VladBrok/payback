import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function handle(req, res, handlers) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const handler = handlers[req.method];

  if (!handler) {
    res.status(404).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  if (!handler.allowUnauthorized && !session) {
    res.status(401).end();
    return;
  }

  try {
    await handler(req, res, session);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}
