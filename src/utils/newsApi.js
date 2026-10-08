const MAIN_API_URL =
  import.meta.env.VITE_MAIN_API_URL ||
  "https://apps.ldtp.com/news-explorer";

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
    from: formatDate(previousDate),
    to: formatDate(currentDate),
    pageSize: "100",
  });

  return fetch(`${MAIN_API_URL}/news?${parameters.toString()}`).then(checkResponse);
}
