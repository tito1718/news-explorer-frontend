import { useEffect } from "react";
import "./Modal.css";

function Modal({ name, titleId, containerClassName = "", onClose, children }) {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className={`modal__container ${containerClassName}`.trim()}>
        <button
          className="modal__close-button"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />

        {children}
      </div>
    </div>
  );
}

export default Modal;
