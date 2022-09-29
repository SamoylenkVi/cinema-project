import genereteFilmFilters from '../mock/filter';

const createFilterLink = (films) => {
  const filters = genereteFilmFilters(films);
  const filterMarkup = filters.map((filter) => {
    const { name, count } = filter;
    return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  });
  return filterMarkup.join('');
};

const createMenuTempale = (filmCards) => `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        ${createFilterLink(filmCards)}
      </div>
      <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
    </nav>`;
export default createMenuTempale;
