import "./ErrorMessage.css";

function ErrorMessage({
  title = "Something went wrong",
  message = "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.",
}) {
  return (
    <section className="error-message" role="alert">
      <h2 className="error-message__title">{title}</h2>

      <p className="error-message__text">{message}</p>
    </section>
  );
}

export default ErrorMessage;
