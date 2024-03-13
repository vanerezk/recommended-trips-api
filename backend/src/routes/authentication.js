import express from "express";
import jwt from "jsonwebtoken";
import { wrapWithCatch } from "../utils/wrap-with-catch.js";
import { db } from "../database/db-connection.js";
import {
  validateUserLoginPayload,
  validateRegisterPayload,
  validateAddPhotoPayload,
} from "../validations/auth-validations.js";
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { PHOTOS_DIR, SERVER_HOST } from "../../constants.js";
import { sendOKCreated, sendOK } from "../utils/response.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middlewares/auth.js";
import { loggedInGuard } from "../middlewares/logged-in-guard.js";
import { sendError } from "../utils/response.js";
import {
  throwInvalidFileTypeError,
  throwPasswordMatchError,
  throwUnauthorizedError,
} from "../utils/errors.js";
import { token } from "morgan";

const router = express.Router();

//! RUTA REGISTRO

router.post(
  "/register",
  wrapWithCatch(async (req, res) => {
    const { email, hashedPassword, nickName } = await validateRegisterPayload(
      req.body
    );

    await db.execute(
      `INSERT INTO users(email, password, nickName) 
        VALUES(?,?,?)`,
      [email, hashedPassword, nickName]
    );

    sendOK(res);
  })
);

//! RUTA LOGIN

router.post(
  "/login",
  wrapWithCatch(async (req, res) => {
    const { user } = await validateUserLoginPayload(req.body);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          nickName: user.nickName,
        },
        process.env.SECRET,
        {
          expiresIn: "7d",
        }
      );

      sendOK(res, {
        token,
      });
    } else {
      sendError(res, "User does not exist", 404);
    }
  })
);

//! RUTA USER LOGGEADO

router.get(
  "/user",
  authMiddleware,
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const id = req.currentUser.id;

    const [[user]] = await db.execute(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    sendOK(res, { user });
  })
);

//! CAMBIAR PERFIL DE USUARIO Y AGREGAR FOTO

const fileParser = fileUpload({ createParentPath: true });

router.patch(
  "/user/:id",
  fileParser,
  authMiddleware,
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const id = req.currentUser.id;
    const { nickName, email, currentPassword, newPassword } = req.body;
    const { photo } = await validateAddPhotoPayload({
      photo: req.files?.photo,
      id: req.currentUser.id,
    });

    const [[user]] = await db.execute(
      `SELECT password FROM users WHERE id = ?`,
      [id]
    );

    const password = user.password;

    const passwordMatch = await bcrypt.compare(currentPassword, password);

    if (!passwordMatch) {
      throwPasswordMatchError();
    }

    if (nickName) {
      await db.execute(`UPDATE users SET nickName = ? WHERE id = ?`, [
        nickName,
        id,
      ]);
    }

    if (email) {
      await db.execute(`UPDATE users SET email = ? WHERE id = ?`, [email, id]);
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await db.execute(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPassword,
        id,
      ]);
    }

    if (req.currentUser.id !== Number(req.params.id)) {
      throwUnauthorizedError();
    }

    const allowedFileTypes = [".jpg", ".jpeg", ".png"];

    const fileExtension = path.extname(photo.name);

    if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
      throwInvalidFileTypeError();
    }

    const userPhotoDir = path.join(PHOTOS_DIR, id.toString());
    await fs.mkdir(userPhotoDir, { recursive: true });

    const files = await fs.readdir(userPhotoDir);

    for (const file of files) {
      const filePath = path.join(userPhotoDir, file);
      await fs.unlink(filePath);
    }

    const randomFileName = crypto.randomUUID();
    const newFilePath = `${randomFileName}${fileExtension}`;
    await photo.mv(path.join(userPhotoDir, newFilePath));

    await db.execute("UPDATE users SET photo = ? WHERE id = ?", [
      newFilePath,
      id,
    ]);

    sendOK(res, {
      message: "User updated successfully!",
    });
  })
);

//! GET USER PROFILE BY ID

router.get(
  "/profile/:id",
  authMiddleware,
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const { id } = req.params;

    const [[user]] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    sendOK(res, {
      user,
    });
  })
);
export default router;
