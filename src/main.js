import UserProfileView from './view/user-profile';
import SiteMenuView from './view/menu';
import GenericMovieWrapperView from './view/all-movie-wrapper';
import FilmCardView from './view/movie-card';
import MovieWrapperView from './view/movie-wrapper';
import SortCardMenuView from './view/sort';
import EmptyFilmMessageView from './view/message-empty-film-list';
import ShowMoreButtonView from './view/show-more-button';
import FilmCardDetailsView from './view/film-details';
import {
  renderElement, RenderPosition,
} from './utils';
import { generateCardFilm } from './mock/card-film';
import { FILM_COUNT, Keys } from './constants';

const TASK_COUNT_PER_STEP = 5;
const CARD_COUNT_EXTRA = 2;

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));
const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const page = document.querySelector('body');

renderElement(headerElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SiteMenuView(filmCards).getElement(), RenderPosition.AFTERBEGIN);
renderElement(mainElement, new SortCardMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new GenericMovieWrapperView().getElement(), RenderPosition.BEFOREEND);

const allMovieWrapper = mainElement.querySelector('.films');

const renderCardFilm = (wrapper, card) => {
  const filmCard = new FilmCardView(card);
  const filmDetails = new FilmCardDetailsView(card);

  const closeFilmDetailsHandler = () => {
    mainElement.removeChild(filmDetails.getElement());
    page.classList.remove('hide-overflow');
    filmDetails.removeClickHandler();
  };

  const escapeKeydownHandler = (evt) => {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      closeFilmDetailsHandler();
    }
    document.removeEventListener('keydown', escapeKeydownHandler);
  };

  const showFilmDetailsHandler = () => {
    mainElement.appendChild(filmDetails.getElement());
    page.classList.add('hide-overflow');
    document.addEventListener('keydown', escapeKeydownHandler);
    filmDetails.setClickHandler(closeFilmDetailsHandler);
  };

  filmCard.setClickHandler(showFilmDetailsHandler);

  renderElement(wrapper, filmCard.getElement(), RenderPosition.BEFOREEND);
};

const renderCardContainer = (classNameSection, title, cardCount, classNameContainer) => {
  renderElement(
    allMovieWrapper,
    new MovieWrapperView(classNameSection, title).getElement(),
    RenderPosition.BEFOREEND,
  );

  const movieWrapper = document.querySelector(classNameContainer);

  for (let i = 0; i < Math.min(cardCount, TASK_COUNT_PER_STEP); i++) {
    renderCardFilm(movieWrapper, filmCards[i]);
  }
};

if (filmCards.length > 0) {
  renderCardContainer('films-list', 'All movies. Upcoming', FILM_COUNT, '.films-list__container');
  renderCardContainer('films-list films-list--extra', 'Top rated', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(2) .films-list__container');
  renderCardContainer('films-list films-list--extra', 'Most commented', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(3) .films-list__container');
} else {
  renderElement(
    allMovieWrapper,
    new EmptyFilmMessageView().getElement(),
    RenderPosition.BEFOREEND,
  );
}

const movieListWrapper = document.querySelector('.films-list__container');

const showMoreButtonComponent = new ShowMoreButtonView();

if (filmCards.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const movieWrapperMain = allMovieWrapper.querySelector('.films-list');
  renderElement(movieWrapperMain, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    filmCards
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((filmCard) => renderCardFilm(movieListWrapper, filmCard));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (filmCards.length <= renderedTaskCount) {
      showMoreButtonComponent.getElement().remove();
    }
  });
}
