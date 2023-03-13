import { useConnectionsData } from "./utils/useConnectionsData";
import { useAirportData } from "./utils/useAirportData";
import theme from "./theme/theme";
import { Home } from "./pages/home/Home";
import { Search } from "./pages/search/Search";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  useAirportData();
  useConnectionsData();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        ...theme,
        colorScheme,
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </MantineProvider>

  );
}

export default App;
