import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function handle(req, res, handlers) {
  let session;

  const handler = handlers[req.method];
  if (!handler) {
    res.status(404).json({ error: `Method ${req.method} is not supported.` });
  }

  if (!handler.allowUnauthorized) {
    session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).end();
      return;
    }
  }

  try {
    await handler(req, res, session);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}
