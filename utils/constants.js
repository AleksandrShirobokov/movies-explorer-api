const CRASH_TEST_MSG = 'Сервер сейчас упадёт';

const BAD_REQUEST_ERROR_MSG = 'Формат переданных данных некорректный';
const UNAUTHORIZED_ERROR_MSG = 'Необходима авторизация';
const NOT_FOUND_ERROR_MSG = 'Ресурс не найден';
const MOVIE_NOT_FOUND_MSG = 'Фильм с таким id не найден';
const FORBIDDEN_DELETE_MOVIE_MSG = 'Нет прав на удаление фильма';
const USER_ALREADY_EXIST_MSG = 'Пользователь с такой почтой уже существует';
const WRONG_EMAIL_PASSWORD_MSG = 'Неправильная почти и(или) пароль';
const PASSWORD_REQUIRED_MSG = 'Требуется указание поля password';
const NOT_VALID_URL_MSG = 'Некорректный URL адрес';

const MOVIE_SCHEMA_VALIDATION_MSG = {
  COUNTRY: 'страна создания фильма - обязательное поле-строка',
  DIRECTOR: 'длительность фильма - обязательное поле-число',
  DURATION: 'год выпуска фильма - обязательное поле-строка',
  YEAR: 'год выпуска фильма - обязательное поле-строка',
  DESCRIPTION: 'описание фильма - обязательное поле-строка',
  IMAGE: 'ссылка на постер к фильму - обязательное поле-строка в формате URL-адреса',
  TRAILER: 'ссылка на трейлер фильма - обязательное поле-строка в формате URL-адреса',
  THUMBNAIL: 'миниатюрное изображение постера к фильму - обязательное поле-строка в формате URL-адреса',
  MOVIE_ID: ' _id фильма, который содержится в ответе сервиса MoviesExplorer - обязательное поле-число',
  NAME_RU: 'название фильма на русском языке - обязательное поле-строка',
  NAME_EN: ' название фильма на английском языке - обязательное поле-строка',
};

const USER_SCHEMA_VALIDATION_MSG = {
  EMAIL: 'почта пользователя, по которой он регистрируется - обязательное уникальное поле-строка в формате E-mail',
  PASSWORD: 'пароль - обязательное поле-строка',
  NAME: 'имя пользователя - обязательное поле-строка от 2 до 30 символов.',
};

module.exports = {
  CRASH_TEST_MSG,
  BAD_REQUEST_ERROR_MSG,
  UNAUTHORIZED_ERROR_MSG,
  NOT_FOUND_ERROR_MSG,
  MOVIE_NOT_FOUND_MSG,
  FORBIDDEN_DELETE_MOVIE_MSG,
  USER_ALREADY_EXIST_MSG,
  WRONG_EMAIL_PASSWORD_MSG,
  PASSWORD_REQUIRED_MSG,
  NOT_VALID_URL_MSG,
  MOVIE_SCHEMA_VALIDATION_MSG,
  USER_SCHEMA_VALIDATION_MSG,
};
