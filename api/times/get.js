import { readJSON } from "../lib/storage.js";

export default function handler(req, res) {
  let times = readJSON("times.json");

  times.sort((a, b) => a.time - b.time);

  res.json(times);
}
