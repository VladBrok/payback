import { pusher } from "lib/chat/server";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  const data = req.body;
  const message = await prisma.message.create({
    data: {
      text: data.text,
      user: { connect: { id: data.userId } },
      chat: { connect: { id: data.chatId } },
    },
  });
  await pusher.trigger(CHANNELS.ENCRYPTED_TEST, EVENTS.MESSAGE, message);
  res.status(200).json("");
}
