import { createElement } from '../utils';

const createMovieWrapper = () => '<section class="films"></section>';

export default class GenericMovieWrapper {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieWrapper();
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
