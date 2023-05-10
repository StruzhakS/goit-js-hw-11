import axios from 'axios';
const formEl = document.querySelector('.search-form');
const userInput = formEl.elements.searchQuery;
const submitBtn = document.querySelector('.submit');
const pictureGallery = document.querySelector('.gallery');
const infoGallery = document.querySelector('.info');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');
const BASE_URL = ` https://pixabay.com/api/?`;

const PARAMS = new URLSearchParams({
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  key: '36236073-560374128ebdbbd6821cfa057',
});
formEl.addEventListener('submit', e => {
  e.preventDefault();
  const name = userInput.value;
  fetchPictures(name);
});

async function fetchPictures(name) {
  PARAMS.set('q', name);
  const url = BASE_URL + PARAMS;
  const res = await fetch(url);
  const data = await res.json();
  const markup = imagesMarkup(data);
  console.log(markup);
  pictureGallery.innerHTML = markup;
}

function createMarkup(data) {
  const { webformatURL, tags, likes, views, comments, downloads } = data;
  return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div> `;
}

function imagesMarkup(data) {
  const markup = data.hits.map(createMarkup).join('');
  return markup;
}
