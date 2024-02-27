export function sendOKCreated(res, id) {
  res.status(201).json({
    success: true,
    id: id,
  });
}

export function sendOK(res, data = {}) {
  res.status(200).json({
    success: true,
    ...data,
  });
}

export function sendError(res, message, status) {
  res.status(status).json({
    error: {
      message: message,
    },
  });
}
