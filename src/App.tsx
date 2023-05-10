import { useConnectionsData } from "./utils/useConnectionsData";
import { useAirportData } from "./utils/useAirportData";
import { theme } from "./theme/theme";
import { Home } from "./pages/home/Home";
import { Homy } from "./pages/home/Homy";
import { Search } from "./pages/search/Search";
import { Container, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

function App() {
  useAirportData();
  useConnectionsData();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        ...theme,
        colorScheme: "dark",
      }}
    >
      <Container size="xl">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/homy" element={<Homy />} />
          <Route path="/homy/:id" element={<Homy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Container>
    </MantineProvider>

  );
}

export default App;
