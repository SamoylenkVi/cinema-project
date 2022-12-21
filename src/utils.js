const dayjs = require('dayjs');

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      container.append(element);
      break;
  }
};

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
