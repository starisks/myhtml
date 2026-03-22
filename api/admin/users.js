import { readJSON } from "../lib/storage.js";
import { isAdmin } from "./verify.js";

export default function handler(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const users = readJSON("users.json");
  res.json(users);
}
