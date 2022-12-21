import { createElement } from '../utils';

const createMovieWrapper = (className, title) => `
<section class="${className}">
  <h2 class="films-list__title visually-hidden">${title}</h2>

  <div class="films-list__container"></div>
</section>`;
export default class MovieWrapper {
  constructor(className, title) {
    this._className = className;
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createMovieWrapper(this._className, this._title);
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
