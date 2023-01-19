import FilmCardView from '../view/movie-card';
import FilmCardDetailsView from '../view/film-details';
import { Keys } from '../constants';
import {
  renderElement, RenderPosition,
} from '../utils/render';

export default class MovieCard {
  constructor(wrapper) {
    this.wrapperCard = wrapper;
    this.filmDetailsWrapper = document.querySelector('.main');
    this._page = document.querySelector('body');

    this._filmCard = null;
    this._filmCardDetails = null;

    this._showFilmDetailsHandler = this._showFilmDetailsHandler.bind(this);
    this._closeFilmDetailsHandler = this._closeFilmDetailsHandler.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
  }

  init(filmCard) {
    this.filmCard = new FilmCardView(filmCard);
    this.FilmCardDetails = new FilmCardDetailsView(filmCard);

    this.filmCard.setClickHandler(this._showFilmDetailsHandler);

    renderElement(this.wrapperCard, this.filmCard, RenderPosition.BEFOREEND);
  }

  _showFilmDetailsHandler() {
    this.filmDetailsWrapper.appendChild(this.FilmCardDetails.getElement());
    this._page.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escapeKeydownHandler);
    this.FilmCardDetails.setClickHandler(this._closeFilmDetailsHandler);
  }

  _closeFilmDetailsHandler() {
    this.filmDetailsWrapper.removeChild(this.FilmCardDetails.getElement());
    this._page.classList.remove('hide-overflow');
    this._filmCardDetails.removeClickHandler();
  }

  _escapeKeydownHandler(evt) {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      this._closeFilmDetailsHandler();
    }
    document.removeEventListener('keydown', this._escapeKeydownHandler);
  }
}
