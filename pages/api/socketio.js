import { Server } from "socket.io";

let initializing = false;

export default async function handler(_, res) {
  const httpServer = res.socket.server;

  if (!httpServer.io && !initializing) {
    initializing = true;

    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });
  }

  res.end();
}
