import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./Tictactoe/Game.jsx";
import Todolist from "./Todolist/Todolist.jsx";
import Home from "./Home.jsx";
import Note from "./Todolist/Note.jsx";
import "./index.css";
import { makeServer } from "./server.js";

makeServer();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/todo",
        element: <Todolist />,
      },
      {
        path: "/todo/:id",
        element: <Note />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
