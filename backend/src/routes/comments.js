import express from "express";
import { wrapWithCatch } from "../utils/wrap-with-catch.js";
import { sendError, sendOK, sendOKCreated } from "../utils/response.js";
import { db } from "../database/db-connection.js";
import { validateCreateCommentPayload } from "../validations/comment-validations.js";
import { loggedInGuard } from "../middlewares/logged-in-guard.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  throwUnauthorizedError,
  throwCommentNotFoundError,
} from "../utils/errors.js";

const router = express.Router();
router.use(authMiddleware);

// ! CREAR COMENTARIOS

router.post(
  "/recommendations/:id/comments",
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const recommendationId = req.params.id;
    const { message } = await validateCreateCommentPayload({
      message: req.body.message,
      recommendationId: recommendationId,
    });

    const userId = req.currentUser.id;

    const [{ insertId }] = await db.execute(
      `INSERT INTO comments(message, recommendationId, userId ) VALUES(?,?,?)`,
      [message, recommendationId, userId]
    );

    sendOKCreated(res, insertId, message);
  })
);

// ! ELIMINAR COMENTARIOS

router.delete(
  "/recommendations/:id/comments/:commentId",
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const recommendationId = req.params.id;
    const userId = req.currentUser.id;

    const [[comment]] = await db.execute(
      `SELECT * FROM comments WHERE id = ?`,
      [req.params.commentId]
    );

    if (!comment) {
      throwCommentNotFoundError();
    }

    if (comment.userId !== userId) {
      throwUnauthorizedError();
    }

    await db.execute(
      `DELETE FROM comments WHERE id = ? AND recommendationId = ?`,
      [req.params.commentId, recommendationId]
    );

    sendOK(res, "Comment deleted");
  })
);

export default router;
