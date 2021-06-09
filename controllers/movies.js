const Movie = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  BAD_REQUEST_ERROR_MSG,
  MOVIE_NOT_FOUND_MSG,
  FORBIDDEN_DELETE_MOVIE_MSG,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
    movieId,
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
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      throw new BadRequestError(`${BAD_REQUEST_ERROR_MSG}: ${err.message}`);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE_MSG);
      }
      Movie.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch(next);
};
