import { useAppSelector } from "../../store/hooks";
import * as React from "react";
import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchButton() {
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const fromId = useAppSelector((state) => state.selectedAirports.from.id);
  const toId = useAppSelector((state) => state.selectedAirports.to.id);
  const navigate = useNavigate();

  useEffect(() => {
    setEnabled(fromId !== 0 && toId !== 0);
  }, [fromId, toId]);

  const handleSearchClick = () => {
    if (enabled) {
      const params = { from: fromId.toString(), to: toId.toString() };
      navigate({ pathname: "/search", search: `?${createSearchParams(params)}` });
    }
  };

  return (
    <Button color="#E46846" onClick={handleSearchClick} disabled={!enabled}>
      <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
    </Button>
  );
}

export default SearchButton;
