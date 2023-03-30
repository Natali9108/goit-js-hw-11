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
refs.loadMoreBtn.addEventListener('click', handelLoadMore);

function handelSearchImages(evt) {
  evt.preventDefault();

  clearImagesContainer();
  // const searchQuery = evt.target.elements['searchQuery'].value.trim();
  // pixabayAPI.query = searchQuery;
  pixabayAPI.query = evt.target.elements['searchQuery'].value.trim();
  pixabayAPI.page = 1;

  pixabayAPI.fetchPhotos().then(image => {
    console.log(image);
    if (!image.length) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (pixabayAPI.query === '') {
      refs.loadMoreBtn.classList.add('is-hidden');
      clearImagesContainer();
      Notiflix.Notify.info('Please, enter your search query');
    } else {
      renderImages(image);
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  });
}

function handelLoadMore() {
  pixabayAPI.fetchPhotos().then(image => {
    renderImages(image);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}

function renderImages(image) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(image));
  // refs.galleryEl.innerHTML = createGalleryCard(image);
}

function clearImagesContainer() {
  refs.galleryEl.innerHTML = '';
}
