import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current card
  const isOwn = card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `element__delete-btn ${
    isOwn ? "element__delete-btn_visible" : "element__delete-btn_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? "element__like-btn_active" : "element__like-btn"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Delete"
        onClick={handleDeleteClick}
      ></button>
      <div
        className="element__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes-box">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like"
            onClick={handleLikeClick}
          ></button>
          <p className="element__show-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
