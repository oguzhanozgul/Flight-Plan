/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BaseAirport } from "../../types/types";
import { IconAirplane } from "../../assets/icons/IconAirplane";
import { IconPinDrop } from "../../assets/icons/IconPinDrop";

import "./SearchBar.css";

interface Props {
  option: BaseAirport;
  setSelection: (id: number) => void;
}

export function SearchDropDownOption({ option, setSelection }: Props) {
  const handleClick = () => {
    if (option.id !== -1) {
      setSelection(option.id);
    }
  };

  return (

    <div className={`dropDownOption ${option.id === -1 ? "firstDefaultOption" : ""}`} onClick={handleClick}>
      <div className="dropDownIcon">
        {option.id === -1 ? <IconAirplane /> : <IconPinDrop />}
      </div>
      {option.name}
    </div>

  );
}

export default SearchDropDownOption;
