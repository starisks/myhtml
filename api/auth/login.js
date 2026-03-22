import { readJSON } from "../lib/storage.js";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  const users = readJSON("users.json");

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Simple cookie auth
  res.setHeader(
    "Set-Cookie",
    `user=${JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role
    })}; Path=/; HttpOnly`
  );

  res.json({ success: true });
}
