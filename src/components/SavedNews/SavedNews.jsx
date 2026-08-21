import Navigation from "../Navigation/Navigation.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNews.css";

function getKeywordSummary(articles) {
  const keywords = [...new Set(articles.map((article) => article.keyword))];

  if (keywords.length === 0) {
    return "No keywords";
  }

  if (keywords.length === 1) {
    return keywords[0];
  }

  if (keywords.length === 2) {
    return `${keywords[0]} and ${keywords[1]}`;
  }

  const remainingCount = keywords.length - 2;
  const remainingLabel = remainingCount === 1 ? "other" : "others";

  return `${keywords[0]}, ${keywords[1]}, and ${remainingCount} ${remainingLabel}`;
}

function SavedNews({ articles, userName, onSignOutClick, onDeleteArticle }) {
  const keywordSummary = getKeywordSummary(articles);
  const articleLabel = articles.length === 1 ? "article" : "articles";

  return (
    <div className="saved-news-page">
      <Navigation
        isLoggedIn
        userName={userName}
        theme="light"
        onSignOutClick={onSignOutClick}
      />

      <main className="saved-news">
        <section
          className="saved-news__header"
          aria-labelledby="saved-news-title"
        >
          <p className="saved-news__label">Saved articles</p>

          <h1 className="saved-news__title" id="saved-news-title">
            {userName}, you have {articles.length} saved {articleLabel}{" "}
          </h1>

          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-accent">
              {keywordSummary}
            </span>
          </p>
        </section>
        <NewsCardList
          articles={articles}
          title=""
          showMoreButton={false}
          isSavedList
          onDeleteArticle={onDeleteArticle}
        />
      </main>

      <Footer />
    </div>
  );
}

export default SavedNews;
