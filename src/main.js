import createUserProfileTemplate from './view/user-profile';
import SiteMenuView from './view/menu';
import createMovieCardTemplate from './view/ movie-card';
import createMovieWrapper from './view/movie-wrapper';
import SortCardMenuView from './view/sort';
import createShowMoreButton from './view/show-more-button';
// import createFilmDetailsTemplate from './view/film-details';
import {
  render, renderElement, RenderPosition,
} from './utils';
import { generateCardFilm } from './mock/card-film';
import { FILM_COUNT } from './constants';

const TASK_COUNT_PER_STEP = 5;
const CARD_COUNT_EXTRA = 2;

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));
const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(headerElement, createUserProfileTemplate, 'beforeend');
renderElement(mainElement, new SiteMenuView(filmCards).getElement(), RenderPosition.AFTERBEGIN);
renderElement(mainElement, new SortCardMenuView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, '<section class="films"></section>', 'beforeend');

const allMovieWrapper = mainElement.querySelector('.films');

const renderCardContainer = (classNameSection, title, cardCount, classNameContainer) => {
  render(allMovieWrapper, createMovieWrapper(classNameSection, title), 'beforeend');
  const movieWrapper = document.querySelector(classNameContainer);
  for (let i = 0; i < Math.min(cardCount, TASK_COUNT_PER_STEP); i++) {
    render(movieWrapper, createMovieCardTemplate(filmCards[i]), 'beforeend');
  }
};

renderCardContainer('films-list', 'All movies. Upcoming', FILM_COUNT, '.films-list__container');

const movieListWrapper = document.querySelector('.films-list__container');

if (filmCards.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const movieWrapperMain = allMovieWrapper.querySelector('.films-list');
  render(movieWrapperMain, createShowMoreButton, 'beforeend');

  const loadMoreButton = document.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((filmCard) => render(movieListWrapper, createMovieCardTemplate(filmCard), 'beforeend'));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (filmCards.length <= renderedTaskCount) {
      loadMoreButton.remove();
    }
  });
}

renderCardContainer('films-list films-list--extra', 'Top rated', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(2) .films-list__container');
renderCardContainer('films-list films-list--extra', 'Most commented', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(3) .films-list__container');

// render(mainElement, createFilmDetailsTemplate(filmCards[0]), 'beforeend');
