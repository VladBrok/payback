import prisma from "lib/db/prisma";
import { withPagination } from "lib/db/withPagination";
import { CHAT_PAGE_SIZE } from "lib/sharedConstants";
import { getUserIdsFromChatId } from "lib/chat/chatId";
import { transaction } from "lib/db/transaction";

export async function getChat(id, userId) {
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

  return mapChat(chat);
}

export async function getChats(pageCursor, userId) {
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
  return result;
}

function mapChat(chat) {
  if (!chat) {
    return;
  }

  return {
    id: chat.id,
    newMessageCount: chat.messages?.length,
    isVerified: chat.users[0].user.isVerified,
    image: chat.users[0].user.image,
    name: chat.users[0].user.name,
  };
}

export async function createChat(id) {
  const ids = getUserIdsFromChatId(id);
  const uniqueIds = new Set(ids);

  if (ids.length !== uniqueIds.size) {
    throw new Error("Chat cannot contain duplicate users");
  }

  const userIds = ids.map(x => ({ userId: +x }));

  return await transaction(prisma, async prisma => {
    if ((await prisma.chat.count({ where: { id } })) === 0) {
      const chat = await prisma.chat.create({
        data: { id, users: { createMany: { data: userIds } } },
      });
      return chat;
    }

    return null;
  });
}
