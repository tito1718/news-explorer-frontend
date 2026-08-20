import { useState } from "react";
import { Route, Routes } from "react-router";

import articleDog from "../../assets/article-dog.jpg";
import articleLake from "../../assets/article-lake.jpg";
import articleMoose from "../../assets/article-moose.jpg";
import articleYellowstone from "../../assets/article-yellowstone.jpg";
import articlePolaris from "../../assets/article-polaris.jpg";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading] = useState(false);
  const [searchError] = useState(false);
  const [hasSearched] = useState(true);

  const [articles] = useState([
    {
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
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    setActiveModal("success");
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onSignInClick={handleOpenLogin} />
              <Main
                articles={articles}
                isLoading={isLoading}
                searchError={searchError}
                hasSearched={hasSearched}
              />
              <Footer />
            </>
          }
        />
        <Route path="/saved-news" element={<SavedNews articles={articles} />} />
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
