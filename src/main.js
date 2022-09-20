import createUserProfileTempale from './view/user-profile';
import createMenuTempale from './view/menu';
import createMovieCardTemplate from './view/ movie-card';
import createMovieWrapper from './view/movie-wrapper';
import createSortCardTempale from './view/sort';
import createShowMoreButton from './view/show-more-button';
import createFilmDetailsTempale from './view/film-details';

const CARD_COUNT = 5;
const CARD_COUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, typeof template === 'function' ? template() : template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserProfileTempale, 'beforeend');
render(siteMainElement, createMenuTempale, 'beforeend');
render(siteMainElement, createSortCardTempale, 'beforeend');
render(siteMainElement, '<section class="films"></section>', 'beforeend');

const allMovieWrapper = siteMainElement.querySelector('.films');

const renderCardContainer = (classNameSection, title, cardCount, classNameContainer) => {
  render(allMovieWrapper, createMovieWrapper(classNameSection, title), 'beforeend');
  const movieWrapper = document.querySelector(classNameContainer);
  for (let i = 0; i < cardCount; i++) {
    render(movieWrapper, createMovieCardTemplate, 'beforeend');
  }
};

renderCardContainer('films-list', 'All movies. Upcoming', CARD_COUNT, '.films-list__container');
renderCardContainer('films-list films-list--extra', 'Top rated', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(2) .films-list__container');
renderCardContainer('films-list films-list--extra', 'Most commented', CARD_COUNT_EXTRA, '.films-list--extra:nth-child(3) .films-list__container');

const movieWrapperMain = allMovieWrapper.querySelector('.films-list');
render(movieWrapperMain, createShowMoreButton, 'beforeend');
render(siteMainElement, createFilmDetailsTempale, 'beforeend');
