import About from "../About/About.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./Main.css";

function Main({ articles }) {
  return (
    <main className="main">
      <NewsCardList articles={articles} />
      <About />
    </main>
  );
}

export default Main;
