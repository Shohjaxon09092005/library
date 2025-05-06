import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ErrorPage from './Components/ErrorPage';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import LoginLayout from './LoginLayout';
import Products from './Pages/Products';
import Orders from './Pages/Orders';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />, // bu layoutda Header/Footer yo‘q
    children: [
      {
        index: true, // ya’ni `/` – asosiy yo‘l
        element: <Login />
      }
    ]
  },
  {
    path: "/",
    element: <App />, // bu layoutda Header/Footer bor
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Dashboard />
      },
     
      {
        path: "/products",
        element: <Products/>
      },
      {
        path: "/orders",
        element: <Orders/>
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
