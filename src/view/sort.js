import AbstractView from './abstract';

const createSortCardTemplate = () => `
<ul class="sort">
<li><a href="#" data-sort-default class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" data-sort-date class="sort__button">Sort by date</a></li>
<li><a href="#" data-sort-rating class="sort__button">Sort by rating</a></li>
</ul>`;

export default class SortCardMenu extends AbstractView {
  constructor() {
    super();

    this._addSortMovieHandler = this._addSortMovieHandler.bind(this);
  }

  getTemplate() {
    return createSortCardTemplate();
  }

  _addSortMovieHandler(evt) {
    evt.preventDefault();

    this._callback.sortMovie({
      isSortDefault: (evt.target.hasAttribute('data-sort-default') && !evt.target.classList.contains('sort__button--active')),
      isSortDate: (evt.target.hasAttribute('data-sort-date') && !evt.target.classList.contains('sort__button--active')),
      isSortRating: (evt.target.hasAttribute('data-sort-rating') && !evt.target.classList.contains('sort__button--active')),
    });

    const allButtons = this.getElement().querySelectorAll('.sort__button');
    allButtons.forEach((button) => button.classList.remove('sort__button--active'));
    evt.target.classList.add('sort__button--active');
  }

  setSortMovieHandler(callback) {
    this._callback.sortMovie = callback;

    this.getElement().addEventListener('click', this._addSortMovieHandler);
  }
}
