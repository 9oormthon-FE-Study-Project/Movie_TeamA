import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Login from './Pages/Login/Login.tsx'
import Signup from './Pages/Signup/Signup.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path :"login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);