import "../ItemModal/ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import "./DeleteConfirmation.css";
import close from "../../assets/close.png";

// ../

function DeleteConfirmationModal({ isOpen, onClose, deleteHandler }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_delete">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={close} alt="Close icon" />
        </button>
        <div className="modal__delete-message">
          Are you sure you want to delete this item? <p className="modal__delete-warning">This action is irreversible.</p>
        </div>
        <div className="modal__delete-footer">
          <button
            type="button"
            className="item-modal__delete-button item-modal__delete-button_confirmation"
            onClick={deleteHandler}
          >
               Yes, Delete Item
          </button>
</div>
<div>
          <button
            type="button"
            className="item-modal__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
