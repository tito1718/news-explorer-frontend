import "./NewsCard.css";

function NewsCard({
  article,
  isSaved = false,
  isBookmarked = false,
  isLoggedIn = false,
  onSaveArticle,
  onDeleteArticle,
}) {
  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
        />

        {isSaved ? (
          <>
            <span className="news-card__keyword">
              {article.keyword || "Nature"}
            </span>

            <div className="news-card__delete-control">
              <span className="news-card__delete-tooltip">
                Remove from saved
              </span>

              <button
                className="news-card__delete-button"
                type="button"
                aria-label={`Remove ${article.title} from saved articles`}
                onClick={() => onDeleteArticle(article.id)}
              />
            </div>
          </>
        ) : (
          <>
            <button
              className={`news-card__save-button ${
                isBookmarked ? "news-card__save-button_marked" : ""
              }`.trim()}
              type="button"
              aria-label={
                isBookmarked
                  ? `Remove ${article.title} from saved articles`
                  : `Save ${article.title}`
              }
              onClick={() => onSaveArticle(article)}
            />

            {!isLoggedIn && (
              <span className="news-card__save-tooltip">
                Sign in to save articles
              </span>
            )}
          </>
        )}
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
