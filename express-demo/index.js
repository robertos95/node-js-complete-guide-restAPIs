const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
// app.set('views', './views'); // default value

// GET ENVIRONMENT
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // default is undefined
// console.log(`app: ${app.get('env')}`); // default is development

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
console.log("Mail Server Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  startupDebugger("Morgan enabled...");
  app.use(morgan("tiny"));
}

// Db work
dbDebugger("Connected to the database");

app.use(logger);
app.use(authenticator);

app.use("/", home);
app.use("/api/courses", courses);

function validateCourse(course) {
  const schema = { name: Joi.string().min(3).required() };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
