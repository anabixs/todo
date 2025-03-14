import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "./assets/todo.css";
import { fetchTodos, addTodo, deleteTodo, updateTodoStatus } from "./actions";

interface TodoItem {
  id: string;
  name: string;
  status: string;
}

interface TodoProps {}

const Todo: React.FC<TodoProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNote, setNewNote] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<string>("no-sort");
  const [todo, setTodos] = useState<TodoItem[]>([]);
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
        if (addData) {
          setTodos((prevTodos) => [...prevTodos, addData]);
        }
        setIsLoaded(true);
      });
      setNewNote("");
      onClose();
    }
  }

  function deleteNote(id: string) {
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

  function handleStatusChange(newStatus: string, id: string) {
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

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.keyCode === 13) {
      addNewNote();
    } else if (event.key === "Escape" || event.keyCode === 27) {
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
              <option value="non-completed">Non completed</option>
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
};

export default Todo;
