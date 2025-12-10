import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes";

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;