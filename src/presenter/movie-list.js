import EmptyFilmMessageView from '../view/message-empty-film-list';
import ShowMoreButtonView from '../view/show-more-button';
import MovieWrapperView from '../view/movie-wrapper';
import MovieCardPresenter from './movie-card';
import FilmsModel from '../model/films';
import { RenderPosition, UserAction, UpdateType } from '../constants';

import {
  renderElement, remove,
} from '../utils/render';

const TASK_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(
    filmContainer,
    classNameSection,
    title,
    containerListAttribute,
    filmsModel,
    api,
  ) {
    this._filmsModel = filmsModel;
    this._api = api;
    this._films = this._getFilms();

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
    this._filmPopupPresenter = null;
    this._movieWrapperList = null;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _getFilms() {
    return this._filmsModel.filteredAndSortedFilms;
  }

  init() {
    this._renderFilmsContainer();
    this._renderFilmList(this._getFilms());
  }

  _renderFilmsContainer() {
    renderElement(this._filmContainer, this._movieWrapper, RenderPosition.BEFOREEND);
    this._movieWrapperList = this._movieWrapper.getFilmsListContainer();
  }

  _handleModeChange(filmPresenter = null) {
    if (!filmPresenter) {
      this._filmPopupPresenter = filmPresenter;
      return;
    }

    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.resetView());
    this._filmPopupPresenter = filmPresenter;
  }

  _handleViewAction(actionType, updateType, update, id) {
    switch (actionType) {
      case (UserAction.UPDATE_FILM):
        this._api.updateFilm(update).then((movie) => {
          const updateMovie = FilmsModel.adaptToClient(movie);
          this._filmsModel.updateFilms(updateType, updateMovie);
        });
        break;
      case (UserAction.DELETE_COMMENTS):
        this._api.deleteComment(id)
          .then(() => {
            this._filmPopupPresenter.deleteComment(id);
            this._filmsModel.updateFilms(updateType, update);
          })
          .catch(() => {
            this._filmPopupPresenter.showError(id);
          });
        break;
      case (UserAction.ADD_COMMENT):
        this._api.addComments(id, update)
          .then((updateFilm) => {
            const { movie, comments } = updateFilm;
            const updateMovie = FilmsModel.adaptToClient(movie);
            this._filmsModel.updateFilms(updateType, updateMovie);
            this._filmPopupPresenter.addComment(comments);
          })
          .catch(() => {
            this._filmPopupPresenter.showError();
          });
        break;
      default:
    }
  }

  _handleModelEvent(updateType, data, updateCard) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPopupPresenter) {
          this._filmPopupPresenter.updateFilmDetails(updateCard);
        }
        this._rerenderFilmList(data);
        break;
      case UpdateType.MINOR:
        this._rerenderFilmList(data);
        break;
      case UpdateType.MAJOR:
        this._renderedTaskCount = TASK_COUNT_PER_STEP;
        this._rerenderFilmList(data);
        break;
      case UpdateType.INIT:
        this._films = this._filmsModel.filteredAndSortedFilms;
        remove(this._emptyFilmMessage);
        this._renderFilmList(this._films);
        break;
      default:
    }
  }

  _rerenderFilmList(newData) {
    this._films = newData;
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderFilmList() {
    const filmsCount = this._films.length;

    if (filmsCount <= 0) {
      this._renderNoFilmsMessage();
      return;
    }

    const films = this._films.slice(0, Math.min(filmsCount, this._renderedTaskCount));

    this._renderFilms(films);

    if (filmsCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmCard(film) {
    const movieCardPresenter = new MovieCardPresenter(
      this._movieWrapperList,
      this._handleViewAction,
      this._handleModeChange,
      this._api,
    );

    movieCardPresenter.init(film);

    this._filmsPresenter[film.id] = movieCardPresenter;
  }

  _renderNoFilmsMessage() {
    renderElement(this._filmContainer, this._emptyFilmMessage, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._films.length;
    const newRenderedFilmCount = Math.min(
      filmsCount,
      this._renderedTaskCount + TASK_COUNT_PER_STEP,
    );

    const films = this._films.slice(this._renderedTaskCount, newRenderedFilmCount);

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
      .forEach((film) => {
        film.destroy();
      });
    remove(this._emptyFilmMessage);
    remove(this._showMoreButton);
  }
}
