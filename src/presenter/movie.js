import FilmCardView from '../view/movie-card';
import FilmCardDetailsView from '../view/film-details';
import { Keys } from '../constants';
import {
  remove,
  renderElement, RenderPosition,
} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class MovieCard {
  constructor(wrapper, changeData, modeChange) {
    this.wrapperCard = wrapper;
    this.changeData = changeData;
    this.changeMode = modeChange;

    this.filmDetailsWrapper = document.querySelector('.main');
    this._page = document.querySelector('body');

    this._filmCard = null;
    this._filmCardDetails = null;
    this._mode = Mode.DEFAULT;

    this._showFilmDetailsHandler = this._showFilmDetailsHandler.bind(this);
    this._closeFilmDetailsHandler = this._closeFilmDetailsHandler.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._addFilmToSpecialList = this._addFilmToSpecialList.bind(this);
  }

  init(filmCard) {
    this._filmCardData = filmCard;

    const prevFilmCard = this._filmCard;
    const prevFilmCardDetails = this._filmCardDetails;

    this._filmCard = new FilmCardView(this._filmCardData);
    this._filmCardDetails = new FilmCardDetailsView(this._filmCardData);

    this._filmCard.setOpenPopupHandler(this._showFilmDetailsHandler);
    this._filmCard.setSpecialListHandler(this._addFilmToSpecialList);
    this._filmCardDetails.setClickHandler(this._closeFilmDetailsHandler);
    this._filmCardDetails.setSpecialListHandler(this._addFilmToSpecialList);

    if (prevFilmCard === null || prevFilmCardDetails === null) {
      renderElement(this.wrapperCard, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this.wrapperCard.contains(prevFilmCard.getElement())) {
      this.wrapperCard.replaceChild(this._filmCard.getElement(), prevFilmCard.getElement());
    }

    if (this.filmDetailsWrapper.contains(prevFilmCardDetails.getElement())) {
      this.filmDetailsWrapper.replaceChild(
        this._filmCardDetails.getElement(),
        prevFilmCardDetails.getElement(),
      );
    }
    remove(prevFilmCard);
    remove(prevFilmCardDetails);
  }

  _showFilmDetailsHandler() {
    this.filmDetailsWrapper.appendChild(this._filmCardDetails.getElement());
    this._page.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escapeKeydownHandler);
    this._filmCardDetails.setClickHandler(this._closeFilmDetailsHandler);
    this.changeMode();
    this._mode = Mode.POPUP;
  }

  _closeFilmDetailsHandler() {
    this.filmDetailsWrapper.removeChild(this._filmCardDetails.getElement());
    this._page.classList.remove('hide-overflow');
    this._filmCardDetails.removeClickHandler();
    this._mode = Mode.DEFAULT;
  }

  _escapeKeydownHandler(evt) {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      this._closeFilmDetailsHandler();
    }
    document.removeEventListener('keydown', this._escapeKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetailsHandler();
    }
  }

  _addFilmToSpecialList({
    isAddedToWatchList,
    isAddedToWatched,
    isAddedToFavorite,
  }) {
    if (isAddedToWatchList) {
      this.changeData(
        this._filmCardData = {
          ...this._filmCardData,
          isWatchList: !this._filmCardData.isWatchList,
        },
      );
    }
    if (isAddedToWatched) {
      this.changeData(
        this._filmCardData = {
          ...this._filmCardData,
          isWatched: !this._filmCardData.isWatched,
        },
      );
    }
    if (isAddedToFavorite) {
      this.changeData(
        this._filmCardData = {
          ...this._filmCardData,
          isFavorite: !this._filmCardData.isFavorite,
        },
      );
    }
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmCardDetails);
  }
}
