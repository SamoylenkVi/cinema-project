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
