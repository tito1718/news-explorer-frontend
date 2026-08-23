import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import articleDog from "../../assets/article-dog.jpg";
import articleLake from "../../assets/article-lake.jpg";
import articleMoose from "../../assets/article-moose.jpg";
import articleYellowstone from "../../assets/article-yellowstone.jpg";
import articlePolaris from "../../assets/article-polaris.jpg";

import { getNews } from "../../utils/newsApi.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";

import "./App.css";

const simulatedUser = {
  name: "Tito",
};

const registeredUserStorageKey = "newsExplorerRegisteredUser";
const tokenStorageKey = "newsExplorerToken";
const userStorageKey = "newsExplorerUser";
const savedArticlesStorageKey = "newsExplorerSavedArticles";

function getStoredUser() {
  const savedToken = localStorage.getItem(tokenStorageKey);
  const savedUser = localStorage.getItem(userStorageKey);

  if (!savedToken || !savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);
    return null;
  }
}

function getStoredArticles(defaultArticles) {
  const storedArticles = localStorage.getItem(savedArticlesStorageKey);

  if (!storedArticles) {
    return defaultArticles;
  }

  try {
    return JSON.parse(storedArticles);
  } catch {
    localStorage.removeItem(savedArticlesStorageKey);
    return defaultArticles;
  }
}

function getRegisteredUser() {
  const savedRegisteredUser = localStorage.getItem(registeredUserStorageKey);

  if (!savedRegisteredUser) {
    return null;
  }

  try {
    return JSON.parse(savedRegisteredUser);
  } catch {
    localStorage.removeItem(registeredUserStorageKey);
    return null;
  }
}

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [registeredUser, setRegisteredUser] = useState(getRegisteredUser);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const isLoggedIn = currentUser !== null;

  const [searchResetKey, setSearchResetKey] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [exampleArticles] = useState([
    {
      id: 1,
      image: articleDog,
      keyword: "Nature",
      publishedAt: "2020-11-04",
      date: "November 4, 2020",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      description:
        'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find.',
      source: "Treehugger",
      url: "https://www.treehugger.com/",
    },
    {
      id: 2,
      image: articleLake,
      keyword: "Nature",
      publishedAt: "2019-02-19",
      date: "February 19, 2019",
      title: "Nature makes you better",
      description:
        "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
      source: "National Geographic",
      url: "https://www.nationalgeographic.com/",
    },
    {
      id: 3,
      image: articleYellowstone,
      keyword: "Yellowstone",
      publishedAt: "2020-10-19",
      date: "October 19, 2020",
      title: "Nostalgic Photos of Tourists in U.S. National Parks",
      description:
        "Uri and Helle Golman are National Geographic Explorers and conservation photographers who completed a project and book they call their love letter to nature.",
      source: "National Geographic",
      url: "https://www.nationalgeographic.com/",
    },
    {
      id: 4,
      image: articleMoose,
      keyword: "Parks",
      publishedAt: "2020-10-19",
      date: "October 19, 2020",
      title: "Grand Teton Renews Historic Crest Trail",
      description:
        "The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be able to visit the most scenic areas.",
      source: "National Parks Traveler",
      url: "https://www.nationalparkstraveler.org/",
    },
    {
      id: 5,
      image: articlePolaris,
      keyword: "Photography",
      publishedAt: "2020-03-16",
      date: "March 16, 2020",
      title: "Scientists Don't Know Why Polaris Is So Weird",
      description:
        "Humans have long relied on the starry sky to explore new frontiers, sail to the edge of the world, and find their way back home. Even animals look to the stars to guide them.",
      source: "Treehugger",
      url: "https://www.treehugger.com/",
    },
  ]);
  const [articles, setArticles] = useState([]);

  const [savedArticles, setSavedArticles] = useState(() =>
    getStoredArticles(exampleArticles),
  );

  useEffect(() => {
    localStorage.setItem(
      savedArticlesStorageKey,
      JSON.stringify(savedArticles),
    );
  }, [savedArticles]);

  async function handleSearch(keyword) {
    setSearchKeyword(keyword);

    setIsLoading(true);
    setSearchError(false);
    setHasSearched(true);

    try {
      const data = await getNews(keyword);

      const formattedArticles = (data.articles || []).map((article, index) => ({
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

  function handleOpenLogin() {
    setActiveModal("login");
  }

  function handleOpenRegister() {
    setActiveModal("register");
  }

  function handleCloseModal() {
    setActiveModal(null);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    const user = registeredUser || simulatedUser;

    localStorage.setItem(tokenStorageKey, "simulated-token");
    localStorage.setItem(userStorageKey, JSON.stringify(user));

    setCurrentUser(user);
    handleCloseModal();
  }

  function handleSignOut() {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);

    setCurrentUser(null);
    setArticles([]);
    setHasSearched(false);
    setSearchError(false);
    setSearchKeyword("");
    setSearchResetKey((currentKey) => currentKey + 1);
  }

  function handleRegisterSubmit(formValues) {
    const newUser = {
      name: formValues.username,
      email: formValues.email,
    };

    localStorage.setItem(registeredUserStorageKey, JSON.stringify(newUser));

    setRegisteredUser(newUser);
    setActiveModal("success");
  }

  function handleDeleteArticle(articleUrl) {
    setSavedArticles((currentArticles) =>
      currentArticles.filter((article) => article.url !== articleUrl),
    );
  }

  function handleSaveArticle(article) {
    if (!isLoggedIn) {
      handleOpenLogin();
      return;
    }

    setSavedArticles((currentArticles) => {
      const isAlreadySaved = currentArticles.some(
        (savedArticle) => savedArticle.url === article.url,
      );

      if (isAlreadySaved) {
        return currentArticles.filter(
          (savedArticle) => savedArticle.url !== article.url,
        );
      }

      return [...currentArticles, article];
    });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                onSignInClick={handleOpenLogin}
                onSignOutClick={handleSignOut}
                isLoggedIn={isLoggedIn}
                userName={currentUser?.name}
                searchResetKey={searchResetKey}
                searchKeyword={searchKeyword}
                onSearch={handleSearch}
              />
              <Main
                articles={articles}
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                isLoading={isLoading}
                searchError={searchError}
                hasSearched={hasSearched}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            isLoggedIn ? (
              <SavedNews
                articles={savedArticles}
                userName={currentUser.name}
                onSignOutClick={handleSignOut}
                onDeleteArticle={handleDeleteArticle}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      {activeModal === "login" && (
        <LoginModal
          onClose={handleCloseModal}
          onSubmit={handleLoginSubmit}
          onSwitchModal={handleOpenRegister}
        />
      )}

      {activeModal === "register" && (
        <RegisterModal
          onClose={handleCloseModal}
          onSubmit={handleRegisterSubmit}
          onSwitchModal={handleOpenLogin}
        />
      )}

      {activeModal === "success" && (
        <RegistrationSuccessModal
          onClose={handleCloseModal}
          onSignInClick={handleOpenLogin}
        />
      )}
    </div>
  );
}

export default App;
