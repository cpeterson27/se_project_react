import './ModalWithForm.css';
import closeIcon from '../../assets/close.svg';

const ModalWithForm = ({
  children,
  buttonText = 'Add Garment',
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  successMessage,  
  redirectButton,
}) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}

          <div className="modal__buttons">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {redirectButton}
          </div>
        </form>

        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ModalWithForm;

