import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Book from './Book.jsx';
import Customer from './Customer.jsx';
import Home from './Home.jsx';
import AuthProvider from './components/context/AuthContext.jsx';
import Login from './components/login/Login.jsx';
import ProtectedRoute from './components/shared/ProtectedRoute.jsx';
import Signup from './components/signup/Signup';
import './index.css';

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: 'dashboard/customers',
    element: (
      <ProtectedRoute>
        <Customer />
      </ProtectedRoute>
    ),
  },
  {
    path: 'dashboard/books',
    element: (
      <ProtectedRoute>
        <Book />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
