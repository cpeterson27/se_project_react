import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { useContext } from "react";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_F`}
      >
        F
      </span>
      <span
        style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
        className="toggle-switch__text toggle-switch__text_C"
      >
        C
      </span>
    </label>
  );
}
