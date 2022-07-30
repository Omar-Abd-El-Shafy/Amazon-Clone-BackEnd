const newError = (statusCode = 400, msg = "Bad request") => {
  const error = new Error(msg);
  error.statusCode = statusCode;
  return error;
};

module.exports = newError;