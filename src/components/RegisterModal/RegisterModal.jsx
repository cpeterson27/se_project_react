import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import './RegisterModal.css';

function RegisterModal({
  isOpen,
  onSubmit,
  openLoginModal,
  onClose,
  buttonText,
}) {
  const defaultValues = {
    name: '',
    email: '',
    avatar: '',
    password: '',
  };

  const { values, handleChange, setValues } = useForm(defaultValues);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await onSubmit(values);
      onClose();
      setValues(defaultValues);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Failed to register:', error);
    }
  };

  if (!isOpen) return <></>;

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      error={errorMessage}
      buttonText={buttonText}
      redirectButton={
        <button
          type="button"
          className="modal__redirect"
          onClick={() => {
            openLoginModal(true);
            onClose();
          }}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email*{' '}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*{' '}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
      </label>

      <label htmlFor="text" className="modal__label">
        Name*{' '}
        <input
          type="text"
          className="modal__input"
          id="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="url" className="modal__label">
        Avatar URL*{' '}
        <input
          type="url"
          className="modal__input"
          id="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
