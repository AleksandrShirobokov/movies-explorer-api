const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(https?):\/\/\w*\S*\./.test(url);
      },
      message: 'Неправильный формат адреса',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(https?):\/\/\w*\S*\./.test(url);
      },
      message: 'Неправильный формат адреса',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(https?):\/\/\w*\S*\./.test(url);
      },
      message: 'Неправильный формат адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(ru) {
        return /^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(ru);
      },
      message: 'Название фильма только на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(en) {
        return /^[?!,.a-zA-Z0-9\s]+$/.test(en);
      },
      message: 'Название фильма только на английском языке',
    },
  },
});
module.exports = mongoose.model('movies', moviesSchema);
