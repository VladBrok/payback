export function post(endpoint, body) {
  return fetchImpl(endpoint, body, "POST");
}

function fetchImpl(endpoint, body, method) {
  return fetch(`/api/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

// fixme: protect with next-auth
export async function handle(req, res, handlers) {
  const handler = handlers[req.method];
  if (!handler) {
    res.status(404).json({ error: `Method ${req.method} is not supported.` });
  }

  try {
    await handler(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}
