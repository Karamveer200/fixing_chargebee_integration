import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Billing from './Billing/Billing';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Billing />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
