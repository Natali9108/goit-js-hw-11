import axios from 'axios';

export default class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34816104-0e2476e874eadf366edbb741b';

  query = null;
  page = 1;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        page: this.page,
        q: this.query,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: this.#API_KEY,
      },
    });
  }
}
