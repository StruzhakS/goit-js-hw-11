export function createMarkup(data) {
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

export function imagesMarkup(data) {
  const markup = data.hits.map(createMarkup).join('');
  return markup;
}
