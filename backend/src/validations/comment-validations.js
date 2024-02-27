import {
  throwCommentIdIsRequiredError,
  throwRecommendationIdIsRequiredError,
  throwMessageIsRequiredError,
  throwNotFoundError,
  throwUnauthorizedError,
} from "../utils/errors.js";
import { db } from "../database/db-connection.js";

export async function validateCreateCommentPayload({
  message,
  recommendationId,
}) {
  message = validateMessage(message);
  recommendationId = await validateRecommendationId(recommendationId);
  return {
    message,
    recommendationId,
  };
}

export async function validateEditCommentPayload({
  message,
  commentId,
  userId,
  recommendationId,
}) {
  message = validateMessage(message);
  commentId = await validateCommentAndOwner(recommendationId, userId);

  return {
    message,
    commentId,
  };
}

export async function validateDeleteCommentPayload({ commentId, userId }) {
  commentId = await validateCommentAndOwner(recommendationId, userId);

  return {
    commentId,
  };
}

export function validateMessage(message) {
  message = message.trim();
  if (!message) {
    throwMessageIsRequiredError();
  }
  return message;
}

export async function validateRecommendationId(recommendationId) {
  recommendationId = Number(recommendationId);
  if (!recommendationId) {
    throwRecommendationIdIsRequiredError();
  }

  const [[recommendations]] = await db.execute(
    `SELECT * FROM recommendations WHERE id = ? LIMIT 1`,
    [recommendationId]
  );

  if (!recommendations) {
    throwNotFoundError();
  }

  return recommendationId;
}

export async function validateCommentAndOwner(commentId, userId) {
  commentId = Number(commentId);
  if (!commentId) {
    throwCommentIdIsRequiredError();
  }

  const [[comment]] = await db.execute(
    `SELECT * FROM comments WHERE id = ? LIMIT 1`,
    [commentId, userId]
  );

  if (!comment) {
    throwNotFoundError();
  }

  if (comment.userId !== userId) {
    throwUnauthorizedError();
  }

  return commentId;
}
