import PixabayAPI from './pixabay-api';
import createGalleryCard from '../templates/gallery-card.hbs';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// console.log(refs);

const pixabayAPI = new PixabayAPI();

refs.searchForm.addEventListener('submit', handelSearchImages);

function handelSearchImages(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.elements['searchQuery'].value.trim();
  pixabayAPI.query = searchQuery;

  pixabayAPI.fetchPhotos().then(image => renderImages(image.data.hits));
}

function renderImages(image) {
  const markup = createGalleryCard(image);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
