const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.idValidation = celebrate({
  params: Joi
    .object()
    .keys({
      id: Joi.string().hex().length(24),
    }),
});

module.exports.movieValidation = celebrate({
  body: Joi
    .object()
    .keys({
      country: Joi.string().required().min(1).max(30),
      director: Joi.string().required().min(1).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required().min(4).max(4),
      description: Joi.string().required().min(2).max(256),
      image: Joi.string().required().min(2).max(256)
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
      trailer: Joi.string().required().min(2).max(256)
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(2).max(30),
      nameEN: Joi.string().required().min(2).max(30),
      thumbnail: Joi.string().required().min(2).max(256)
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
    }),
});

module.exports.registrValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.loginValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.userInfoValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
});
