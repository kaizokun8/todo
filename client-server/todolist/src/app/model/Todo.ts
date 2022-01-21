import {Priority} from "./priority";

export interface Todo {

  id: number | null;
  title: string;
  description: string;
  priority: Priority;
  creationTime: number | null;
  updateTime: number | null;
  scheduled: Boolean;
  startTime: number | null;
  endTime: number | null;
  done: Boolean;
}

export type TodoForm = Omit<Todo, 'creationTime' | 'updateTime' | 'done'>
