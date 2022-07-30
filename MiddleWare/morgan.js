const morgan = require("morgan");
const logger = require("../utils/logger");

// morgan(format, options)
// format: this is the default msg format + user-agent
// options: stream: Output stream for writing log lines,
// we use our logger to override the default console stream
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms - :user-agent",
  {
    stream: {
      write: (message) => logger.http(message),
    },
  }
);

module.exports = morganMiddleware;
