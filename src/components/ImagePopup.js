const ImagePopup = ({isOpen, card, onClose}) => {
  return (
    <div
      className={`popup-box popup-box_type_open ${
        isOpen ? "popup-box_opened" : ""
      } `}
    >
      <div className="popup-box__container popup-box__container_enlarge">
        <img
          className="popup-box__image"
          src={card.link}
          alt={card.name}
        />
        <p className="popup-box__text">{card.name}</p>
      </div>
      <button
        type="button"
        className="popup-box__close-btn popup-box__close-btn_enlarge"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default ImagePopup;
