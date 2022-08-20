import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function handle(req, res, handlers) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const handler = handlers[req.method];

  if (!handler) {
    res.status(405).json({ error: `Method ${req.method} is not allowed.` });
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
    res.status(500).json();
  }
}

export async function withPagination(callback, args, pageSize) {
  const argsWithTake = Object.assign({ take: pageSize + 1 }, args);

  const data = await callback(argsWithTake);
  const gotEnoughData = data.length >= pageSize + 1;

  const newCursor = gotEnoughData ? data.at(-2).id : undefined;
  const pageData = gotEnoughData ? data.slice(0, -1) : data;

  return { pageData, pageCursor: newCursor };
}
