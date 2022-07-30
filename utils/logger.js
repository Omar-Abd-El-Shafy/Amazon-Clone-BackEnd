const winston = require("winston");

// methods to be used with the created logger
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// defines which log level to be used based on env
// if env is development, then all log levels msgs will be shown
// else if env is production, then only warn and error log msgs will be shown
const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn";
};

// Define different colors for each level
// only applies in console
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
winston.addColors(colors);

// customizing the log format
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define which transports the logger must use to print out messages
const transports = [
  // use console to show log
  new winston.transports.Console({
    // to color logs in console
    format: winston.format.colorize({ all: true }),
  }),
  // only save error logs in this file
  new winston.transports.File({
    filename: "logs/errors.log",
    level: "error",
  }),
  //   show all logs in this file
  new winston.transports.File({
    filename: "logs/all.log",
  }),
];

// logger obj
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
