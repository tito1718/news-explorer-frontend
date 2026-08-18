import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list" aria-labelledby="search-results-title">
      <h2 className="news-card-list__title" id="search-results-title">
        Search results
      </h2>

      <div className="news-card-list__grid">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>

      <button className="news-card-list__show-more" type="button">
        Show more
      </button>
    </section>
  );
}

export default NewsCardList;
