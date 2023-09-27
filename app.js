// OUR OWN PACKAGE/MODULE
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// THIRD PARTY PACKAGE/MODULE
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");

const app = express();

// middleware dari express
// memodifikasi incoming request/request body ke api kita
app.use(express.json());
app.use(morgan("dev"));
const swaggerDocument = yaml.load(
  fs.readFileSync(
    "./swagger/swagger.yaml",
    "utf-8"
  )
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(express.static(`${__dirname}/public`));

// OUR OWN MUDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
