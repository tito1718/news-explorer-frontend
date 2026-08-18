import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
        />

        <button
          className="news-card__save-button"
          type="button"
          aria-label="Save article"
        />
      </div>

      <div className="news-card__content">
        <time className="news-card__date" dateTime={article.publishedAt}>
          {article.date}
        </time>

        <h3 className="news-card__title">
          <a
            className="news-card__title-link"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            {article.title}
          </a>
        </h3>

        <p className="news-card__description">{article.description}</p>

        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
