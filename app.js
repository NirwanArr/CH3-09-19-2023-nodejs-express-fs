// OUR OWN PACKAGE/MODULE
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// THIRD PARTY PACKAGE/MODULE
const express = require("express");
const morgan = require("morgan");

const app = express();

// middleware dari express
// memodifikasi incoming request/request body ke api kita
app.use(express.json());
app.use(morgan("dev"));

// OUR OWN MUDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
