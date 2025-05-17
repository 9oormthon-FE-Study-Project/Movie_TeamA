import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'


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