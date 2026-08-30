const MAIN_API_URL =
  import.meta.env.VITE_MAIN_API_URL ||
  "https://api.tito-wtwr.crabdance.com/news-explorer";

function checkResponse(response) {
  return response.json().then((data) => {
    if (response.ok) {
      return data;
    }

    const error = new Error(
      data.message || `Request failed: ${response.status}`,
    );

    error.status = response.status;

    return Promise.reject(error);
  });
}

function request(path, options = {}) {
  return fetch(`${MAIN_API_URL}${path}`, options).then(checkResponse);
}

function createHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function register({ name, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(token) {
  return request("/users/me", {
    headers: createHeaders(token),
  });
}

export function getSavedArticles(token) {
  return request("/articles", {
    headers: createHeaders(token),
  });
}

export function saveArticle(article, token) {
  return request("/articles", {
    method: "POST",
    headers: createHeaders(token),
    body: JSON.stringify(article),
  });
}

export function deleteArticle(articleId, token) {
  return request(`/articles/${articleId}`, {
    method: "DELETE",
    headers: createHeaders(token),
  });
}
