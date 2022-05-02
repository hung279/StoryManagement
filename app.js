const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandle");
const cookieParser = require('cookie-parser');
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

  app.set('view engine', 'ejs');
  app.set('views', './views');
  
  app.use(cookieParser('hung'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  

const router = require("./routers/index");
const viewRoter = require("./routers/view.router");
const authRoter = require("./routers/auth.router");

app.use("/", viewRoter);
app.use("/auth", authRoter);
app.use("/api", router);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}/`);
});
