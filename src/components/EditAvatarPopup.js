import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidation from "./FormValidation";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose, buttonText }) => {
  const { isValid, values, errors, handleChange, resetForm } = FormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values["image-link"],
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="url-input-avatar"
        type="url"
        name="image-link"
        placeholder="Image link"
        className="popup-box__input popup-box__input_type_image-link"
        value={values["image-link"] || ""}
        required
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

export default EditAvatarPopup;
