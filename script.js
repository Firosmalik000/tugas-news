const search = document.querySelector('.search-button');
const inputKeyword = document.querySelector('.input-keyword');
let newsData = [];

search.addEventListener('click', function (e) {
  e.preventDefault;
  const keyword = inputKeyword.value;
  fetchNews(keyword);
});
// Fungsi untuk mengambil data berita dari API
function fetchNews(keyword) {
  return fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=b1fcac5f23714f5ab2582ce347bbff75`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === 'False') {
        throw new Error(response.Error);
      }
      newsData = response.articles;
      displayNews(newsData);
    });
}

// Fungsi untuk menampilkan berita dalam bentuk kartu
function displayNews(data) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  data.forEach((article) => {
    // Buat kartu berita menggunakan Bootstrap
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    card.innerHTML += showData(article);
    newsContainer.appendChild(card);
  });
  return;
}
// isi kartu

// event listener untuk livesearch

inputKeyword.addEventListener('input', () => {
  let query = inputKeyword.value.toLowerCase();
  console.log('query', query);

  query.length > 0 ? filterArticle(query) : displayNews(newsData);
});
function filterArticle(query) {
  const filterNews = newsData.filter((e) => e.title.toLowerCase().includes(query));
  displayNews(filterNews);
}
fetchNews('covid');

function showData(article) {
  return `
    <div class="card">
        <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
        <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.publishedAt}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Baca Selengkapnya</a>
        </div>
    </div>
  `;
}
