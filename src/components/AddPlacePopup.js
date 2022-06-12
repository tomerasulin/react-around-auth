import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, buttonText }) => {
  const { isValid, values, errors, handleChange, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.title,
      link: values["image-link"],
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="title-input"
        type="text"
        name="title"
        placeholder="Title"
        className="popup-box__input popup-box__input_type_title"
        required
        minLength="1"
        maxLength="30"
        value={values.title || ""}
        onChange={handleChange}
      />
      <span
        className={`title-input-error popup-box__error ${
          errors.title !== "" ? "popup-box__error_visible" : ""
        }`}
      >
        {errors.title}
      </span>
      <input
        id="url-input"
        type="url"
        name="image-link"
        placeholder="Image link"
        className="popup-box__input popup-box__input_type_image-link"
        required
        value={values["image-link"] || ""}
        onChange={handleChange}
      />
      <span
        className={`title-input-error popup-box__error ${
          errors["image-link"] !== "" ? "popup-box__error_visible" : ""
        }`}
      >
        {errors["image-link"]}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
