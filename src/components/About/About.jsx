import authorImage from "../../assets/author-tito.jpg";
import "./About.css";

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <img
        className="about__image"
        src={authorImage}
        alt='Cesar "Tito" Chirino, the developer of NewsExplorer'
      />

      <div className="about__content">
        <h2 className="about__title" id="about-title">
          About the author
        </h2>

        <p className="about__description">
          Hi, I&apos;m Cesar &quot;Tito&quot; Chirino, a software engineering
          student at TripleTen. I designed NewsExplorer as a full-stack
          application using React, JavaScript, Node.js, Express, and MongoDB.
        </p>

        <p className="about__description">
          NewsExplorer allows users to search for recent news articles and save
          their favorites. Building it is helping me strengthen my skills in
          responsive design, reusable components, third-party APIs,
          authentication, and database development.
        </p>
      </div>
    </section>
  );
}

export default About;
