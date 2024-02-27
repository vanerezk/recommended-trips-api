import jwt from "jsonwebtoken";
import { db } from "../database/db-connection.js";

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.SECRET);
      const [[user]] = await db.execute(
        `SELECT id, email, nickName, photo FROM users WHERE id = ?`,
        [id]
      );
      req.currentUser = user;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}
