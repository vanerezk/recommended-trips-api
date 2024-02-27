//! ERROR MESSAGES

export function throwUnauthorizedError() {
  throw {
    httpStatus: 401,
    error: "UNAUTHORIZED",
    message: "Unauthorized",
  };
}

export function throwNotFoundError() {
  throw {
    httpStatus: 404,
    error: "NOT_FOUND",
    message: "Not found",
  };
}

//! ERROR EMAIL

export function throwEmailInUseError() {
  throw {
    httpStatus: 409,
    error: "EMAIL_IN_USE",
    message: "Email is already in use",
  };
}

export function throwEmailIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "EMAIL_IS_REQUIRED",
    message: "Email is required",
  };
}

//! ERROR NICKNAME

export function throwNicknameInUseError() {
  throw {
    httpStatus: 409,
    error: "NICKNAME_IN_USE",
    message: "Nickname is already in use",
  };
}

export function throwNicknameIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "NICKNAME_IS_REQUIRED",
    message: "Nickname is required",
  };
}

//! ERROR USER

export function throwUserNotFoundError() {
  throw {
    httpStatus: 404,
    error: "USER_NOT_FOUND",
    message: "User not found",
  };
}

//! ERROR RECOMENDACIONES

export function throwRecommendationIdIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "RECOMMENDATION_ID_IS_REQUIRED",
    message: "Recommendation id is required",
  };
}

export function throwRecommendationAlreadyExistsError() {
  throw {
    httpStatus: 409,
    error: "RECOMMENDATION_ALREADY_EXISTS",
    message: "Recommendation already exists",
  };
}

export function throwTitleIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "TITLE_IS_REQUIRED",
    message: "Title is required",
  };
}

export function throwCategoryIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "CATEGORY_IS_REQUIRED",
    message: "Category is required",
  };
}

export function throwDescriptionIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "DESCRIPTION_IS_REQUIRED",
    message: "Description is required",
  };
}

export function throwInvalidLocationError() {
  throw {
    httpStatus: 409,
    error: "INVALID_LOCATION",
    message: "Invalid location",
  };
}
export function throwLocationIsRequired() {
  throw {
    httpStatus: 409,
    error: "LOCATION_IS_REQUIRED",
    message: "Location is required",
  };
}

//! ERROR PHOTOS

export function throwPhotoIsRequired() {
  throw {
    httpStatus: 409,
    error: "PHOTO_IS_REQUIRED",
    message: "Photo is required",
  };
}

export function throwImageIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "IMAGE_IS_REQUIRED",
    message: "Image is required",
  };
}

export function throwInvalidFileTypeError() {
  throw {
    httpStatus: 415,
    error: "INVALID_FILE_TYPE",
    message: "Invalid file type, try uploading a .jpg or .png image",
  };
}

//! ERROR COMMENTS

export function throwMessageIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "MESSAGE_IS_REQUIRED",
    message: "Message is required",
  };
}

export function throwCommentIdIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "COMMENT_ID_IS_REQUIRED",
    message: "Comment id is required",
  };
}

export function throwCommentNotFoundError() {
  throw {
    httpStatus: 404,
    error: "COMMENT_NOT_FOUND",
    message: "Comment not found",
  };
}

//! ERROR PASSWORD

export function throwPasswordIsRequiredError() {
  throw {
    httpStatus: 409,
    error: "PASSWORD_IS_REQUIRED",
    message: "Password is required",
  };
}

export function throwInvalidPasswordError() {
  throw {
    httpStatus: 409,
    error: "INVALID_PASSWORD",
    message: "Invalid password",
  };
}

export function throwInvalidOldPasswordError() {
  throw {
    httpStatus: 409,
    error: "INVALID_OLD_PASSWORD",
    message: "Invalid password, try again.",
  };
}

export function throwPasswordMatchError() {
  throw {
    httpStatus: 409,
    error: "PASSWORD_MATCH",
    message: "Passwords do not match",
  };
}

//! ERROR LIKES

export function throwLikeNotFoundError() {
  throw {
    httpStatus: 404,
    error: "LIKE_NOT_FOUND",
    message: "Like not found",
  };
}

export function throwExistingLikeError() {
  throw {
    httpStatus: 409,
    error: "EXISTING_LIKE",
    message: "You have already liked this recommendation!",
  };
}
