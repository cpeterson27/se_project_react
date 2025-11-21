import "./ProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ProfileModal = ({
  children,
  buttonText = "Save",
  title,
  name,
  isOpen,
  onClose,
  handleOnSave,
  successfulMessage,
  errorMessage,
}) => {
  return (
    <ModalWithForm
      title={title}
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleOnSave}
      buttonText={buttonText}
      successMessage={successfulMessage}
    >
      {children}
      {errorMessage && <p className="error__message">{errorMessage}</p>}
    </ModalWithForm>
  );
};

export default ProfileModal;
