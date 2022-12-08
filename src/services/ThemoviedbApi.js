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

  fetchCastById(id) {
    return fetch(`${this.URL}/3/movie/${id}/credits?api_key=${this.KEY}`).then(
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

  fetchMovieByQuery(query) {
    return fetch(
      `${this.URL}/3/search/movie?api_key=${this.KEY}&query=${query}`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(
        new Error('Ошибка. Почему то не смог найти фильмы.')
      );
    });
  }
}

export default ThemoviedbApi;
