import { pusher } from "lib/chat/server";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import { handle } from "lib/api/server";
import { createChat, getChat, getChats } from "lib/db/chat";

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
  const chat = await createChat(chatId);

  if (chat) {
    await Promise.all(
      userIds.map(({ userId }) =>
        pusher.trigger(`${CHANNELS.ENCRYPTED_BASE}${userId}`, EVENTS.CHAT, chat)
      )
    );
  }

  res.status(200).end();
}
