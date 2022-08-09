import { getUserIdsFromChatId } from "lib/chat/getUserIdsFromChatId";
import prisma from "lib/prisma";

// fixme: change error codes
// fixme: protect with next-auth
export default async function handler(req, res) {
  let handle;

  if (req.method === "GET") {
    handle = handleGet;
  } else if (req.method === "POST") {
    handle = handlePost;
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  try {
    await handle(req, res);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Fail" });
  }
}

async function handleGet(req, res) {
  const userId = +req.query.userId;
  const chats = await prisma.chat.findMany({
    where: { users: { some: { userId } } },
    select: {
      id: true,
      users: {
        where: { NOT: { userId } },
        select: { user: { select: { image: true, name: true } } },
      },
    },
  });

  res.status(200).json(
    chats.map(c => ({
      id: c.id,
      image: c.users[0].user.image,
      name: c.users[0].user.name,
    }))
  );
}

async function handlePost(req, res) {
  const chatId = req.body.chatId;
  const userIds = getUserIdsFromChatId(chatId).map(x => ({ userId: +x }));
  const chat = await prisma.chat.create({
    data: { id: chatId, users: { createMany: { data: userIds } } },
  });

  res.status(200).json(chat);
}
