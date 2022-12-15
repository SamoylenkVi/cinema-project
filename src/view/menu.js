import generateFilmFilters from '../mock/filter';
import { createElement } from '../utils';

const createFilterLink = (films) => {
  const filters = generateFilmFilters(films);
  const filterMarkup = filters.map(({ name, count }) => `
    <a href="#${name}" class="main-navigation__item">
      ${name}
      <span class="main-navigation__item-count">
        ${count}
      </span>
    </a>
  `);

  return filterMarkup.join('');
};

const createMenuTemplate = (filmCards) => `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        ${createFilterLink(filmCards)}
      </div>
      <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
    </nav>`;

export default class SiteMenu {
  constructor(cards) {
    this.cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this.cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
