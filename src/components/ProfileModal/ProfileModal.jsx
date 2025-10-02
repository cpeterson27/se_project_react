import "./ProfileModal.css";
import closeIcon from "../../assets/close.svg";

const ProfileModal = ({
  children,
  buttonText = "Save",
  title,
  name,
  isOpen,
  onClose,
  handleonSave,
  successfulMessage,
  errorMessage
}) => {

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <form
          onSubmit={handleonSave}
          className="modal__form"
          name={name}
          noValidate
        >
          {children}
          <button className="modal__save" type="submit">
            {buttonText}
          </button>
        </form>
        {successfulMessage && <p className="success__message">{successfulMessage}</p>}
         {errorMessage && <p className="error__message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProfileModal;
