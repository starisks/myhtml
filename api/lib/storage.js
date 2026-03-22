import fs from "fs";
import path from "path";

const getPath = (file) => path.join(process.cwd(), "data", file);

export function readJSON(file) {
  const filePath = getPath(file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeJSON(file, data) {
  const filePath = getPath(file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
