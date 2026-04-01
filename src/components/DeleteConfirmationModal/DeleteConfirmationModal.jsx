import "../ItemModal/ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

import close from "../../assets/close.png";

function DeleteConfirmationModal({ isOpen, onClose, deleteHandler }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content item-modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={close} alt="Close icon" />
        </button>

        <div className="item-modal__footer">
          <button
            type="button"
            className="item-modal__delete-button"
            onClick={deleteHandler}
          >
            Delete
          </button>

          <button type="button" className="" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
