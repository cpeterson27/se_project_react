import "./NavModal.css";
import closeIcon from "../../assets/close.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function NavModal({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <div className="nav__modal">
          <div className="header__user-container-mobile">
            <p className="header__username-mobile">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        
            <div className="toggle-switch__mobile">
                      <ToggleSwitch />
            </div>
        </div>
      </div>
    </div>
  );
}

export default NavModal;
