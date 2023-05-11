import axios from 'axios';
import Notiflix from 'notiflix';
import { imagesMarkup } from './helpers';

const formEl = document.querySelector('.search-form');
const pictureGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let totalPages;
let totalHits;
const totalItemsPerPage = 40;

export async function fetchPictures(query, url, numberPage) {
  try {
    const res = await axios.get(url);
    let data = res;
    data = data.data;
    const markup = imagesMarkup(data);
    pictureGallery.insertAdjacentHTML('beforeend', markup);
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / totalItemsPerPage);
    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      return;
    }
    if (totalHits <= totalItemsPerPage) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      loadMoreBtn.classList.add('is-hidden');
      return;
    }
    if (numberPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      loadMoreBtn.classList.remove('is-hidden');

      return;
    }
    if (totalPages === numberPage) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
  loadMoreBtn.classList.remove('is-hidden');
}
