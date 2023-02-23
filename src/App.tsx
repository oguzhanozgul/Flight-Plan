import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { Home } from './pages/home/Home'
import { Search } from './pages/search/Search'
import { useAirportData } from './utils/useAirportData';
import { useConnectionsData } from './utils/useConnectionsData';

function App() {
  const [count, setCount] = useState(0)

  useAirportData();
  useConnectionsData();

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App
