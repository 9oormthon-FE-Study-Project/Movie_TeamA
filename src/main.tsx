import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home/Home.tsx'
import Login from './Pages/Login/Login.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index : true,
        element: <Home />,
      },
      {
        path :"login",
        element: <Login />,
      },
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);