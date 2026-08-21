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
  isLoading,
  searchError,
  hasSearched,
}) {
  return (
    <main className="main">
      {isLoading && <Preloader />}

      {!isLoading && searchError && <ErrorMessage />}

      {!isLoading && !searchError && hasSearched && articles.length === 0 && (
        <NothingFound />
      )}

      {!isLoading && !searchError && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          savedArticles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
        />
      )}

      <About />
    </main>
  );
}

export default Main;
