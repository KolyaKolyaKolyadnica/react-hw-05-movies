class ThemoviedbApi {
  constructor() {
    this.URL = `https://api.themoviedb.org`;
    this.KEY = '63fcefaaeb569f05e001a1d867f25d51';

    // this.page = 1;
    // this.perPage = 12;
  }

  fetchTrend() {
    return fetch(`${this.URL}/3/trending/all/day?api_key=${this.KEY}`).then(
      response => {
        if (response.ok) {
          return response.json();
        }
      }
    );
  }

  fetchMovieById(id) {
    return fetch(`${this.URL}/3/movie/${id}?api_key=${this.KEY}`).then(
      response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Ошибка. Что то пошло не так.'));
      }
    );
  }

  fetchReviewsById(id) {
    return fetch(`${this.URL}/3/movie/${id}/reviews?api_key=${this.KEY}`).then(
      response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error('Ошибка. Почему то не смог найти отзывы.')
        );
      }
    );
  }

  // https://api.themoviedb.org/3/credit/{credit_id}?api_key=<<api_key>>
  fetchCastById(id) {
    return fetch(`${this.URL}/3/credit/${id}?api_key=${this.KEY}`).then(
      response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error('Ошибка. Почему то не смог найти актёров.')
        );
      }
    );
  }
}

export default ThemoviedbApi;
// https://api.themoviedb.org/3/movie/550?api_key=63fcefaaeb569f05e001a1d867f25d51
