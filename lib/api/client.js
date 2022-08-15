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
