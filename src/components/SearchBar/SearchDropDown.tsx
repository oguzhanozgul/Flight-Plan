import { SearchDropDownOption } from "./SearchDropDownOption";
import { BaseAirport } from "../../types/types";
import "./SearchBar.css";

interface Props {
  options: BaseAirport[];
  setSelection: (id: number) => void;
  visible: boolean;
}

export function SearchDropDown({ options, setSelection, visible }: Props) {
  return (
    <div className={`dropDown ${!visible ? "invisible" : ""}`}>
      {options.map((option) => <SearchDropDownOption key={option.id} option={option} setSelection={setSelection} />)}
    </div>
  );
}

export default SearchDropDown;
