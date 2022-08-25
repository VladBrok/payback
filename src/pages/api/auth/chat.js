import { handle } from "lib/api/server";
import { CHANNELS } from "lib/chat/constants";
import { canAccessChat, pusher } from "lib/chat/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

function handlePost(req, res, sessionUser) {
  const { socket_id: socketId, channel_name: channel } = req.body;
  const chatId = channel.slice(CHANNELS.ENCRYPTED_BASE.length);
  const userId = sessionUser.id;

  if (!canAccessChat(userId, chatId)) {
    res.status(401).end();
    return;
  }

  const auth = pusher.authenticate(socketId, channel, {
    user_id: userId,
  });
  res.send(auth);
}
