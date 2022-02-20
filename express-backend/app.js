const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const logger = require("morgan");
const cors = require("cors");
const db = require("./db/index"); // connecting to the database => the "db" variable represents that connection.
const dbHelpers = require("./helpers/users_helpers")(db); // using the database we created inside the helpers functions. db_helpers.js then returns an object containing the different functions.

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const transactionsRouter = require("./routes/transactions");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  key: "userId", 
  secret: "project", 
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  }
}))
app.use("/", indexRouter);
app.use("/api/users", usersRouter(dbHelpers, db)); // this route receives the db_helpers functions.
// app.use("/api/transactions", transactionsRouter(dbHelpers));

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
