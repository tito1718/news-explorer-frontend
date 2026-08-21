import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import FormError from "../FormError/FormError.jsx";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import "./RegisterModal.css";

const initialValues = {
  email: "",
  password: "",
  username: "",
};

function RegisterModal({ onClose, onSubmit, onSwitchModal }) {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation(initialValues);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
      isValid={isValid}
      alternativeText="or"
      alternativeButtonText="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      onAlternativeClick={onSwitchModal}
    >
      <label className="register-modal__label" htmlFor="register-email">
        Email
      </label>

      <input
        className="register-modal__input"
        id="register-email"
        type="email"
        name="email"
        value={values.email}
        placeholder="Enter email"
        autoComplete="email"
        required
        aria-describedby="register-email-error"
        onChange={handleChange}
      />

      <FormError id="register-email-error" message={errors.email} />

      <label className="register-modal__label" htmlFor="register-password">
        Password
      </label>

      <input
        className="register-modal__input"
        id="register-password"
        type="password"
        name="password"
        value={values.password}
        placeholder="Enter password"
        autoComplete="new-password"
        required
        minLength="8"
        aria-describedby="register-password-error"
        onChange={handleChange}
      />

      <FormError id="register-password-error" message={errors.password} />

      <label className="register-modal__label" htmlFor="register-username">
        Username
      </label>

      <input
        className="register-modal__input"
        id="register-username"
        type="text"
        name="username"
        value={values.username}
        placeholder="Enter your username"
        autoComplete="username"
        required
        minLength="2"
        aria-describedby="register-username-error"
        onChange={handleChange}
      />

      <FormError id="register-username-error" message={errors.username} />
    </ModalWithForm>
  );
}

export default RegisterModal;
