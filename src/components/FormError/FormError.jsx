import "./FormError.css";

function FormError({ message, id }) {
  return (
    <span className="form-error" id={id} aria-live="polite">
      {message}
    </span>
  );
}

export default FormError;
