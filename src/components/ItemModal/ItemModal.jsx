import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import close from "../../assets/close.png";

function ItemModal({ isOpen, onClose, card, openDeleteConfirmation }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn =
    card.owner === currentUser._id || card.owner?._id === currentUser._id;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content item-modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={close} alt="Close icon" />
        </button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div className="item-modal__info">
            <h2 className="item-modal__caption">{card.name}</h2>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              className="item-modal__delete-button"
              onClick={() => openDeleteConfirmation(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
