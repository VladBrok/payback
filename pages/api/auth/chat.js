import { pusher } from "lib/chat/server";

// todo: protect with next-auth
export default async function handler(req, res) {
  const { socket_id: socketId, channel_name: channel, userId } = req.body;

  try {
    const auth = pusher.authenticate(socketId, channel, { user_id: userId });
    res.send(auth);
  } catch (error) {
    console.log("chat auth error", error);
    res.status(403).json("");
  }
}
