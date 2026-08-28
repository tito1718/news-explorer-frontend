import Modal from "../Modal/Modal.jsx";
import FormError from "../FormError/FormError.jsx";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  loadingButtonText,
  isValid,
  isSubmitting = false,
  serverError = "",
  onClose,
  onSubmit,
  alternativeText,
  alternativeButtonText,
  onAlternativeClick,
  children,
}) {
  const titleId = `${name}-modal-title`;
  const serverErrorId = `${name}-server-error`;

  return (
    <Modal name={name} titleId={titleId} onClose={onClose}>
      <form
        className="modal__form"
        name={name}
        onSubmit={onSubmit}
        aria-describedby={serverError ? serverErrorId : undefined}
      >
        <h2 className="modal__title" id={titleId}>
          {title}
        </h2>

        {children}

        <FormError id={serverErrorId} message={serverError} />

        <button
          className="modal__submit-button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? loadingButtonText : buttonText}
        </button>

        <p className="modal__alternative">
          {alternativeText}{" "}
          <button
            className="modal__alternative-button"
            type="button"
            onClick={onAlternativeClick}
            disabled={isSubmitting}
          >
            {alternativeButtonText}
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
