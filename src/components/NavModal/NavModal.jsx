import "./NavModal.css";
import closeIcon from "../../assets/close.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function NavModal({ isOpen, onClose, name, handleAddClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <div className="nav__modal">
          <div className="header__user-container-mobile">
            <p className="header__username-mobile">{name}</p>
            <Link
              to="/profile"
              className="header__link-mobile"
              onClick={onClose}
            >
              <img src={avatar} alt={name} className="header__avatar" />
            </Link>
          </div>
          <div>
            <button
              onClick={() => {
                onClose();
                handleAddClick();
              }}
              type="button"
              className="nav__add-clothes-btn"
            >
              + Add Clothes
            </button>
          </div>
  <ToggleSwitch />

        </div>
      </div>
    </div>
  );
}

export default NavModal;
