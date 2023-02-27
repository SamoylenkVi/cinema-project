import GenericMovieWrapperView from '../view/all-movie-wrapper';
import MovieListPresenter from './movie-list';
import FilterMenuPresenter from './filter-menu';
import { RenderPosition } from '../constants';
import { renderElement } from '../utils/render';

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

    this._allMovieWrapper = new GenericMovieWrapperView();

    this._moviePresenter = new MovieListPresenter(
      this._allMovieWrapper,
      MAIN_FILMS_WRAPPER,
      MAIN_FILMS_TITLE,
      FILMS_LIST_ATTRIBUTE.MAIN,
      filmsModel,
      commentsModel,
    );

    this._filterPresenter = new FilterMenuPresenter(this._mainElement, this._filmsModel);

    this._filmsCardsDefault = null;
  }

  _getFilms() {
    return this._filmsModel.films;
  }

  init() {
    this._filterPresenter.init();
    this._renderAllMovieWrapper();
    this._moviePresenter.init();
  }

  _renderAllMovieWrapper() {
    renderElement(this._mainElement, this._allMovieWrapper, RenderPosition.BEFOREEND);
  }
}
