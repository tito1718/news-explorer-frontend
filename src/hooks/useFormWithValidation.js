import { useState } from "react";

function getValidationMessage(input) {
  const { validity, value, minLength } = input;

  if (validity.valueMissing) {
    return "This field is required";
  }

  if (validity.typeMismatch) {
    return "Invalid email address";
  }

  if (validity.tooShort) {
    return `Please enter at least ${minLength} characters`;
  }

  if (!validity.valid && value) {
    return input.validationMessage;
  }

  return "";
}

function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const { name, value, form } = input;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: getValidationMessage(input),
    }));

    setIsValid(form.checkValidity());
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}

export default useFormWithValidation;
