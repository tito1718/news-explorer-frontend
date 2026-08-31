export function isValidHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function formatDisplayDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function createArticlePayload(article) {
  return {
    keyword: article.keyword,
    title: article.title,
    text: article.description,
    date: article.publishedAt || article.date,
    source: article.source,
    link: article.url,
    image: article.image,
  };
}

export function normalizeSavedArticle(article) {
  return {
    id: article._id,
    keyword: article.keyword,
    title: article.title,
    description: article.text,
    publishedAt: article.date,
    date: formatDisplayDate(article.date),
    source: article.source,
    url: article.link,
    image: article.image,
    owner: article.owner,
  };
}
