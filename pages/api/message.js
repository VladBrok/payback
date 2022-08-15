import { pusher } from "lib/chat/server";
import { EVENTS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

async function handlePost(req, res, session) {
  const { text, chatId, channelName } = req.body;
  const message = await prisma.message.create({
    data: {
      text: text,
      user: { connect: { id: session.user.id } },
      chat: { connect: { id: chatId } },
    },
  });
  await pusher.trigger(channelName, EVENTS.MESSAGE, message);
  res.status(200).end();
}
