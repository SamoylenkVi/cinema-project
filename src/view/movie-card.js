import AbstractView from './abstract';
import { addActiveButtonClass, cutText } from '../utils/card';
import allComments from '../mock/film-comments';
import { TEXT_LIMIT, ACTIVE_BUTTON_CLASS } from '../constants';

const dayjs = require('dayjs');

const createMovieCardTemplate = (movieCard) => {
  const {
    id,
    name,
    rating,
    poster,
    productionYear,
    filmDuration,
    genre,
    description,
    isWatchList,
    isWatched,
    isFavorite,
  } = movieCard;

  const cardComments = allComments[id];

  const cardDescription = cutText(description, TEXT_LIMIT);

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
  <a class="film-card__comments"> ${cardComments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${addActiveButtonClass(isWatchList, ACTIVE_BUTTON_CLASS)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isWatched, ACTIVE_BUTTON_CLASS)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isFavorite, ACTIVE_BUTTON_CLASS)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();

    this._filmCard = filmCard;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._filmCard);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
