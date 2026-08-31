const NEWS_API_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then((error) => {
    return Promise.reject(
      new Error(error.message || `Request failed: ${response.status}`),
    );
  });
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getNews(keyword) {
  const currentDate = new Date();
  const previousDate = new Date();

  previousDate.setDate(currentDate.getDate() - 7);

  const parameters = new URLSearchParams({
    q: keyword,
    apiKey: API_KEY,
    from: formatDate(previousDate),
    to: formatDate(currentDate),
    pageSize: "100",
  });

  return fetch(`${NEWS_API_URL}?${parameters.toString()}`).then(checkResponse);
}
