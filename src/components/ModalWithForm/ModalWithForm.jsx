import Modal from "../Modal/Modal.jsx";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isValid,
  onClose,
  onSubmit,
  alternativeText,
  alternativeButtonText,
  onAlternativeClick,
  children,
}) {
  const titleId = `${name}-modal-title`;

  return (
    <Modal name={name} titleId={titleId} onClose={onClose}>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        <h2 className="modal__title" id={titleId}>
          {title}
        </h2>

        {children}

        <button
          className="modal__submit-button"
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>

        <p className="modal__alternative">
          {alternativeText}{" "}
          <button
            className="modal__alternative-button"
            type="button"
            onClick={onAlternativeClick}
          >
            {alternativeButtonText}
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
