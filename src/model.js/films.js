import Observer from '../utils/observer';
import { SortType, FilterType } from '../constants';
import { dateSort, ratingSort } from '../utils/card';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
    this._defaultFilms = [];

    this._currentSortType = SortType.DEFAULT;
    this._currentFilterType = FilterType.ALL_MOVIES;
  }

  set films(films) {
    this._defaultFilms = films.slice();

    this._films = films.slice();
  }

  get films() {
    return this._films;
  }

  set currentSortType(sortType) {
    this._currentSortType = sortType;
  }

  get currentSortType() {
    return this._currentSortType;
  }

  get currentFilterType() {
    return this._currentFilterType;
  }

  set currentFilterType(filterType) {
    this._currentFilterType = filterType;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  sortFilm(updateType, sortType) {
    switch (sortType) {
      case (SortType.DATE):
        this._films = this._films.sort(dateSort);
        this.currentSortType = SortType.DATE;
        break;
      case (SortType.RATING):
        this._films = this._films.sort(ratingSort);
        this.currentSortType = SortType.RATING;
        break;
      default:
        this._films = this._defaultFilms;
        this.currentSortType = SortType.DEFAULT;
    }
    this._notify(updateType, this._films);
  }
}