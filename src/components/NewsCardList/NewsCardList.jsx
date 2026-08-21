import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  title = "Search results",
  showMoreButton = true,
  isSavedList = false,
  onDeleteArticle,
  savedArticles = [],
  isLoggedIn = false,
  onSaveArticle,
}) {
  return (
    <section className="news-card-list" aria-label={title || "Saved articles"}>
      {title && <h2 className="news-card-list__title">{title}</h2>}

      <div className="news-card-list__grid">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            isSaved={isSavedList}
            isBookmarked={savedArticles.some(
              (savedArticle) => savedArticle.id === article.id,
            )}
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
          />
        ))}
      </div>

      {showMoreButton && (
        <button className="news-card-list__show-more" type="button">
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
