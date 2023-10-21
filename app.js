const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const { base } = require("./models/userModel");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1.) Global Middlewares

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Routes
app.get("/", (req, res) => {
  res.status(200).render("base");
});
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
