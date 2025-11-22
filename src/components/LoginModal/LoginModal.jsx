import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';
import { useState, useEffect } from 'react';

const defaultValues = {
  email: '',
  password: '',
};

const LoginModal = ({ isOpen, onLogin, onClose, buttonText, openRegisterModal }) => {
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
      setErrorMessage('');
    }
  }, [isOpen, setValues]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setErrorMessage(''); 

    try {
      await onLogin(values); 
      setValues(defaultValues);
      onClose(); 
    } catch (error) {
      if (error.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else {
        setErrorMessage(error.message || 'Login failed. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

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
        Email
        <input
          type="email"
          className={`modal__input ${errorMessage ? 'modal__input_error' : ''}`}
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
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

      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;

