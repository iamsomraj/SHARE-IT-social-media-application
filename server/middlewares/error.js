const pageNotFound = (req, res, next) => {
  const error = new Error(`Page Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (process.env.NODE_ENV === "development") console.error(err);
  res.status(statusCode).json({
    status: false,
    message: err?.message || "Something went wrong!",
    data: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  pageNotFound,
  errorHandler,
};
