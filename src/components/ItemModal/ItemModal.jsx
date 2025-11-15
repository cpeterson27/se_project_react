import './ItemModal.css';
import closeIcon from '../../assets/close.svg';

function ItemModal({ isOpen, card, onClose, handleDeleteRequest }) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__preview">
          <div className="modal__wrap">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={() => handleDeleteRequest(card)}
              className="modal__delete"
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
