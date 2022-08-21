import { pusher } from "lib/chat/server";
import { getUserIdsFromChatId } from "lib/chat/chatId";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { withPagination, handle } from "lib/api/server";
import { CHAT_PAGE_SIZE } from "lib/sharedConstants";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res, session) {
  const userId = +session.user.id;
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

  result.pageData = result.pageData.map(chat => ({
    id: chat.id,
    newMessageCount: chat.messages.length,
    isVerified: chat.users[0].user.isVerified,
    image: chat.users[0].user.image,
    name: chat.users[0].user.name,
  }));
  res.status(200).json(result);
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
