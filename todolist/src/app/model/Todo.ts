import {Priority} from "./priority";

export interface Todo {

  id: number | null;
  title: string;
  description: string;
  priority: Priority;
  creationTime: number | null;
  updateTime: number | null;
  scheduled: boolean;
  startTime: number | null;
  endTime: number | null;
  done: boolean | null;
}

export type TodoForm = Omit<Todo, 'creationTime' | 'updateTime' | 'done'>
