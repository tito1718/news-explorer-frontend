import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  title = "Search results",
  showMoreButton = true,
  isSavedList = false,
}) {
  return (
    <section className="news-card-list" aria-label={title || "Saved articles"}>
      {title && <h2 className="news-card-list__title">{title}</h2>}

      <div className="news-card-list__grid">
        {articles.map((article) => (
          <NewsCard
            key={`${article.url}-${article.title}`}
            article={article}
            isSaved={isSavedList}
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
