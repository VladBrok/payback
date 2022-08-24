import { pusher } from "lib/chat/server";
import { getUserIdsFromChatId } from "lib/chat/chatId";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { handle } from "lib/api/server";
import { withPagination } from "lib/db/withPagination";
import { CHAT_PAGE_SIZE } from "lib/sharedConstants";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res, session) {
  const userId = +session.user.id;
  const id = req.query.id;

  if (id) {
    const chat = await prisma.chat.findFirst({
      where: { id },
      include: {
        users: {
          where: { NOT: { userId } },
          select: {
            user: { select: { image: true, name: true, isVerified: true } },
          },
        },
      },
    });
    if (!chat) {
      res.status(404).end();
    } else {
      res.status(200).json(mapChat(chat));
    }
    return;
  }

  const pageCursor = req.query.pageCursor;
  const filter = { users: { some: { userId } } };

  const result = await withPagination(
    prisma.chat.findMany,
    {
      where: pageCursor
        ? { AND: [filter, { id: { gt: pageCursor } }] }
        : filter,
      orderBy: { id: "asc" },
      select: {
        id: true,
        messages: {
          where: { AND: [{ wasRead: false }, { NOT: { userId } }] },
        },
        users: {
          where: { NOT: { userId } },
          select: {
            user: { select: { image: true, name: true, isVerified: true } },
          },
        },
      },
    },
    CHAT_PAGE_SIZE
  );

  result.pageData = result.pageData.map(mapChat);
  res.status(200).json(result);
}

function mapChat(chat) {
  return {
    id: chat.id,
    newMessageCount: chat.messages?.length,
    isVerified: chat.users[0].user.isVerified,
    image: chat.users[0].user.image,
    name: chat.users[0].user.name,
  };
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
