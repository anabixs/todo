import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

// body to send to api in post/patch requests
// JSON.stringify({
//   data: {
//     type: "todo",
//     attributes: { name: "", status: "" },
//   },
// })

// fetch('/api/todos')
// let first = await fetch("/api/todos");
// let second = await fetch("/api/todos");
// console.log(first);
// console.log(second);
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
