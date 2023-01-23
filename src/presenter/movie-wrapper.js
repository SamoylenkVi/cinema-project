import EmptyFilmMessageView from '../view/message-empty-film-list';
import ShowMoreButtonView from '../view/show-more-button';
import MovieWrapperView from '../view/movie-wrapper';
import MovieCardPresenter from './movie';

import {
  renderElement, RenderPosition, remove,
} from '../utils/render';

import { updateItem } from '../utils/common';

const TASK_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmContainer, classNameSection, title, containerListAttribute) {
    this._filmContainer = filmContainer;
    this._emptyFilmMessage = new EmptyFilmMessageView();
    this._showMoreButton = new ShowMoreButtonView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmUpdate = this._handleFilmUpdate.bind(this);

    this._movieWrapper = new MovieWrapperView(
      classNameSection,
      title,
      containerListAttribute,
    );

    this._filmsPresenter = {};
    this._movieWrapperList = null;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._renderFilmsContainer();

    if (filmCards.length > 0) {
      this._renderCardsFilm(0, this._renderedTaskCount);
    } else {
      this._renderNoFilmsMessage();
    }

    if (filmCards.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _handleFilmUpdate(updateFilm) {
    this._filmCards = updateItem(this._filmCards, updateFilm);
    this._filmsPresenter[updateFilm.id].init(updateFilm);
  }

  _renderCardFilm(film) {
    const filmPresenter = new MovieCardPresenter(
      this._movieWrapperList,
      this._handleFilmUpdate,
    );

    filmPresenter.init(film);
    this._filmsPresenter[film.id] = filmPresenter;
  }

  _renderCardsFilm(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderCardFilm(film));
  }

  _renderNoFilmsMessage() {
    renderElement(this._filmContainer, this._emptyFilmMessage, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderCardsFilm(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);

    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._filmCards.length) {
      remove(this._showMoreButton);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._movieWrapper, this._showMoreButton, RenderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsContainer() {
    renderElement(this._filmContainer, this._movieWrapper, RenderPosition.BEFOREEND);
    this._movieWrapperList = this._movieWrapper.getFilmsListContainer();
  }

  _clearFilmsList() {
    Object
      .values(this._filmsPresenter)
      .forEach((film) => film.destroy());

    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._filmsPresenter = {};
    remove(this._showMoreButton);
  }
}
