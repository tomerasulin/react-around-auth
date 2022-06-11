const PopupWithForm = ({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  buttonText,
  children,
  isValid,
}) => {
  return (
    <div
      className={`popup-box popup-box_type_${name} ${
        isOpen ? "popup-box_opened" : ""
      }`}
    >
      <div className="popup-box__container">
        <button
          type="button"
          className="popup-box__close-btn"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form
          className={`popup-box__form popup-box__form_${name}`}
          onSubmit={onSubmit}
        >
          <h3 className="popup-box__title">{title}</h3>
          {children}
          <button
            type="submit"
            className={`popup-box__save-btn ${
              isValid ? "" : "popup-box__save-btn_disabled"
            }`}
            aria-label="Save"
            name="save"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
