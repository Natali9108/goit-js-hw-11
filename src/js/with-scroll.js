import PixabayAPI from './pixabay-api';
import btnUpEL from './btn-up';
import createGalleryCard from '../templates/gallery-card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  observerEl: document.querySelector('.observer'),
};

const pixabayAPI = new PixabayAPI();

refs.searchForm.addEventListener('submit', handelSearchImages);
const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.observerEl);

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

async function handelSearchImages(evt) {
  evt.preventDefault();

  clearImagesContainer();

  pixabayAPI.query = evt.target.elements['searchQuery'].value.trim();
  pixabayAPI.resetPage();

  if (pixabayAPI.query === '') {
    clearImagesContainer();
    makeFailureMessageOnEmptyString();
    return;
  }

  try {
    const data = await pixabayAPI.fetchPhotos();
    if (!data.hits.length) {
      makeWrongMessage();
      return;
    }
    renderImages(data.hits);
    makeSuccesMessage(data.totalHits);
    gallery.refresh();
    smoothScroll();
  } catch (error) {
    console.log(error);
  }
}

function onEntry(entries) {
  try {
    entries.forEach(async entry => {
      if (entry.isIntersecting && pixabayAPI.query !== '') {
        pixabayAPI.incrementPage();
        const data = await pixabayAPI.fetchPhotos();
        renderImages(data.hits);
        gallery.refresh();

        if (refs.galleryEl.childElementCount >= data.totalHits) {
          makeInfoMessage();
          return;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function renderImages(image) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(image));
}

function clearImagesContainer() {
  refs.galleryEl.innerHTML = '';
}

function makeFailureMessageOnEmptyString() {
  Notiflix.Notify.warning('Please, enter your search query');
}

function makeWrongMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function makeSuccesMessage(value) {
  Notiflix.Notify.success(`Hooray! We found ${value} images.`, {
    timeout: 4000,
  });
}

function makeInfoMessage() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
