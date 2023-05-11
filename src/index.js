import Notiflix from 'notiflix';
import { fetchPictures } from './js/fetchPicturs';
const formEl = document.querySelector('.search-form');
const userInput = formEl.elements.searchQuery;
const pictureGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const BASE_URL = ` https://pixabay.com/api/?`;
let numberPage = 1;
let query = '';
const totalItemsPerPage = 40;
loadMoreBtn.classList.add('is-hidden');

const PARAMS = new URLSearchParams({
  q: query,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  key: '36236073-560374128ebdbbd6821cfa057',
  page: 1,
  per_page: totalItemsPerPage,
});

formEl.addEventListener('submit', onSearchImages);

function onSearchImages(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('is-hidden');
  numberPage = 1;
  PARAMS.set('page', numberPage);
  pictureGallery.innerHTML = '';
  query = userInput.value;
  PARAMS.set('q', query);
  const url = BASE_URL + PARAMS;

  if (!query) {
    pictureGallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  fetchPictures(query, url, numberPage);
  formEl.reset();
}
loadMoreBtn.addEventListener('click', onLoadMoreImage);

function onLoadMoreImage() {
  numberPage += 1;
  PARAMS.set('page', numberPage);
  const url = BASE_URL + PARAMS;
  fetchPictures(query, url, numberPage);
}
