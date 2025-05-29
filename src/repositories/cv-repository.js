import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/CVs.json");

async function readData() {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function writeData(data) {
  const json = JSON.stringify(data, null, 2);
  await writeFile(filePath, json, "utf8");
}

export async function getAllCVs() {
  return await readData();
}

export async function getCVById(id) {
  const data = await readData();
  return data[id];
}

export async function addCV(newCV) {
  const data = await readData();
  const newId = `cv${Object.keys(data).length + 1}`;
  data[newId] = newCV;
  await writeData(data);
}

export async function updateCV(id, updatedCV) {
  const data = await readData();
  if (data[id]) {
    data[id] = updatedCV;
    await writeData(data);
    return true;
  }
  return false;
}

export async function deleteCV(id) {
  const data = await readData();
  if (data[id]) {
    delete data[id];
    await writeData(data);
    return true;
  }
  return false;
}
