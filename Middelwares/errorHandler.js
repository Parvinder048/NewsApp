import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || []
  });
};

export default errorHandler;
