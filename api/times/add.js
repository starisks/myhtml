import { readJSON, writeJSON } from "../lib/storage.js";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const cookie = req.headers.cookie || "";
  if (!cookie.includes("user=")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = JSON.parse(
    decodeURIComponent(cookie.split("user=")[1].split(";")[0])
  );

  const times = readJSON("times.json");

  times.push({
    userId: user.id,
    username: user.username,
    time: req.body.time,
    createdAt: new Date().toISOString()
  });

  writeJSON("times.json", times);

  res.json({ success: true });
}
