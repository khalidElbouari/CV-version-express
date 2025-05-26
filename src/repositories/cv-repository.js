import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/CVs.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function getAllCVs() {
  return readData();
}

export function getCVById(id) {
  const data = readData();
  return data[id];
}

export function addCV(newCV) {
  const data = readData();
  const newId = `cv${Object.keys(data).length + 1}`;
  data[newId] = newCV;
  writeData(data);
}

export function updateCV(id, updatedCV) {
  const data = readData();
  if (data[id]) {
    data[id] = updatedCV;
    writeData(data);
    return true;
  }
  return false;
}

export function deleteCV(id) {
  const data = readData();
  if (data[id]) {
    delete data[id];
    writeData(data);
    return true;
  }
  return false;
}
