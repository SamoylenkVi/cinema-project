import he from 'he';
import { addActiveButtonClass, convertsDate } from '../utils/card';
import { RELEASE_DATE_FORMAT, COMMENT_DATE_FORMAT } from '../constants';
import Smart from './smart';

const ACTIVE_BUTTON_CLASS = 'film-details__control-button--active';

const createGenreItem = (items) => {
  const genreMarkup = items.map((item) => `<span class="film-details__genre">${item}</span>`);
  return genreMarkup.join('');
};

const createCommentItem = (items) => {
  const CommentMarkup = items.map((item) => {
    const {
      id, user, emotion, commentText, commentDate,
    } = item;
    return `<li class="film-details__comment" comment-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(commentText)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${user}</span>
          <span class="film-details__comment-day">${convertsDate(commentDate, COMMENT_DATE_FORMAT)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  });
  return CommentMarkup.join('');
};

const createFilmDetailsTemplate = (movieCard, cardComments) => {
  const {
    name,
    rating,
    poster,
    producer,
    screenwriters,
    actors,
    productionYear,
    filmDuration,
    country,
    description,
    isWatchList,
    isWatched,
    isFavorite,
    genre,
    ageRating,
    isEmotion,
    selectedEmotion,
    commentText,
  } = movieCard;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${ageRating}</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${name}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${convertsDate(productionYear, RELEASE_DATE_FORMAT)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${(genre.length > 1 ? 'Genres' : 'Genre')} </td>
                <td class="film-details__cell">
                ${createGenreItem(genre)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isWatchList, ACTIVE_BUTTON_CLASS)} film-details__control-button--watchlist" data-watchlist id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isWatched, ACTIVE_BUTTON_CLASS)} film-details__control-button--watched" data-watched id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isFavorite, ACTIVE_BUTTON_CLASS)} film-details__control-button--favorite" data-favorite id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${cardComments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentItem(cardComments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            ${isEmotion ? `<img src="./images/emoji/${selectedEmotion}.png" width="55" height="55" alt="emoji ${selectedEmotion}">` : ''}

            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmCardDetails extends Smart {
  constructor(filmCard, filmComments) {
    super();

    this._filmCardState = FilmCardDetails.parseDataToState(filmCard);
    this._filmComments = filmComments;

    this._clickHandler = this._clickHandler.bind(this);
    this._addToSpecialListHandler = this._addToSpecialListHandler.bind(this);
    this._selectEmojiHandler = this._selectEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._addDeleteCommentHandler = this._addDeleteCommentHandler.bind(this);

    this._favoriteButtonWrapper = this.getElement().querySelector('.film-details__controls');

    this._setInnerHandlers();
  }

  static parseDataToState(filmCard) {
    if (filmCard.commentText) {
      return filmCard;
    }

    const filmState = {
      ...filmCard,
      isEmotion: false,
      selectedEmotion: '',
      commentText: '',
    };
    return filmState;
  }

  static parseStateToData(state) {
    const filmData = {
      ...state,
    };
    delete filmData.isEmotion;
    delete filmData.selectedEmotion;
    delete filmData.commentText;

    return filmData;
  }

  reset(filmCard) {
    this.updateData(
      FilmCardDetails.parseStateToData(filmCard),
    );
  }

  get state() {
    return this._filmCardState;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCardState, this._filmComments);
  }

  scrollToFavoriteButton(buttonPosition) {
    this.getElement().scrollTo(0, buttonPosition);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('.film-details__emoji-item')
      .forEach((element) => {
        element.addEventListener('click', this._selectEmojiHandler);
      });

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSpecialListHandler(this._callback.specialList);
    this.setClickHandler(this._callback.click);
    this.setDeleteCommentHandler(this._callback.deleteComment);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _selectEmojiHandler(evt) {
    evt.preventDefault();
    if (evt.target.hasAttribute('value')) {
      this.updateData({
        isEmotion: true,
        selectedEmotion: evt.target.value,
      });
    }
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  removeClickHandler() {
    this.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._clickHandler);
  }

  _addToSpecialListHandler(evt) {
    evt.preventDefault();

    this._callback.specialList({
      isAddedToWatchList: evt.target.hasAttribute('data-watchlist'),
      isAddedToWatched: evt.target.hasAttribute('data-watched'),
      isAddedToFavorite: evt.target.hasAttribute('data-favorite'),
    });
  }

  setSpecialListHandler(callback) {
    this._callback.specialList = callback;

    this.getElement().querySelector('.film-details__controls').addEventListener(
      'click',
      this._addToSpecialListHandler,
    );
  }

  _addDeleteCommentHandler(evt) {
    if (evt.target.className === 'film-details__comment-delete') {
      evt.preventDefault();

      const commentId = evt.currentTarget.getAttribute('comment-id');
      this._callback.deleteComment(commentId);
    }
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteComment = callback;

    this.getElement().querySelectorAll('.film-details__comment')
      .forEach((commentItem) => {
        commentItem.addEventListener('click', this._addDeleteCommentHandler);
      });
  }

  updateComment(commentsUpdate) {
    if (this._filmComments.length < commentsUpdate.length) {
      this.updateData({
        isEmotion: false,
        selectedEmotion: '',
        commentText: '',
      });
    }
    this._filmComments = commentsUpdate;
    this.getElement().querySelector('.film-details__comments-list').innerHTML = createCommentItem(this._filmComments);
    this.getElement().querySelector('.film-details__comments-count').innerHTML = this._filmComments.length;
    this.setDeleteCommentHandler(this._callback.deleteComment);
  }

  addComment() {
    if (!this._filmCardState.selectedEmotion || !this._filmCardState.commentText) {
      return false;
    }
    const newComment = {
      id: 5,
      user: 'Non',
      emotion: this._filmCardState.selectedEmotion,
      commentText: this._filmCardState.commentText,
      data: '2020-03-20',
    };
    return newComment;
  }
}
