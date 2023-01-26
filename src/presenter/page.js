import SortCardMenuView from '../view/sort';
import GenericMovieWrapperView from '../view/all-movie-wrapper';
import MovieListPresenter from './movie-list';
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
  constructor() {
    this._mainElement = document.querySelector('.main');
    this._allMovieWrapper = new GenericMovieWrapperView();

    this._moviePresenter = new MovieListPresenter(
      this._allMovieWrapper,
      MAIN_FILMS_WRAPPER,
      MAIN_FILMS_TITLE,
      FILMS_LIST_ATTRIBUTE.MAIN,
    );

    this._sortCardMenu = new SortCardMenuView();

    this._handleSortMovieCard = this._handleSortMovieCard.bind(this);

    this._filmsCardsDefault = null;
  }

  init(filmsCards) {
    this._filmsCardsDefault = filmsCards;
    this._filmsCard = filmsCards.slice();

    this._renderSortFilms();
    this._renderAllMovieWrapper();
    this._moviePresenter.init(this._filmsCard);
  }

  _handleSortMovieCard({
    isSortDefault,
    isSortDate,
    isSortRating,
  }) {
    if (isSortDefault) {
      const cardsByDefault = this._filmsCardsDefault.slice();
      this._moviePresenter.sortFilms(cardsByDefault);
    }

    if (isSortDate) {
      this._filmsCard.sort((a, b) => b.productionYear - a.productionYear);

      this._moviePresenter.sortFilms(this._filmsCard);
    }

    if (isSortRating) {
      this._filmsCard.sort((a, b) => b.rating - a.rating);

      this._moviePresenter.sortFilms(this._filmsCard);
    }
  }

  _renderSortFilms() {
    renderElement(this._mainElement, this._sortCardMenu, RenderPosition.BEFOREEND);

    this._sortCardMenu.setSortMovieHandler(this._handleSortMovieCard);
  }

  _renderAllMovieWrapper() {
    renderElement(this._mainElement, this._allMovieWrapper, RenderPosition.BEFOREEND);
  }
}
