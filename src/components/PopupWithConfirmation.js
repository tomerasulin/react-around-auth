import PopupWithForm from "./PopupWithForm";

const PopupWithConfirmation = ({ isOpen, onClose, onCardDelete, card }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name="delete"
      title="Are you sure?"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Yes"
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
};

export default PopupWithConfirmation;
