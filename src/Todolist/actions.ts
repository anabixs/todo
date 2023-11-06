import { v4 as uuidv4 } from "uuid";

export async function fetchTodos() {
  try {
    const response = await fetch("/api/todos");
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error(error);
  }
}
export async function addTodo(newNote) {
  try {
    const newId = uuidv4();
    const newStatus = "non-completed";
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "todo",
          attributes: { id: newId, name: newNote, status: newStatus },
        },
      }),
    });
    const data = await response.json();
    return data.todo;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteTodo(id) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoStatus(id, newStatus) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "todo",
          attributes: { status: newStatus },
        },
      }),
    });
    return response.status === 200;
  } catch (error) {
    console.error(error);
  }
}
