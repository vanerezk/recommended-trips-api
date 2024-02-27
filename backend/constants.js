import path from "path";
import fs from "fs/promises";

export const PUBLIC_DIR = path.join(process.cwd(), "public");
export const PHOTOS_DIR = path.join(PUBLIC_DIR, "photos");

export const PORT = process.env.PORT || 3000;
export const SERVER_HOST =
  process.env.SERVER_HOST || `http://localhost:${PORT}`;

const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

export { generateError, createPathIfNotExists };
