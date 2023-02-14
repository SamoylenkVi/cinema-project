import EmptyFilmMessageView from '../view/message-empty-film-list';
import ShowMoreButtonView from '../view/show-more-button';
import MovieWrapperView from '../view/movie-wrapper';
import MovieCardPresenter from './movie';
import { RenderPosition, UserAction, UpdateType } from '../constants';

import {
  renderElement, remove,
} from '../utils/render';

const TASK_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmContainer, classNameSection, title, containerListAttribute, filmsModel) {
    this._filmsModel = filmsModel;

    this._filmContainer = filmContainer;
    this._emptyFilmMessage = new EmptyFilmMessageView();
    this._showMoreButton = new ShowMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);

    this._movieWrapper = new MovieWrapperView(
      classNameSection,
      title,
      containerListAttribute,
    );

    this._filmsPresenter = {};
    this._movieWrapperList = null;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _getFilms() {
    return this._filmsModel.films;
  }

  init() {
    this._renderFilmsContainer();

    this._renderFilmList(this._getFilms());
  }

  _renderFilmsContainer() {
    renderElement(this._filmContainer, this._movieWrapper, RenderPosition.BEFOREEND);
    this._movieWrapperList = this._movieWrapper.getFilmsListContainer();
  }

  _handleModeChange() {
    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case (UserAction.UPDATE_FILM):
        this._filmsModel.updateFilm(updateType, update);
        break;
      default:
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        break;
      default:
    }
  }

  _renderFilmList() {
    const filmsCount = this._getFilms().length;

    if (filmsCount <= 0) {
      this._renderNoFilmsMessage();
      return;
    }

    const films = this._getFilms().slice(0, Math.min(filmsCount, this._renderedTaskCount));

    this._renderFilms(films);

    if (filmsCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilmCard(film) {
    const filmPresenter = new MovieCardPresenter(
      this._movieWrapperList,
      this._handleViewAction,
      this._handleModeChange,
    );

    filmPresenter.init(film);
    this._filmsPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilmsMessage() {
    renderElement(this._filmContainer, this._emptyFilmMessage, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(
      filmsCount,
      this._renderedTaskCount + TASK_COUNT_PER_STEP,
    );

    const films = this._getFilms().slice(this._renderedTaskCount, newRenderedFilmCount);

    this._renderFilms(films);

    this._renderedTaskCount = newRenderedFilmCount;

    if (this._renderedTaskCount >= filmsCount) {
      remove(this._showMoreButton);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._movieWrapper, this._showMoreButton, RenderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmsPresenter)
      .forEach((film) => film.destroy());
    this._filmsPresenter = {};
  }
}
