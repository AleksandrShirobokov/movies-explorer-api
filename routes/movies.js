const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { movieValidation, idValidation } = require('../middlewares/validationCheck');

router.get('/', getMovies);
router.post('/', movieValidation, createMovie);
router.delete('/:id', idValidation, deleteMovie);

module.exports = router;
