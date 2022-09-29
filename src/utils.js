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
  // eslint-disable-next-line no-param-reassign
  text = text.trim();
  if (text.length <= limit) return text;
  // eslint-disable-next-line no-param-reassign
  text = text.slice(0, limit - 1);
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    text.substr(0, lastSpace);
  }
  return `${text}...`;
};

const addActiveButtonClass = (button, className) => (button ? className : '');

export {
  render, getRandomInteger, cutText, addActiveButtonClass,
};
