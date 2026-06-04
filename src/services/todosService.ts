import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { AppError } from "./appError.js";
import { CODE_STATUS, ERROR_MESSAGES } from "@/consts.js";
import { Todo } from "@/types/todos.js";

const todosPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../db/todos.json"
);

export const getTodosService = async () => {
  const todos = await fs.readFile(todosPath, "utf-8");
  const todosArray = JSON.parse(todos);
  if (!todos || !Array.isArray(todosArray)) {
    throw new AppError(
      CODE_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.SOMETHING_WENT_WRONG
    );
  }
  return todosArray;
};

export const getTodoByIdService = async (id: number) => {
  const todos = await getTodosService();

  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    throw new AppError(CODE_STATUS.NOT_FOUND, ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return { todo, todos };
};

export const createTodoService = async (
  todo: Pick<Todo, "title" | "description" | "completed">
) => {
  const todos = await getTodosService();
  const newTodo: Todo = {
    id: todos.length + 1,
    ...todo,
    createdAt: Date.now(),
    updatedAt: null,
    status: "in_progress",
  };
  todos.push(newTodo);
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2), "utf-8");
  return todos;
};

export const updateTodoService = async (
  id: number,
  todo: Pick<Todo, "title" | "description" | "completed">
) => {
  const { todo: currentTodo, todos } = await getTodoByIdService(id);

  const newTodo = {
    ...currentTodo,
    ...todo,
    updatedAt: Date.now(),
    status: todo.completed ? "completed" : currentTodo.status,
  };

  await fs.writeFile(
    todosPath,
    JSON.stringify(
      todos.map((item) => (item.id === id ? newTodo : item)),
      null,
      2
    ),
    "utf-8"
  );

  return newTodo;
};

export const deleteTodoService = async (id: number) => {
  const { todos } = await getTodoByIdService(id);
  const newTodos = todos.filter((item) => item.id !== id);
  await fs.writeFile(todosPath, JSON.stringify(newTodos, null, 2), "utf-8");
  return newTodos;
};
