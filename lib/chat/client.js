import SocketIOClient from "socket.io-client";

export function connect(data, onMessage, onError) {
  const socket = SocketIOClient.connect(window.location.origin, {
    path: "/api/socketio",
    reconnectionAttempts: process.env.NEXT_PUBLIC_RECONNECTION_ATTEMPTS,
  });

  socket.on("error", e => onError(`Client ${error}: ${e}`));
  socket.on("message", onMessage);

  return () => socket?.disconnect();
}
