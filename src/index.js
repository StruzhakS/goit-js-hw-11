import axios from 'axios';
import Notiflix from 'notiflix';
import { createMarkup, imagesMarkup } from './js/helpers';

const formEl = document.querySelector('.search-form');
const userInput = formEl.elements.searchQuery;
const submitBtn = document.querySelector('.submit');
const pictureGallery = document.querySelector('.gallery');
const infoGallery = document.querySelector('.info');
const loadMoreBtn = document.querySelector('.load-more');
const BASE_URL = ` https://pixabay.com/api/?`;
let numberPage = 1;
let query = '';
let totalPages;
let totalHits;
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

formEl.addEventListener('submit', e => {
  e.preventDefault();
  numberPage = 1;
  PARAMS.set('page', numberPage);
  pictureGallery.innerHTML = '';
  query = userInput.value;

  if (!query) {
    pictureGallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  fetchPictures(query);
  formEl.reset();
});

loadMoreBtn.addEventListener('click', onLoadMoreImage);
function onLoadMoreImage(e) {
  numberPage += 1;
  PARAMS.set('page', numberPage);
  fetchPicturesOnLoadMore(query);
}

async function fetchPictures(name) {
  PARAMS.set('q', name);
  const url = BASE_URL + PARAMS;
  const res = await fetch(url);
  const data = await res.json();
  const markup = imagesMarkup(data);
  pictureGallery.insertAdjacentHTML('beforeend', markup);
  totalHits = data.totalHits;

  if (totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.classList.add('is-hidden');

    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  if (totalHits <= totalItemsPerPage) {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  loadMoreBtn.classList.remove('is-hidden');
}

async function fetchPicturesOnLoadMore(name) {
  PARAMS.set('q', name);
  const url = BASE_URL + PARAMS;
  const res = await fetch(url);
  const data = await res.json();
  const markup = imagesMarkup(data);
  pictureGallery.insertAdjacentHTML('beforeend', markup);
  totalPages = Math.ceil(totalHits / totalItemsPerPage);

  if (data.totalHits <= totalItemsPerPage) {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  if (totalPages === numberPage) {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  loadMoreBtn.classList.remove('is-hidden');
}
