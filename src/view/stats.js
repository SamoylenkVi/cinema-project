import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import Smart from './smart';
import { TIME_REG } from '../constants';

dayjs.extend(duration);

const renderFilmChart = (chart, genreNames, genreCounts) => {
  const BAR_HEIGHT = 50;
  // eslint-disable-next-line no-param-reassign
  chart.height = BAR_HEIGHT * genreCounts.length;

  return new Chart(chart, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genreNames,
      datasets: [{
        data: genreCounts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = (filmCount, hourDuration, minutesDuration, topGenre) => `
<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hourDuration}<span class="statistic__item-description">h</span>${minutesDuration}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;

export default class Statistic extends Smart {
  constructor(films) {
    super();
    this._films = films.slice();

    this._filmStatistic = null;
    this._hourDuration = null;
    this._minutesDuration = null;
    this._topGenre = null;

    this._statisticGenre = [];
    this._statisticGenreCount = [];

    this._calculateStatisticFilm();
    this._humanizeDurationTime();
    this._sortedGenreStatistic();

    this._filmCount = this._filmStatistic.watchedFilm;

    this._filmsChart = null;
    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate(
      this._filmCount,
      this._hourDuration,
      this._minutesDuration,
      this._topGenre,
    );
  }

  rerenderStatistic(updateFilm) {
    this._films = updateFilm.slice();
    this._statisticGenre = [];
    this._statisticGenreCount = [];
    this._calculateStatisticFilm();
    this._humanizeDurationTime();
    this._sortedGenreStatistic();
    this._filmCount = this._filmStatistic.watchedFilm;
    this.updateElement();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _calculateStatisticFilm() {
    const initialValue = {
      watchedFilm: 0,
      totalDuration: dayjs.duration({
        hours: 0,
        minutes: 0,
      }),
      favoriteGenre: {},
    };

    this._filmStatistic = this._films.reduce((accumulator, currentValue) => {
      if (currentValue.isWatched) {
        accumulator.watchedFilm += 1;
        const filmTime = currentValue.filmDuration.match(TIME_REG);
        const hours = Number(filmTime[1]);
        const minutes = Number(filmTime[2]);

        accumulator.totalDuration = accumulator.totalDuration.add({ hours, minutes });

        currentValue.genre.forEach((genre) => {
          if (accumulator.favoriteGenre[genre] !== undefined) {
            accumulator.favoriteGenre[genre] += 1;
          } else {
            accumulator.favoriteGenre[genre] = 1;
          }
        });
      }
      return accumulator;
    }, initialValue);
  }

  _humanizeDurationTime() {
    this._hourDuration = Math.floor(this._filmStatistic.totalDuration.asMinutes() / 60);
    this._minutesDuration = this._filmStatistic.totalDuration.asMinutes() % 60;
  }

  _sortedGenreStatistic() {
    if (Object.keys(this._filmStatistic.favoriteGenre).length === 0) {
      this._topGenre = 'no popular genre';
      return;
    }

    const sortGenre = Object.entries(this._filmStatistic.favoriteGenre)
      .sort((a, b) => b[1] - a[1]);

    const [genreTopName] = sortGenre[0];
    this._topGenre = genreTopName;

    sortGenre.forEach(([genreName, count]) => {
      this._statisticGenre.push(genreName);
      this._statisticGenreCount.push(count);
    });
  }

  _setCharts() {
    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }

    const chart = this.getElement().querySelector('.statistic__chart');
    this._filmsChart = renderFilmChart(chart, this._statisticGenre, this._statisticGenreCount);
  }
}
