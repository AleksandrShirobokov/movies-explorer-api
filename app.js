const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { MONGO_DB_PATH, PORT } = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(MONGO_DB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено: порт ${PORT}`);
});
