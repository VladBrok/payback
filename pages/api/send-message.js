export default function handler(req, res) {
  const message = req.body;

  switch (req.method) {
    case "POST":
      res.socket.server.io.emit("message", message);
      res.status(201).json("");
      break;
  }
}
