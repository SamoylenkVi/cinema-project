import AbstractView from './abstract';
import {
  addActiveButtonClass,
  cutText,
  humanizedRuntime,
} from '../utils/card';
import { TEXT_LIMIT, ACTIVE_BUTTON_CLASS } from '../constants';

const createMovieCardTemplate = (movieCard) => {
  const {
    comments,
    title,
    rating,
    poster,
    productionYear,
    runtime,
    genre,
    description,
    isWatchList,
    isWatched,
    isFavorite,
  } = movieCard;

  const cardDescription = cutText(description, TEXT_LIMIT);

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${productionYear}</span>
    <span class="film-card__duration">${humanizedRuntime(runtime)}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${cardDescription}</p>
  <a class="film-card__comments"> ${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${addActiveButtonClass(isWatchList, ACTIVE_BUTTON_CLASS)} film-card__controls-item--add-to-watchlist" data-watchlist type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isWatched, ACTIVE_BUTTON_CLASS)} film-card__controls-item--mark-as-watched" data-watched type="button">Mark as watched</button>
    <button class="film-card__controls-item ${addActiveButtonClass(isFavorite, ACTIVE_BUTTON_CLASS)} film-card__controls-item--favorite" data-favorite type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._addToSpecialListHandler = this._addToSpecialListHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._filmCard);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();

    this._callback.popup();
  }

  setOpenPopupHandler(callback) {
    this._callback.popup = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupHandler);
  }

  _addToSpecialListHandler(evt) {
    evt.preventDefault();
    this._callback.specialList({
      isAddedToWatchList: evt.target.hasAttribute('data-watchlist'),
      isAddedToWatched: evt.target.hasAttribute('data-watched'),
      isAddedToFavorite: evt.target.hasAttribute('data-favorite'),
    });
  }

  setSpecialListHandler(callback) {
    this._callback.specialList = callback;

    this.getElement().querySelector('.film-card__controls').addEventListener(
      'click',
      this._addToSpecialListHandler,
    );
  }
}
