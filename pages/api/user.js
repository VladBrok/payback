import { makeChatId } from "lib/chat/makeChatId";
import prisma from "lib/prisma";

const SUPPORT_CHAT_ID = "0";

// todo: protect with next-auth
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await handlePost(req, res);
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
  }
}

async function handlePost(req, res) {
  const data = req.body;
  let user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (user == null) {
    user = await createUser(data);
  }

  res.status(200).json(user);
}

async function createUser(data) {
  // fixme: add chat after the user was created so that we know his actual id
  const userId = (await prisma.user.count()) + 1;
  const chatId = makeChatId([SUPPORT_CHAT_ID, userId]);

  return await prisma.user.create({
    data: {
      ...data,
      id: userId,
      chats: {
        create: [
          {
            chat: { create: { id: chatId, image: "", name: chatId } }, // todo: remove image and name
          },
        ],
      },
    },
  });
}
