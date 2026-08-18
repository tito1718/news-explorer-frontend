import { useState } from "react";
import articleDog from "../../assets/article-dog.jpg";
import articleLake from "../../assets/article-lake.jpg";
import articleMoose from "../../assets/article-moose.jpg";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import "./App.css";

function App() {
  const [isLoading] = useState(false);
  const [searchError] = useState(false);
  const [hasSearched] = useState(true);

  const [articles] = useState([
    {
      image: articleDog,
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
      publishedAt: "2019-02-19",
      date: "February 19, 2019",
      title: "Nature makes you better",
      description:
        "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
      source: "National Geographic",
      url: "https://www.nationalgeographic.com/",
    },
    {
      image: articleMoose,
      publishedAt: "2020-10-19",
      date: "October 19, 2020",
      title: "Grand Teton Renews Historic Crest Trail",
      description:
        "The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be able to visit the most scenic areas.",
      source: "National Parks Traveler",
      url: "https://www.nationalparkstraveler.org/",
    },
  ]);

  return (
    <div className="page">
      <Header />
      <Main
        articles={articles}
        isLoading={isLoading}
        searchError={searchError}
        hasSearched={hasSearched}
      />
      <Footer />
    </div>
  );
}

export default App;
