const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandle");
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const cors = require('cors');
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
 
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.set('view engine', 'ejs');
  app.set('views', './views');
  app.use(cors());
  app.use(cookieParser('hung'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  

const router = require("./routers/index");
const viewRouter = require("./routers/view.router");
const adminRouter = require("./routers/admin.router");
const authRouter = require("./routers/auth.router");

app.use("/", viewRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/api", router);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// convert error to ApiError, if needed
app.use(errorHandler.errorConverter);

// handle error
app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
  logger.info(`Listening to http://localhost:${PORT}/`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
