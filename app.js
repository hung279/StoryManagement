const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandle");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
 
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(express.static(path.join(__dirname, 'views')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

const router = require("./routers/index");
const viewRoter = require("./routers/view.router");

app.use("/api", router);
app.use("/", viewRoter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}/`);
});
