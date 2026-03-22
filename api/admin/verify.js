export function isAdmin(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/user=([^;]+)/);

  if (!match) return false;

  try {
    const user = JSON.parse(decodeURIComponent(match[1]));
    return user.role === "admin";
  } catch {
    return false;
  }
}
