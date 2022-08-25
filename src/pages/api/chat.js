import { pusher } from "lib/chat/server";
import { getUserIdsFromChatId } from "lib/chat/chatId";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { handle } from "lib/api/server";
import { getChat, getChats } from "lib/db/chat";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res, sessionUser) {
  const userId = +sessionUser.id;
  const id = req.query.id;

  if (id) {
    const chat = await getChat(id, userId);
    if (!chat) {
      res.status(404).end();
    } else {
      res.status(200).json(chat);
    }
  } else {
    const result = await getChats(req.query.pageCursor, userId);
    res.status(200).json(result);
  }
}

async function handlePost(req, res) {
  const chatId = req.body.chatId;
  const ids = getUserIdsFromChatId(chatId);
  const uniqueIds = new Set(ids);

  if (ids.length !== uniqueIds.size) {
    throw new Error("Chat cannot contain duplicate users");
  }

  const userIds = ids.map(x => ({ userId: +x }));
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