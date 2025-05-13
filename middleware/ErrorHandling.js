const ErrorHandling = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.error[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.error[0].message;
  }

  if (error.name === "Kesalahan Terdapat Di Pemilihan Waktu") {
    status = 400;
    message = "Kesalahan Terdapat Di Pemilihan Waktu Atau Tanggal";
  }
  console.log(error.name);

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    status = 400;
    message = error;
  }

  if (error.name === "LoginError") {
    status = 401;
    message = "Please login first";
  }

  if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    status = 401;
    message = "Please check your account";
  }

  if (error.name === "UNAUTHENTICATED") {
    status = 403;
    message = "Access denied";
  }

  if (error.name === "NotFound") {
    status = 404;
    message = "Not Found";
  }

  res.status(status).json({
    message,
  });
};

module.exports = ErrorHandling;
