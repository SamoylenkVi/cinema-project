const dayjs = require('dayjs');

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();

  return newElement.firstChild;
};

export const cutText = (text, limit) => {
  let croppedText = text.trim();
  if (croppedText.length <= limit) return croppedText;
  croppedText = croppedText.slice(0, limit - 1).trimEnd();

  return `${croppedText}...`;
};

export const addActiveButtonClass = (shouldAddClass, className) => (shouldAddClass ? className : '');

export const convertsDate = (date, format) => dayjs(date).format(format);
export const convertsDateToIso = (date) => dayjs(date).toISOString();

export const dateSort = (a, b) => b.productionYear - a.productionYear;

export const ratingSort = (a, b) => b.rating - a.rating;

export const humanizedRuntime = (time) => `${Math.floor(time / 60)}h ${time % 60}m`;

export const isInPeriod = (films, dateFormat, isWeekPeriod) => {
  let startWeek;
  let endWeek;
  const currentDay = convertsDate(dayjs(), dateFormat);

  if (isWeekPeriod) {
    startWeek = convertsDate((dayjs().weekday(1)), dateFormat);
    endWeek = convertsDate((dayjs().weekday(7)), dateFormat);
  }

  const filmsInPeriod = films.filter((film) => {
    const filmWatchedDay = convertsDate(film.watchingDate, dateFormat);
    if (isWeekPeriod) {
      const dayDifferenceFirstWeek = dayjs(filmWatchedDay).diff(dayjs(startWeek), 'day');
      const dayDifferenceAfterWeek = dayjs(endWeek).diff(dayjs(filmWatchedDay), 'day');
      return (dayDifferenceFirstWeek >= 0 && dayDifferenceAfterWeek <= 7);
    }
    return currentDay === filmWatchedDay;
  });

  return filmsInPeriod;
};
