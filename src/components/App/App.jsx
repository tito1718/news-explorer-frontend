import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />

      <main>
        <About />
      </main>

      <Footer />
    </div>
  );
}

export default App;
