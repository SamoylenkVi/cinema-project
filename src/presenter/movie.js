import FilmCardView from '../view/movie-card';
import FilmCardDetailsView from '../view/film-details';
import {
  Keys,
  RenderPosition,
  UserAction,
  UpdateType,
} from '../constants';

import {
  remove,
  renderElement,
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
    this._filmComments = null;

    this._mode = Mode.DEFAULT;

    this._showFilmDetailsHandler = this._showFilmDetailsHandler.bind(this);
    this._closeFilmDetailsHandler = this._closeFilmDetailsHandler.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._addFilmToSpecialList = this._addFilmToSpecialList.bind(this);
  }

  init(filmCard, filmComments) {
    this._filmCardData = filmCard;
    this._filmComments = filmComments;
    const prevFilmCard = this._filmCard;

    this._filmCard = new FilmCardView(this._filmCardData, this._filmComments);

    this._filmCard.setOpenPopupHandler(this._showFilmDetailsHandler);
    this._filmCard.setSpecialListHandler(this._addFilmToSpecialList);

    if (prevFilmCard === null) {
      renderElement(this.wrapperCard, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this.wrapperCard.contains(prevFilmCard.getElement())) {
      this.wrapperCard.replaceChild(this._filmCard.getElement(), prevFilmCard.getElement());
    }

    remove(prevFilmCard);
  }

  updateFilmDetails(update) {
    this._filmCardData = update;
    this._filmCardDetails = new FilmCardDetailsView(
      this._filmCardData,
      this._filmComments,
    );
    this._detailsButtonPosition = '';
    if (this._prevFilmCardDetails) {
      this._detailsButtonPosition = this._prevFilmCardDetails
        .getElement().scrollTop;
      this.filmDetailsWrapper.replaceChild(
        this._filmCardDetails.getElement(),
        this._prevFilmCardDetails.getElement(),
      );
    }

    this._filmCardDetails.scrollToFavoriteButton(this._detailsButtonPosition);
    this._prevFilmCardDetails = this._filmCardDetails;
    this._filmCardDetails.setSpecialListHandler(this._addFilmToSpecialList);
    this._filmCardDetails.setClickHandler(this._closeFilmDetailsHandler);
  }

  updateComments(update) {
    this._filmComments = update[this._filmCardData.id];
    this._filmCardDetails.deleteComment(this._filmComments);
    this._filmCard.updateCommentCounter(this._filmComments);
  }

  _showFilmDetailsHandler() {
    this._filmCardDetails = new FilmCardDetailsView(this._filmCardData, this._filmComments);

    this._prevFilmCardDetails = this._filmCardDetails;
    this.filmDetailsWrapper.appendChild(this._filmCardDetails.getElement());
    this._page.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escapeKeydownHandler);
    this._filmCardDetails.setSpecialListHandler(this._addFilmToSpecialList);
    this._filmCardDetails.setClickHandler(this._closeFilmDetailsHandler);
    this._filmCardDetails.setDeleteCommentHandler(this._deleteComment);
    this.changeMode(this);
    this._mode = Mode.POPUP;
  }

  _closeFilmDetailsHandler() {
    this._filmCardDetails.reset(this._filmCardData);
    this.filmDetailsWrapper.removeChild(this._filmCardDetails.getElement());
    this._page.classList.remove('hide-overflow');
    this._filmCardDetails.removeClickHandler();
    this._mode = Mode.DEFAULT;
    this.changeMode();
  }

  _escapeKeydownHandler(evt) {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      this._closeFilmDetailsHandler();
      document.removeEventListener('keydown', this._escapeKeydownHandler);
    }
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
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        this._filmCardData = {
          ...this._filmCardData,
          isWatchList: !this._filmCardData.isWatchList,
        },
      );
    }
    if (isAddedToWatched) {
      this.changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        this._filmCardData = {
          ...this._filmCardData,
          isWatched: !this._filmCardData.isWatched,
        },
      );
    }
    if (isAddedToFavorite) {
      this.changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,

        this._filmCardData = {
          ...this._filmCardData,
          isFavorite: !this._filmCardData.isFavorite,
        },
      );
    }
  }

  destroy() {
    remove(this._filmCard);
  }

  _deleteComment(commentId) {
    const commentsId = this._filmCardData.id;

    const updateComments = {
      [commentsId]: this._filmComments.filter(({ id }) => id !== Number(commentId)),
    };

    this.changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      updateComments,
    );
  }
}
