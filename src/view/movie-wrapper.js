import AbstractView from './abstract';

const createMovieWrapper = (className, title, containerListAttribute) => `
<section class="${className}">
  <h2 class="films-list__title visually-hidden">${title}</h2>

  <div class="films-list__container" data-container="${containerListAttribute}"></div>
</section>`;
export default class MovieWrapper extends AbstractView {
  constructor(className, title, containerListAttribute) {
    super();

    this._className = className;
    this._title = title;
    this._containerListAttribute = containerListAttribute;
  }

  getTemplate() {
    return createMovieWrapper(this._className, this._title, this._containerListAttribute);
  }

  getFilmsListContainer() {
    return this._element.querySelector(`[data-container="${this._containerListAttribute}"]`);
  }
}
