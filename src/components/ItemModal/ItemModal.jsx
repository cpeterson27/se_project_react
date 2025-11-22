import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import closeIcon from '../../assets/close.svg';
import './ItemModal.css';

function ItemModal({ isOpen, card, onClose, handleDeleteRequest }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser?._id;

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="item-modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <div className="modal__image-container">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="modal__image"
          />
        </div>

        <div className="modal__footer">
          <div className="modal__header">
            <h2 className="modal__caption">{card.name}</h2>
            {isLoggedIn && isOwner && (
              <button
                className="modal__delete-btn"
                onClick={() => handleDeleteRequest(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;






