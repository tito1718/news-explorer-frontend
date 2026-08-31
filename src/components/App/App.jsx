import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import { getNews } from "../../utils/newsApi.js";
import {
  deleteArticle as deleteSavedArticle,
  getCurrentUser,
  getSavedArticles,
  login,
  register,
  saveArticle as saveSavedArticle,
} from "../../utils/mainApi.js";
import {
  createArticlePayload,
  isValidHttpUrl,
  normalizeSavedArticle,
} from "../../utils/articleUtils.js";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Footer from "../Footer/Footer.jsx";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";

import "./App.css";

const tokenStorageKey = "newsExplorerToken";
const legacyUserStorageKey = "newsExplorerUser";
const legacySavedArticlesStorageKey = "newsExplorerSavedArticles";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem(tokenStorageKey)),
  );
  const [authError, setAuthError] = useState("");
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const isLoggedIn = currentUser !== null;
  const [searchResetKey, setSearchResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [articleError, setArticleError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(tokenStorageKey);

    localStorage.removeItem(legacyUserStorageKey);
    localStorage.removeItem(legacySavedArticlesStorageKey);

    if (!token) {
      return undefined;
    }

    let isActive = true;

    Promise.all([getCurrentUser(token), getSavedArticles(token)])
      .then(([user, storedArticles]) => {
        if (isActive) {
          setCurrentUser(user);
          setSavedArticles(storedArticles.map(normalizeSavedArticle));
        }
      })
      .catch(() => {
        if (isActive) {
          localStorage.removeItem(tokenStorageKey);
          setCurrentUser(null);
          setSavedArticles([]);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsCheckingToken(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSearch(keyword) {
    setSearchKeyword(keyword);

    setIsLoading(true);
    setSearchError(false);
    setHasSearched(true);

    try {
      const data = await getNews(keyword);

      const formattedArticles = (data.articles || [])
        .filter(
          (article) =>
            isValidHttpUrl(article.urlToImage) && isValidHttpUrl(article.url),
        )
        .map((article, index) => ({
          id: `${article.url}-${index}`,
          image: article.urlToImage,
          keyword,
          publishedAt: article.publishedAt,
          date: new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          title: article.title,
          description: article.description || "No description available.",
          source: article.source?.name || "Unknown source",
          url: article.url,
        }));

      setArticles(formattedArticles);
    } catch (error) {
      console.error("News search failed:", error);
      setArticles([]);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function clearAuthError() {
    setAuthError("");
  }

  function clearArticleError() {
    setArticleError("");
  }

  function handleOpenLogin() {
    clearAuthError();
    setActiveModal("login");
  }

  function handleOpenRegister() {
    clearAuthError();
    setActiveModal("register");
  }

  function handleCloseModal() {
    clearAuthError();
    setActiveModal(null);
  }

  async function handleLoginSubmit(formValues) {
    setIsAuthSubmitting(true);
    clearAuthError();

    try {
      const { token } = await login({
        email: formValues.email,
        password: formValues.password,
      });

      const [user, storedArticles] = await Promise.all([
        getCurrentUser(token),
        getSavedArticles(token),
      ]);

      localStorage.setItem(tokenStorageKey, token);
      localStorage.removeItem(legacyUserStorageKey);

      setCurrentUser(user);
      setSavedArticles(storedArticles.map(normalizeSavedArticle));
      handleCloseModal();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsAuthSubmitting(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(legacyUserStorageKey);

    setCurrentUser(null);
    setSavedArticles([]);
    setArticles([]);
    setArticleError("");
    setHasSearched(false);
    setSearchError(false);
    setSearchKeyword("");
    setSearchResetKey((currentKey) => currentKey + 1);
  }

  function handleArticleRequestError(error, fallbackMessage) {
    console.error(fallbackMessage, error);

    if (error.status === 401) {
      handleSignOut();
      setAuthError("Your session expired. Please sign in again.");
      setActiveModal("login");
      return;
    }

    setArticleError(fallbackMessage);
  }

  async function handleRegisterSubmit(formValues) {
    setIsAuthSubmitting(true);
    clearAuthError();

    try {
      await register({
        name: formValues.username,
        email: formValues.email,
        password: formValues.password,
      });

      setActiveModal("success");
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsAuthSubmitting(false);
    }
  }

  function handleArticleImageError(articleId) {
    setArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== articleId),
    );
  }

  async function handleDeleteArticle(articleId) {
    const token = localStorage.getItem(tokenStorageKey);

    if (!token) {
      return;
    }

    clearArticleError();

    try {
      await deleteSavedArticle(articleId, token);

      setSavedArticles((currentArticles) =>
        currentArticles.filter((article) => article.id !== articleId),
      );
    } catch (error) {
      handleArticleRequestError(
        error,
        "We couldn't remove this article. Please try again.",
      );
    }
  }

  async function handleSaveArticle(article) {
    if (!isLoggedIn) {
      handleOpenLogin();
      return;
    }

    const token = localStorage.getItem(tokenStorageKey);

    if (!token) {
      handleSignOut();
      return;
    }

    clearArticleError();

    const storedArticle = savedArticles.find(
      (savedArticle) => savedArticle.url === article.url,
    );

    try {
      if (storedArticle) {
        await deleteSavedArticle(storedArticle.id, token);

        setSavedArticles((currentArticles) =>
          currentArticles.filter(
            (savedArticle) => savedArticle.id !== storedArticle.id,
          ),
        );

        return;
      }

      const createdArticle = await saveSavedArticle(
        createArticlePayload(article),
        token,
      );

      setSavedArticles((currentArticles) => [
        ...currentArticles,
        normalizeSavedArticle(createdArticle),
      ]);
    } catch (error) {
      handleArticleRequestError(
        error,
        "We couldn't update your saved articles. Please try again.",
      );
    }
  }

  if (isCheckingToken) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onSignInClick={handleOpenLogin}
                  onSignOutClick={handleSignOut}
                  searchResetKey={searchResetKey}
                  searchKeyword={searchKeyword}
                  onSearch={handleSearch}
                />
                <Main
                  articles={articles}
                  savedArticles={savedArticles}
                  isLoggedIn={isLoggedIn}
                  onSaveArticle={handleSaveArticle}
                  onArticleImageError={handleArticleImageError}
                  isLoading={isLoading}
                  searchError={searchError}
                  hasSearched={hasSearched}
                  articleError={articleError}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute>
                <SavedNews
                  articles={savedArticles}
                  onSignOutClick={handleSignOut}
                  onDeleteArticle={handleDeleteArticle}
                  articleError={articleError}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {activeModal === "login" && (
          <LoginModal
            onClose={handleCloseModal}
            onSubmit={handleLoginSubmit}
            onSwitchModal={handleOpenRegister}
            onClearError={clearAuthError}
            isSubmitting={isAuthSubmitting}
            serverError={authError}
          />
        )}

        {activeModal === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            onSubmit={handleRegisterSubmit}
            onSwitchModal={handleOpenLogin}
            onClearError={clearAuthError}
            isSubmitting={isAuthSubmitting}
            serverError={authError}
          />
        )}

        {activeModal === "success" && (
          <RegistrationSuccessModal
            onClose={handleCloseModal}
            onSignInClick={handleOpenLogin}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
