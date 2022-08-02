export function byUserEmail(email) {
  // fixme: use either username or email as user id (for now, here we use email, in other places we use username)
  return c => (c.users.length ? c.users.find(u => u === email) : true);
}
