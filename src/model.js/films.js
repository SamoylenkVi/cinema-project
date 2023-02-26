import Observer from '../utils/observer';
import { SortType, FilterType } from '../constants';
import { dateSort, ratingSort } from '../utils/card';

const Filter = {
  ALL: '',
  WATCHLIST: 'isWatchList',
  HISTORY: 'isWatched',
  FAVORITES: 'isFavorite',
};

export default class Films extends Observer {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
    this._filterType = FilterType.ALL_MOVIES;

    this._films = [];

    this._filteredFilms = [];
    this._filteredAndSortedFilms = [];
  }

  set films(films) {
    this._films = films.slice();
    this._filterFilms();
    this._sortFilms();
  }

  get films() {
    return this._films;
  }

  get sortType() {
    return this._sortType;
  }

  get filterType() {
    return this._filterType;
  }

  _filterFilms() {
    this._filteredFilms = this._films.filter((film) => {
      const filterProp = Filter[this._filterType.toUpperCase()];
      return filterProp ? film[filterProp] : true;
    });
  }

  _sortFilms() {
    let sortByType;

    switch (this._sortType) {
      case SortType.DATE:
        sortByType = dateSort;
        break;
      case SortType.RATING:
        sortByType = ratingSort;
        break;
      default:
        sortByType = null;
        break;
    }

    if (typeof sortByType === 'function') {
      this._filteredAndSortedFilms = this._filteredFilms.slice().sort(sortByType);
    } else {
      this._filteredAndSortedFilms = this._filteredFilms.slice();
    }
  }

  get filteredAndSortedFilms() {
    return this._filteredAndSortedFilms;
  }

  set currentFilterType(filterType) {
    this._filterType = filterType;
  }

  _updateFilm(film) {
    const index = this._films.findIndex((item) => item.id === film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      film,
      ...this._films.slice(index + 1),
    ];
  }

  updateFilms(updateType, update) {
    this._updateFilm(update);
    this._filterFilms();
    this._sortFilms();

    this._notify(updateType, update, this._filteredAndSortedFilms);
  }

  updateFilterFilms(updateType, filterType) {
    this._sortType = SortType.DEFAULT;
    this._filterType = filterType;

    this._filterFilms();
    this._sortFilms();

    this._notify(updateType, this._filteredAndSortedFilms, '');
  }

  updateSortFilms(updateType, sortType) {
    this._sortType = sortType;

    this._sortFilms();

    this._notify(updateType, this._filteredAndSortedFilms, '');
  }
}
