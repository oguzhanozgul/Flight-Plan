import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'


import App from './App'
import './index.css'
import { store } from './store/store';
import MantineThemeProvider from './styles/MantineThemeProvider';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineThemeProvider>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>

            <App />

          </QueryClientProvider>
        </ReduxProvider>
      </BrowserRouter>
    </MantineThemeProvider>
  </React.StrictMode>,
)
