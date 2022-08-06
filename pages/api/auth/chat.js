import { pusher } from "lib/chat/server";

export default async function handler(req, res) {
  const { socket_id: socketId, userId } = req.body;
  const user = { id: userId };

  try {
    const authResponse = pusher.authenticateUser(socketId, user);
    res.send(authResponse);
  } catch (error) {
    console.log("chat auth error", error);
  }
}
