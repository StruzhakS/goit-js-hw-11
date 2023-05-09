import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const options = new URLSearchParams({
  'API-key': '36236073-560374128ebdbbd6821cfa057',
});

const form = document.querySelector('.search-form');
fetch(BASE_URL, options)
  .then(res => res.json())
  .then(console.log);
