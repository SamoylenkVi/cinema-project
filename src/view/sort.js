import Smart from './smart';
import { SortType } from '../constants';

const createSortCardTemplate = (currentSortType) => `
<ul class="sort">
<li><a href="#" data-sort="${SortType.DEFAULT}" class="sort__button ${currentSortType === 'default' ? 'sort__button--active' : ''}">Sort by default</a></li>
<li><a href="#" data-sort="${SortType.DATE}" class="sort__button ${currentSortType === 'date' ? 'sort__button--active' : ''}">Sort by date</a></li>
<li><a href="#" data-sort="${SortType.RATING}" class="sort__button ${currentSortType === 'rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>`;

export default class SortCardMenu extends Smart {
  constructor(sortType) {
    super();
    this._currentSortType = sortType;
    this._addSortMovieHandler = this._addSortMovieHandler.bind(this);
  }

  getTemplate() {
    return createSortCardTemplate(this._currentSortType);
  }

  restoreHandlers() {
    this.setSortMovieHandler(this._callback.sortMovie);
  }

  rerenderSort(sortType) {
    this._currentSortType = sortType;
    this.updateElement();
  }

  _addSortMovieHandler(evt) {
    evt.preventDefault();
    const sortType = evt.target.getAttribute('data-sort');

    this._callback.sortMovie(sortType);
  }

  setSortMovieHandler(callback) {
    this._callback.sortMovie = callback;

    this.getElement().addEventListener('click', this._addSortMovieHandler);
  }
}
