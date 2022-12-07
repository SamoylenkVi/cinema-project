const dayjs = require('dayjs');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const render = (container, template, place) => {
  const renderingHtml = typeof template === 'function' ? template() : template;

  container.insertAdjacentHTML(place, renderingHtml);
};

const cutText = (text, limit) => {
  let croppedText = text.trim();
  if (croppedText.length <= limit) return croppedText;
  croppedText = croppedText.slice(0, limit - 1).trimEnd();

  return `${croppedText}...`;
};

const addActiveButtonClass = (shouldAddClass, className) => (shouldAddClass ? className : '');

const convertsDate = (date, format) => dayjs(date).format(format);

export {
  render,
  getRandomInteger,
  cutText,
  addActiveButtonClass,
  convertsDate,
};
