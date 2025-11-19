import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";
import { useState, useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage("");
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values)
      .then(() => {
        setSuccessMessage("Item submitted successfully!");
        setValues(defaultValues);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      });
  }

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      successMessage={successMessage}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="1"
          maxLength="30"
        />
      </label>

      <label htmlFor="link" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="link"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            className="modal__radio-input"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
