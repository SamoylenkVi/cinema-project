import { cutText, addActiveButtonClass } from '../utils';
import allComments from '../mock/film-comments';

const dayjs = require('dayjs');

const TEXT_LIMIT = 140;
const ACTIVE_BUTTON_CLASS = 'film-card__controls-item--active';

const createMovieCardTemplate = (movieCard) => {
  const {
    name,
    rating,
    poster,
    productionYear,
    filmDuration,
    genre,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
    commentId,
  } = movieCard;

  const cardDescription = cutText(description, TEXT_LIMIT);
  // const filmComment = createComment(commentId, allComments);

  return `<article class="film-card">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(productionYear).format('YYYY')}</span>
    <span class="film-card__duration">${filmDuration}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${cardDescription}</p>
  <a class="film-card__comments"> ${allComments[commentId].length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${addActiveButtonClass(isWatchlist, ACTIVE_BUTTON_CLASS)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isWatched, ACTIVE_BUTTON_CLASS)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isFavorite, ACTIVE_BUTTON_CLASS)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default createMovieCardTemplate;
