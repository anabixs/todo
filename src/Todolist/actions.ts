import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  name: string;
  status: string;
}

interface ApiResponse {
  todos?: Todo[];
  todo?: Todo;
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch("/api/todos");
    const data: ApiResponse = await response.json();
    return data.todos || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addTodo(newNote: string): Promise<Todo | undefined> {
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
    const data: ApiResponse = await response.json();
    return data.todo;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateTodoStatus(
  id: string,
  newStatus: string
): Promise<boolean> {
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
    return false;
  }
}
