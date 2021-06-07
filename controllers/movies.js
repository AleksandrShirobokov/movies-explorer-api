const Movie = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find(req.params.id)
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId: req.user._id,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      throw new BadRequestError(err.message);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Фильм не найден');
      }
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас нет прав для удаления чужого фильма');
      }
      Movie.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch(next);
};
