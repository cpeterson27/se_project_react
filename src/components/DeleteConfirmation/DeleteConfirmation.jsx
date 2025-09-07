import "./DeleteConfirmation.css";
import closeIcon from "../../assets/close.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <div className="modal__body">
          <h2 className="modal__title">Confirm Deletion</h2>
          <p className="modal__text">
            Are you sure you want to delete this item <strong>{itemName}</strong>? This action is irreversible.
          </p>
        </div>

        <div className="modal__actions">
          <button onClick={onClose} className="modal__button modal__button_cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal__button modal__button_delete">
            Yes, delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
