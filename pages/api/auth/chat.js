import { handle } from "lib/api";
import { pusher } from "lib/chat/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

function handlePost(req, res) {
  const { socket_id: socketId, channel_name: channel, userId } = req.body;
  const auth = pusher.authenticate(socketId, channel, { user_id: userId });
  res.send(auth);
}
