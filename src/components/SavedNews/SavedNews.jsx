import Navigation from "../Navigation/Navigation.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNews.css";

function SavedNews({ articles }) {
  return (
    <div className="saved-news-page">
      <Navigation isLoggedIn userName="Elise" theme="light" />

      <main className="saved-news">
        <section
          className="saved-news__header"
          aria-labelledby="saved-news-title"
        >
          <p className="saved-news__label">Saved articles</p>

          <h1 className="saved-news__title" id="saved-news-title">
            Elise, you have 5 saved articles
          </h1>

          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-accent">
              Nature, Yellowstone, and 2 others
            </span>
          </p>
        </section>
        <NewsCardList
          articles={articles}
          title=""
          showMoreButton={false}
          isSavedList
        />
      </main>

      <Footer />
    </div>
  );
}

export default SavedNews;
