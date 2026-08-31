import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import FormError from "../FormError/FormError.jsx";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import "./LoginModal.css";

const initialValues = {
  email: "",
  password: "",
};

function LoginModal({
  onClose,
  onSubmit,
  onSwitchModal,
  onClearError,
  isSubmitting,
  serverError,
}) {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation(initialValues);

  function handleInputChange(event) {
    handleChange(event);
    onClearError();
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <ModalWithForm
      name="login"
      title="Sign in"
      buttonText="Sign in"
      loadingButtonText="Signing in..."
      isValid={isValid}
      isSubmitting={isSubmitting}
      serverError={serverError}
      alternativeText="or"
      alternativeButtonText="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      onAlternativeClick={onSwitchModal}
    >
      <label className="login-modal__label" htmlFor="login-email">
        Email
      </label>

      <input
        className="login-modal__input"
        id="login-email"
        type="email"
        name="email"
        value={values.email}
        placeholder="Enter email"
        autoComplete="email"
        required
        aria-describedby="login-email-error"
        onChange={handleInputChange}
      />

      <FormError id="login-email-error" message={errors.email} />

      <label className="login-modal__label" htmlFor="login-password">
        Password
      </label>

      <input
        className="login-modal__input"
        id="login-password"
        type="password"
        name="password"
        value={values.password}
        placeholder="Enter password"
        autoComplete="current-password"
        required
        minLength="8"
        aria-describedby="login-password-error"
        onChange={handleInputChange}
      />

      <FormError id="login-password-error" message={errors.password} />
    </ModalWithForm>
  );
}

export default LoginModal;
