import AbstractView from './abstract';

const createMovieWrapper = () => '<section class="films"></section>';

export default class GenericMovieWrapper extends AbstractView {
  getTemplate() {
    return createMovieWrapper();
  }
}
