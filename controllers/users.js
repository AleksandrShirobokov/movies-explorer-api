const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  BAD_REQUEST_ERROR_MSG,
  WRONG_EMAIL_PASSWORD_MSG,
  USER_ALREADY_EXIST_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user)
    )
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(USER_ALREADY_EXIST_MSG);
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`${BAD_REQUEST_ERROR_MSG}: ${err.message}`);
      } else {
        next(err);
      }
       
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidation: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`${BAD_REQUEST_ERROR_MSG}: ${err.message}`);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(USER_ALREADY_EXIST_MSG);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(WRONG_EMAIL_PASSWORD_MSG);
    })
    .catch(next);
};
