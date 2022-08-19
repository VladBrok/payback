import { pusher } from "lib/chat/server";
import { getUserIdsFromChatId } from "lib/chat/chatId";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(_, res, session) {
  const userId = +session.user.id;
  const chats = await prisma.chat.findMany({
    where: { users: { some: { userId } } },
    select: {
      id: true,
      messages: true,
      users: {
        where: { NOT: { userId } },
        select: {
          user: { select: { image: true, name: true, isVerified: true } },
        },
      },
    },
  });

  res.status(200).json(
    chats.map(c => ({
      id: c.id,
      messages: c.messages,
      isVerified: c.users[0].user.isVerified,
      image: c.users[0].user.image,
      name: c.users[0].user.name,
    }))
  );
}

async function handlePost(req, res) {
  // todo: prevent from creating chat with yourself
  const chatId = req.body.chatId;
  const userIds = getUserIdsFromChatId(chatId).map(x => ({ userId: +x }));

  const chat = await transaction(prisma, async prisma => {
    if ((await prisma.chat.count({ where: { id: chatId } })) === 0) {
      const chat = await prisma.chat.create({
        data: { id: chatId, users: { createMany: { data: userIds } } },
      });
      return chat;
    }

    return null;
  });

  if (chat) {
    await Promise.all(
      userIds.map(({ userId }) =>
        pusher.trigger(`${CHANNELS.ENCRYPTED_BASE}${userId}`, EVENTS.CHAT, chat)
      )
    );
  }

  res.status(200).end();
}
