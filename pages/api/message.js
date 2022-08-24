import { pusher } from "lib/chat/server";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { handle } from "lib/api/server";
import { withPagination } from "lib/db/withPagination";
import { MESSAGE_PAGE_SIZE } from "lib/sharedConstants";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
    PUT: handlePut,
  });
}

async function handleGet(req, res) {
  const chatId = req.query.chatId;
  const pageCursor = req.query.pageCursor;
  const result = await withPagination(
    prisma.message.findMany,
    {
      where: pageCursor
        ? { AND: [{ chatId }, { id: { lt: +pageCursor } }] }
        : { chatId },
      orderBy: { id: "desc" },
    },
    MESSAGE_PAGE_SIZE
  );
  res.status(200).json(result);
}

async function handlePost(req, res, session) {
  const { text, chatId } = req.body;
  const message = await prisma.message.create({
    data: {
      text: text,
      user: { connect: { id: session.user.id } },
      chat: { connect: { id: chatId } },
    },
  });

  await pusher.trigger(
    `${CHANNELS.ENCRYPTED_BASE}${chatId}`,
    EVENTS.MESSAGE,
    message
  );
  res.status(200).end();
}

async function handlePut(req, res) {
  const id = +req.query.id;
  const data = req.body;
  await prisma.message.update({ where: { id }, data });
  res.status(200).end();
}
