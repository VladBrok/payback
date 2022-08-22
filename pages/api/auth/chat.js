import { handle } from "lib/api/server";
import { pusher } from "lib/chat/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

function handlePost(req, res, session) {
  // todo: check if user can access that particular chat
  const { socket_id: socketId, channel_name: channel } = req.body;
  const auth = pusher.authenticate(socketId, channel, {
    user_id: session.user.id,
  });
  res.send(auth);
}
