import axios from 'axios';

export default class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34816104-0e2476e874eadf366edbb741b';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    try {
      console.log(this);
      return axios
        .get(`${this.#BASE_URL}`, {
          params: {
            page: this.page,
            q: this.searchQuery,
            per_page: 3,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            key: this.#API_KEY,
          },
        })
        .then(image => {
          this.incrementPage();
          return image.data.hits;
        });
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
