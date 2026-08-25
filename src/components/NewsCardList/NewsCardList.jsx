import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

const articlesPerPage = 3;

function NewsCardList({
  articles,
  title = "Search results",
  showMoreButton = true,
  isSavedList = false,
  savedArticles = [],
  isLoggedIn = false,
  onSaveArticle,
  onDeleteArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(articlesPerPage);

  function handleShowMore() {
    setVisibleCount((currentCount) => currentCount + articlesPerPage);
  }

  const visibleArticles = showMoreButton
    ? articles.slice(0, visibleCount)
    : articles;

  const hasMoreArticles = showMoreButton && visibleCount < articles.length;

  return (
    <section className="news-card-list" aria-label={title || "Saved articles"}>
      {title && <h2 className="news-card-list__title">{title}</h2>}

      <div className="news-card-list__grid">
        {visibleArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            isSaved={isSavedList}
            isBookmarked={
              isLoggedIn &&
              savedArticles.some(
                (savedArticle) => savedArticle.url === article.url,
              )
            }
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
          />
        ))}
      </div>

      {hasMoreArticles && (
        <button
          className="news-card-list__show-more"
          type="button"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
