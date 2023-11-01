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
const viewRouter = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const User = require("./models/userModel");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1.) Global Middlewares

app.use(cors());
app.options("*", cors());

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

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Recommendation System Implementation
app.get("/api/fetchMatchingNames", (req, res) => {
  const targetName = req.query.targetName;

  User.find({ name: targetName }, "name", (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Error fetching users" });
    } else {
      const names = users.map((user) => user.name);
      console.log(`Users with name '${targetName}':`, names);
      res.json(names);
    }
  });
});

// Recommendation System implementation fiinished

//Routes
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
