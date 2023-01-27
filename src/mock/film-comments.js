import { getRandomInteger } from '../utils/common';
import { getRandomItem } from './card-film';

import { FILM_COUNT } from '../constants';

const COMMENT_COUNT = 5;

const user = [
  'Пашка Севостьянов',
  'Людка Филатова',
  'Тема Филатов',
  'Ваня Иванов',
  'Сергей Сергеев',
];

const commentText = [
  'Самый переоцененный фильм в истории кинематографа.',
  'Фильм о том, как великие поступки можно совершать, будучи самым простым человеком.',
  'Классика кинематографа!',
  'Хлам и крошево',
  'Эпичный конец',
];

const commentDate = [
  '2019-05-11',
  '2019-08-16',
  '2020-03-20',
  '2022-03-15',
  '2020-04-09',
];

const emotion = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const createComment = () => ({
  user: getRandomItem(user),
  emotion: getRandomItem(emotion),
  commentText: getRandomItem(commentText),
  commentDate: getRandomItem(commentDate),
});

const generateComments = () => {
  const commentCount = getRandomInteger(0, COMMENT_COUNT);
  const filmComments = [];
  for (let i = 0; i < commentCount; i++) {
    const comment = createComment();
    filmComments.push(comment);
  }
  return filmComments;
};

const allComments = {};

const generateFilmComments = () => {
  for (let cardId = 0; cardId < FILM_COUNT; cardId++) {
    allComments[cardId] = generateComments();
  }
};

generateFilmComments();

export default allComments;
