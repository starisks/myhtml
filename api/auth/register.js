import { readJSON, writeJSON } from "../lib/storage.js";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  const users = readJSON("users.json");

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ error: "User exists" });
  }

  users.push({
    id: Date.now().toString(),
    username,
    password, // (for demo only — hash in real apps)
    role: "user"
  });

  writeJSON("users.json", users);

  res.json({ success: true });
}
