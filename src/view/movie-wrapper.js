import AbstractView from './abstract';

const createMovieWrapper = (className, title) => `
<section class="${className}">
  <h2 class="films-list__title visually-hidden">${title}</h2>

  <div class="films-list__container"></div>
</section>`;
export default class MovieWrapper extends AbstractView {
  constructor(className, title) {
    super();

    this._className = className;
    this._title = title;
  }

  getTemplate() {
    return createMovieWrapper(this._className, this._title);
  }
}
