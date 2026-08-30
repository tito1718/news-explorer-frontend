import About from "../About/About.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import "./Main.css";

function Main({
  articles,
  savedArticles,
  isLoggedIn,
  onSaveArticle,
  onArticleImageError,
  isLoading,
  searchError,
  hasSearched,
  articleError,
}) {
  return (
    <main className="main">
      {isLoading && <Preloader />}

      {!isLoading && searchError && <ErrorMessage />}

      {!isLoading && articleError && (
        <ErrorMessage
          title="Saved articles could not be updated"
          message={articleError}
        />
      )}

      {!isLoading && !searchError && hasSearched && articles.length === 0 && (
        <NothingFound />
      )}

      {!isLoading && !searchError && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          savedArticles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
          onArticleImageError={onArticleImageError}
        />
      )}

      <About />
    </main>
  );
}

export default Main;
