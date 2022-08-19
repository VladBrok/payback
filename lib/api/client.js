export async function postBlob(endpoint, body) {
  const res = await fetchImpl(endpoint, { method: "POST", body });
  return await res.json();
}

export function post(endpoint, body) {
  return fetchPostPutJson(endpoint, body, "POST");
}

export function put(endpoint, body) {
  return fetchPostPutJson(endpoint, body, "PUT");
}

export async function get(endpoint) {
  const res = await fetchImpl(endpoint);
  return await res.json();
}

function fetchPostPutJson(endpoint, body, method) {
  return fetchImpl(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function fetchImpl(endpoint, options) {
  const res = await fetch(endpoint, options);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
}
