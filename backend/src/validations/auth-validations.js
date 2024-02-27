import { db } from "../database/db-connection.js";
import {
  throwEmailIsRequiredError,
  throwPasswordIsRequiredError,
  throwNicknameIsRequiredError,
  throwNicknameInUseError,
  throwPhotoIsRequired,
  throwEmailInUseError,
  throwInvalidPasswordError,
  throwUserNotFoundError,
} from "../utils/errors.js";
import bcrypt from "bcrypt";
import joi from "joi";

//! VALIDACION REGISTRO PUBLICOS Y ANON.
export async function validateRegisterPayload({ email, password, nickName }) {
  email = email.trim();
  password = password.trim();
  nickName = nickName.trim();

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
      .min(8)
      .max(20)
      .required(),
    nickName: joi.string().min(8).max(20).required(),
  });

  const { error } = schema.validate({ email, password, nickName });

  if (error) {
    if (error.details[0].message.includes("password")) {
      throw new Error(
        "Password must contain at least one letter and one number and be between 8 and 20 characters long"
      );
    } else {
      throw new Error(error.details[0].message);
    }
  }

  if (!email) {
    throwEmailIsRequiredError();
  }

  if (!password) {
    throwPasswordIsRequiredError();
  }

  if (!nickName) {
    throwNicknameIsRequiredError();
  }

  const [[maybeUserWithEmail]] = await db.execute(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email]
  );
  if (maybeUserWithEmail) {
    throwEmailInUseError();
  }

  const [[maybeUserWithNickName]] = await db.execute(
    `SELECT * FROM users WHERE nickName = ? LIMIT 1`,
    [nickName]
  );
  if (maybeUserWithNickName) {
    throwNicknameInUseError();
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  return {
    email,
    hashedPassword,
    nickName,
  };
}

//! VALIDACION LOGIN

export async function validateUserLoginPayload({ email, password }) {
  email = email.trim();
  password = password.trim();

  if (!email) {
    throwEmailIsRequiredError();
  }

  if (!password) {
    throwPasswordIsRequiredError();
  }

  const [[user]] = await db.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  if (!user) {
    throwUserNotFoundError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throwInvalidPasswordError();
  }

  return {
    user,
  };
}

//! VALIDACION AGREGAR FOTO

export async function validateAddPhotoPayload(payload) {
  const photo = payload.photo;

  if (!photo) {
    throwPhotoIsRequired();
  }

  return {
    photo,
  };
}
