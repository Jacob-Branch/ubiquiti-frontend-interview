import React from 'react'
import ReactDOM from 'react-dom/client'

import "./styles/main.scss"

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Product} from "./pages/Product.tsx";

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/product/:id", element: <Product />}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
