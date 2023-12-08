import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <div className="container">
      <ul className="nav nav-pills">
        <li>
          <Link
            to="/game"
            className={`nav-link ${
              activeComponent === "game" ? "nav-link-active" : ""
            }`}
            onClick={() => setActiveComponent("game")}
          >
            Tictactoe
          </Link>
        </li>
        <li>
          <Link
            to="/todo"
            className={`nav-link ${
              activeComponent === "todo" ? "nav-link-active" : ""
            }`}
            onClick={() => setActiveComponent("todo")}
          >
            Todolist
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
