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
    this._handleModeChange = this._handleModeChange.bind(this);

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
    this._renderFilmsContainer();

    this._renderFilmList(filmCards);
  }

  sortFilms(films) {
    this._clearFilmList();
    this._renderFilmList(films);
  }

  _handleFilmUpdate(updatedFilm) {
    this._filmCards = updateItem(this._filmCards, updatedFilm);
    this._filmsPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmList(films) {
    this._filmCards = films;

    if (films.length > 0) {
      this._renderFilmCards(0, this._renderedTaskCount);
    } else {
      this._renderNoFilmsMessage();
    }

    if (films.length > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilmCard(film) {
    const filmPresenter = new MovieCardPresenter(
      this._movieWrapperList,
      this._handleFilmUpdate,
      this._handleModeChange,
    );

    filmPresenter.init(film);
    this._filmsPresenter[film.id] = filmPresenter;
  }

  _renderFilmCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilmsMessage() {
    renderElement(this._filmContainer, this._emptyFilmMessage, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);

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

  _clearFilmList() {
    Object
      .values(this._filmsPresenter)
      .forEach((film) => film.destroy());
    this._filmsPresenter = {};
  }
}
