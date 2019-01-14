const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const getFixturesRouter = require("./api/routes/getfixtures");
const getOddsRouter = require("./api/routes/getodds");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static(path.join(__dirname, "public")));

app.use("/fixtures", getFixturesRouter);
app.use("/odds", getOddsRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource not found!"
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: `Internal server error => ${err}`
  });
});

module.exports = app;
