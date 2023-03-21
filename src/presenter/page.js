import GenericMovieWrapperView from '../view/all-movie-wrapper';
import MovieListPresenter from './movie-list';
import StatisticView from '../view/stats';
import FilterMenuPresenter from './filter-menu';
import LoadingView from '../view/loading';
import { RenderPosition, FilterMode, UpdateType } from '../constants';
import { remove, renderElement } from '../utils/render';

const MAIN_FILMS_TITLE = 'All movies. Upcoming';
const MAIN_FILMS_WRAPPER = 'films-list';

const FILMS_LIST_ATTRIBUTE = {
  MAIN: 'Main',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};

export default class Page {
  constructor(filmsModel, commentsModel) {
    this._filmsModel = filmsModel;

    this._mainElement = document.querySelector('.main');

    this._isLoading = true;
    this._loadingView = new LoadingView();
    this._films = this._filmsModel.films;
    this._allMovieWrapper = new GenericMovieWrapperView();
    this._statistic = new StatisticView(this._films);

    this._moviePresenter = new MovieListPresenter(
      this._allMovieWrapper,
      MAIN_FILMS_WRAPPER,
      MAIN_FILMS_TITLE,
      FILMS_LIST_ATTRIBUTE.MAIN,
      filmsModel,
      commentsModel,
    );

    this._filterPresenter = null;
    this._handleShowStatistic = this._handleShowStatistic.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    return this._filmsModel.films;
  }

  init() {
    this._filterPresenter = new FilterMenuPresenter(
      this._mainElement,
      this._filmsModel,
      this._handleShowStatistic,
    );
    this._renderPage();
    this._moviePresenter.init();
  }

  _renderPage() {
    if (this._isLoading) {
      this._renderLoadingView();
      return;
    }

    this._filterPresenter.init();
    this._renderAllMovieWrapper();
    this._renderStatistic();
    this._handleShowFilms();
  }

  _renderLoadingView() {
    renderElement(this._mainElement, this._loadingView, RenderPosition.BEFOREEND);
  }

  _renderAllMovieWrapper() {
    renderElement(this._mainElement, this._allMovieWrapper, RenderPosition.BEFOREEND);
  }

  _renderStatistic() {
    renderElement(this._mainElement, this._statistic, RenderPosition.BEFOREEND);
  }

  _handleShowFilms() {
    this._statistic.hide();
    this._allMovieWrapper.show();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._statistic.rerenderStatistic(data);
        this._handleShowFilms();
        break;
      case UpdateType.INIT:
        this._films = this._filmsModel.films;
        this._isLoading = false;
        remove(this._loadingView);
        this._renderPage();
        this._statistic.rerenderStatistic(this._films);
        this._handleShowFilms();
        break;
      default:
    }
  }

  _handleShowStatistic() {
    if (this._filterPresenter.filterMode === FilterMode.MOVIES) {
      this._filterPresenter.selectStatisticHandler();
      this._allMovieWrapper.hide();
      this._statistic.show();
      return;
    }
    this._handleShowFilms();
  }
}
