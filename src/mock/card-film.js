import { getRandomInteger } from '../utils';

const filmNames = [
  'Земля кочевников',
  'Вестсайдская история',
  'Дюна',
  'Интерстеллар',
  'Тайна Коко',
];

const producers = [
  'Ли Анкрич',
  'Мартин Скорсезе',
  'Гай Ричи',
  'Джеймс Кэмерон',
  'Тим Бёртон',
  'Вуди Аллен',
  'Ридли Скотт',
  'Кристофер Нолан',
];

const writers = [
  'Аарон Соркин',
  'Братья Коэны',
  'Квентин Тарантино',
  'Нора Эфрон',
  'Адам Маккей',
  'Алик Салкен',
];

const actors = [
  'Гэри Олдмен',
  'Хавьер Бардем',
  'Кристоф Вальц',
  'Бенедикт Камбербэтч',
  'Дэмиэн Льюис',
  'Киллиан Мёрфи',
  'Уилл Смит',
  'Оливия Колман',
];

const country = [
  'США',
  'Великобритания',
  'Казахстан',
  'Турция',
  'Индия',
];

const genre = [
  'Боевик',
  'Мелодрама',
  'Фантастика',
  'Триллер',
  'Ужасы',
];

const ageRating = [
  '6+',
  '12+',
  '18+',
];

const filmRating = [
  '4.1',
  '8.8',
  '7.0',
  '9.5',
];

const filmDuration = [
  '1h 40m',
  '1h 55m',
  '2h 30m',
  '3h 15m',
];

const description = [
  'Фрэнк Эбегнейл успел поработать врачом, адвокатом и пилотом на пассажирской авиалинии – и все это до достижения полного совершеннолетия в 21 год. Мастер в обмане и жульничестве, он также обладал искусством подделки документов, что в конечном счете принесло ему миллионы долларов, которые он получил по фальшивым чекам Агент ФБР Карл Хэнрэтти отдал бы все, чтобы схватить Фрэнка и привлечь к ответственности за свои деяния, но Фрэнк всегда опережает его на шаг, заставляя продолжать погоню.',
  'Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.',
  'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.',
  'Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.',
];

const user = [
  'Пашка Севостьянов',
  'Людка Филатова',
  'Тема Филатов',
  'Ваня Иванов',
  'Сергей Сергеев',
];

const commentText = [
  'Самый переоцененный фильм в истории кинематографа.',
  'Фильм о том, как великие поступки можно совершать, будучи самым простым человеком.',
  'Классика кинематографа!',
  'Хлам и крошево',
  'Эпичный конец',
];

const commentDate = [
  '2019-05-11',
  '2019-08-16',
  '2020-03-20',
  '2022-03-15',
  '2020-04-09',
];

const emotion = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getRandomItems = (items) => items.filter(() => Boolean(getRandomInteger(0, 1)));

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);
  const url = './images/posters/';
  return url + posters[randomIndex];
};

const generateDateProdaction = () => {
  const productionYear = [
    '2019-05-11',
    '2015-08-16',
    '1974-03-20',
    '2001-03-15',
    '1997-04-09',
  ];

  const randomIndex = getRandomInteger(0, productionYear.length - 1);

  return new Date(productionYear[randomIndex]);
};

const createComment = () => ({
  user: getRandomItem(user),
  emotion: getRandomItem(emotion),
  commentText: getRandomItem(commentText),
  commentDate: getRandomItem(commentDate),
});

const genereteComments = () => {
  const commentCount = getRandomInteger(0, 10);
  const comments = [];
  for (let i = 0; i < commentCount; i++) {
    const comment = createComment();
    comments.push(comment);
  }
  return comments;
};

const generateCardFilm = () => ({
  poster: generatePoster(),
  name: getRandomItem(filmNames),
  producer: getRandomItem(producers),
  screenwriters: getRandomItems(writers),
  actors: getRandomItems(actors),
  rating: getRandomItem(filmRating),
  productionYear: generateDateProdaction(),
  filmDuration: getRandomItem(filmDuration),
  country: getRandomItem(country),
  genre: getRandomItems(genre),
  comment: genereteComments(),
  description: getRandomItem(description),
  ageRating: getRandomItem(ageRating),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

export default generateCardFilm;
