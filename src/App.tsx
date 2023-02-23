import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';

import './App.css'
import { Home } from './pages/home/Home'
import { Search } from './pages/search/Search'
import { store } from './store/store';

function App() {
  const [count, setCount] = useState(0)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </QueryClientProvider>
      </ReduxProvider>
    </BrowserRouter>
  )
}

export default App
