import { getSessionUser } from "lib/serverSide";

export async function handle(req, res, handlers) {
  const sessionUser = await getSessionUser({ req, res });
  const handler = handlers[req.method];

  if (!handler) {
    res.status(405).json({ error: `Method ${req.method} is not allowed.` });
    return;
  }

  if (!handler.allowUnauthorized && !sessionUser) {
    res.status(401).end();
    return;
  }

  try {
    await handler(req, res, sessionUser);
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
