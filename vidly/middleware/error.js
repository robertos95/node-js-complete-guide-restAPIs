const winston = require("winston");

module.exports = function (err, req, res, next) {
  // Log the exception
  res.status(500).send("Something failed");

  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly
};
