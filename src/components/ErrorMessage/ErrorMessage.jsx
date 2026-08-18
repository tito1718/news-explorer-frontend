import "./ErrorMessage.css";

function ErrorMessage() {
  return (
    <section className="error-message" role="alert">
      <h2 className="error-message__title">Something went wrong</h2>

      <p className="error-message__text">
        Sorry, something went wrong during the request. There may be a
        connection issue or the server may be down. Please try again later.
      </p>
    </section>
  );
}

export default ErrorMessage;
