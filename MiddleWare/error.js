// we need to send merrors in logs

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).send({ message: err.message });
};
