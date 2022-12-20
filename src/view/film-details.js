import { addActiveButtonClass, convertsDate, createElement } from '../utils';
import allComments from '../mock/film-comments';

const RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:m';
const ACTIVE_BUTTON_CLASS = 'film-details__control-button--active';

const createGenreItem = (items) => {
  const genreMarkup = items.map((item) => `<span class="film-details__genre">${item}</span>`);
  return genreMarkup.join('');
};

const createCommentItem = (items) => {
  const CommentMarkup = items.map((item) => {
    const {
      user, emotion, commentText, commentDate,
    } = item;
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
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

const createFilmDetailsTemplate = (movieCard) => {
  const {
    id,
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
  } = movieCard;

  const cardComments = allComments[id];

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
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isWatchList, ACTIVE_BUTTON_CLASS)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isWatched, ACTIVE_BUTTON_CLASS)} film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${addActiveButtonClass(isFavorite, ACTIVE_BUTTON_CLASS)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${cardComments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentItem(cardComments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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

export default class FilmCardDetails {
  constructor(filmCard) {
    this._filmCard = filmCard;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCard);
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
