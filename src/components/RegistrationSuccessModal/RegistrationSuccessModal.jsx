import Modal from "../Modal/Modal.jsx";
import "./RegistrationSuccessModal.css";

function RegistrationSuccessModal({ onClose, onSignInClick }) {
  return (
    <Modal
      name="success"
      titleId="registration-success-title"
      containerClassName="modal__container_type_success"
      onClose={onClose}
    >
      <h2
        className="registration-success__title"
        id="registration-success-title"
      >
        Registration successfully completed!
      </h2>

      <button
        className="registration-success__signin-button"
        type="button"
        onClick={onSignInClick}
      >
        Sign in
      </button>
    </Modal>
  );
}

export default RegistrationSuccessModal;
