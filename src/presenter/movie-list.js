import EmptyFilmMessageView from '../view/message-empty-film-list';
import ShowMoreButtonView from '../view/show-more-button';
import MovieWrapperView from '../view/movie-wrapper';
import MovieCardPresenter from './movie-card';
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
    commentsModel,
  ) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._films = this._getFilms();
    this._comments = this._commentsModel.comments;

    this._filmContainer = filmContainer;
    this._emptyFilmMessage = new EmptyFilmMessageView();
    this._showMoreButton = new ShowMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModelCommentsEvent = this._handleModelCommentsEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelCommentsEvent);

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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case (UserAction.UPDATE_FILM):
        this._filmsModel.updateFilms(updateType, update);
        break;
      case (UserAction.UPDATE_COMMENTS):
        this._commentsModel.updateComments(updateType, update);
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
      default:
    }
  }

  _handleModelCommentsEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPopupPresenter) {
          this._comments = this._commentsModel.comments;
          this._filmPopupPresenter.updateComments(update);
          this._rerenderFilmList(this._films);
        }
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
    );

    const filmComments = this._comments[film.id];

    movieCardPresenter.init(film, filmComments);

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
