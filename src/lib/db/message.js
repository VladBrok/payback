import prisma from "lib/db/prisma";
import { withPagination } from "lib/db/withPagination";
import { MESSAGE_PAGE_SIZE } from "lib/sharedConstants";

export async function getMessages(chatId, pageCursor) {
  return await withPagination(
    prisma.message.findMany,
    {
      where: pageCursor
        ? { AND: [{ chatId }, { id: { lt: +pageCursor } }] }
        : { chatId },
      orderBy: { id: "desc" },
    },
    MESSAGE_PAGE_SIZE
  );
}

export async function createMessage({ text, chatId }, user) {
  return await prisma.message.create({
    data: {
      text: text,
      user: { connect: { id: user.id } },
      chat: { connect: { id: chatId } },
    },
  });
}

export async function updateMessage(data, id) {
  await prisma.message.update({ where: { id }, data });
}
