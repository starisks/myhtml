export default function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/user=([^;]+)/);

  if (!match) return res.json(null);

  try {
    const user = JSON.parse(decodeURIComponent(match[1]));
    res.json(user);
  } catch {
    res.json(null);
  }
}
