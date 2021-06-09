const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res.status(err.statusCode).send({ message: statusCode === 500 ? 'Что-то пошло не так' : message });
    next();
  };

module.exports = errorHandler;