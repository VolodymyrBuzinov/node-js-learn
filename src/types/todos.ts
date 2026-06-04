export type TodoStatus = "in_progress" | "completed";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  status: TodoStatus;
};
