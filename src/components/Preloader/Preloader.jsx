import "./Preloader.css";

function Preloader() {
  return (
    <section
      className="preloader"
      aria-live="polite"
      aria-busy="true"
      aria-label="Searching for news"
    >
      <span className="preloader__circle" aria-hidden="true" />
      <p className="preloader__text">Searching for news...</p>
    </section>
  );
}

export default Preloader;
