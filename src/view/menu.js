import Smart from './smart';
import { FilterType } from '../constants';

const createFilterLink = (filters, activeFilterType) => {
  const filterMarkup = Object.entries(filters).map(([filterName, count]) => `
    <a href="#${filterName}" class="main-navigation__item ${filterName === activeFilterType ? 'main-navigation__item--active' : ''}">
      ${filterName}
      <span class="main-navigation__item-count">
        ${count}
      </span>

    </a>
  `);

  return filterMarkup.join('');
};

const createMenuTemplate = (filters, activeFilterType) => `
  <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${activeFilterType === FilterType.ALL_MOVIES ? 'main-navigation__item--active' : ''}">All movies</a>
        ${createFilterLink(filters, activeFilterType)}
      </div>
      <a href="#stats" class="main-navigation__additional ${activeFilterType === FilterType.STATISTIC ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>`;

export default class SiteMenu extends Smart {
  constructor(filters, filterType) {
    super();
    this._filters = filters;
    this._currentFilterType = filterType;
    this._addFilterMovieHandler = this._addFilterMovieHandler.bind(this);
    this._addShowStatisticHandler = this._addShowStatisticHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  restoreHandlers() {
    this.setFilterMovieHandler(this._callback.filterMovie);
    this.setShowStatisticHandler(this._callback.showStatistic);
  }

  rerenderFilter(filters, filterType) {
    this._filters = filters;
    this._currentFilterType = filterType;
    this.updateElement();
  }

  _addFilterMovieHandler(evt) {
    evt.preventDefault();
    const filterType = evt.target.getAttribute('href').slice(1);

    this._callback.filterMovie(filterType);
  }

  setFilterMovieHandler(callback) {
    this._callback.filterMovie = callback;

    this.getElement()
      .querySelector('.main-navigation__items').addEventListener('click', this._addFilterMovieHandler);
  }

  _addShowStatisticHandler(evt) {
    evt.preventDefault();

    this._callback.showStatistic();
  }

  setShowStatisticHandler(callback) {
    this._callback.showStatistic = callback;

    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._addShowStatisticHandler);
  }
}
