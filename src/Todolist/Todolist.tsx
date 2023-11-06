import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Modal from "./Modal.tsx";
import "./assets/todo.css";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodoStatus,
} from "./actions.ts";

export default function Todo() {
  const [isOpen, setIsOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("no-sort");
  const [todo, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchTodos().then((todoList) => {
      setTodos(todoList);
      setIsLoaded(true);
    });
  }, []);

  function addNewNote() {
    setIsLoaded(false);
    if (newNote !== "") {
      addTodo(newNote).then((addData) => {
        setTodos((prevtodos) => [...prevtodos, addData]);
        setIsLoaded(true);
      });
      setNewNote("");
      onClose();
    }
  }

  function deleteNote(id) {
    setIsLoaded(false);
    deleteTodo(id).then((isDeleted) => {
      if (isDeleted) {
        setTodos((prevTodos) => prevTodos.filter((note) => note.id !== id));
        setIsLoaded(true);
      }
    });
  }

  function clearAll() {
    setTodos([]);
  }

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  function handleStatusChange(newStatus, id) {
    updateTodoStatus(id, newStatus).then((isUpdated) => {
      if (isUpdated) {
        setTodos((prevTodos) =>
          prevTodos.map((note) =>
            note.id === id ? { ...note, status: newStatus } : note
          )
        );
      }
    });
  }
  function handleKeyPress(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      addNewNote();
    } else if (event.key === "Esc" || event.keyCode === 27) {
      onClose();
    }
  }
  return (
    <>
      {!isLoaded && (
        <div className="spinner-bg">
          <CircularProgress className="spinner" />
        </div>
      )}

      <div className="cont">
        <h1>Todo list</h1>
        <button className="button" onClick={onOpen}>
          Add Node
        </button>
      </div>
      {todo.length > 0 ? (
        <button className="button button-clear" onClick={() => clearAll()}>
          Clear
        </button>
      ) : (
        ""
      )}
      <div className="container-sort-filter">
        <div className="filter">
          <label>Filter</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="non-completed">Non-completed</option>
          </select>
        </div>
        <div className="sort">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="no-sort">No sort</option>
            <option value="length">Length</option>
            <option value="alphabet">Alphabet</option>
          </select>
        </div>
      </div>
      <ol>
        {todo.map((note) => (
          <li key={note.id} className="list">
            <Link to={`/todo/${note.id}`}>{note.name}</Link>{" "}
            <select
              name="status"
              id="status"
              value={note.status}
              onChange={(e) => handleStatusChange(e.target.value, note.id)}
            >
              <option value="non-completed">Non comleted</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => deleteNote(note.id)}>X</button>
          </li>
        ))}
      </ol>

      <Modal isOpen={isOpen} onClose={onClose}>
        <h3 className="header">Enter Note</h3>
        <input
          type="text"
          placeholder="Enter new note"
          value={newNote}
          className="text-field__input"
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="buttons">
          <button className="close-button button" onClick={onClose}>
            Close
          </button>
          <button className="add-button button" onClick={addNewNote}>
            Add
          </button>
        </div>
      </Modal>
    </>
  );
}
