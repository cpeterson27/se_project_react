import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { useState, useEffect } from 'react';
import './LoginModal.css';

const defaultValues = {
  email: '',
  password: '',
};

const LoginModal = ({
  isOpen,
  onLogin,
  onClose,
  buttonText,
  openRegisterModal,
}) => {
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await onLogin(values);
      onClose();
      setValues(defaultValues);
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Failed to login:', error);
    }
  }

  return (
    <ModalWithForm
      title="Login"
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
            openRegisterModal(true);
            onClose();
          }}
        >
          or Register
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email{' '}
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

      <label
        htmlFor="password"
        className={`modal__label ${errorMessage ? 'modal__label_error' : ''}`}
      >
        {errorMessage ? 'Incorrect Password' : ' Password'}{' '}
        <input
          type="password"
          className={`modal__input ${errorMessage ? 'modal__input_error' : ''}`}
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
