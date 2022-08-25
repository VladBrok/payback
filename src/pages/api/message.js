import { pusher } from "lib/chat/server";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import { handle } from "lib/api/server";
import { createMessage, getMessages, updateMessage } from "lib/db/message";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
    PUT: handlePut,
  });
}

async function handleGet(req, res) {
  const chatId = req.query.chatId;
  const pageCursor = req.query.pageCursor;

  const result = await getMessages(chatId, pageCursor);

  res.status(200).json(result);
}

async function handlePost(req, res, sessionUser) {
  const { text, chatId } = req.body;
  const message = await createMessage({ text, chatId }, sessionUser);

  await pusher.trigger(
    `${CHANNELS.ENCRYPTED_BASE}${chatId}`,
    EVENTS.MESSAGE,
    message
  );

  res.status(200).end();
}

async function handlePut(req, res) {
  await updateMessage(req.body, +req.query.id);
  res.status(200).end();
}
