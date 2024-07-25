class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  error.message = error.message || "Internal Server Error";
  error.status = error.status || 500;

  return res
    .status(error.status)
    .json({ success: false, error: error.message });
};

export default CustomError;

