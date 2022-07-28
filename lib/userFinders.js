export function byId(id) {
  return u => u.login.username === id;
}
