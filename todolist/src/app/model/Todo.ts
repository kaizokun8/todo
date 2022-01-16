import {Priority} from "./priority";

export interface Todo {

  id: number | null;
  title: string;
  description: string;
  priority: Priority;
  creationTime: number;
  updateTime: number;
  scheduled: boolean;
  startTime: number | null;
  endTime: number | null;
  done: boolean;
}

export type TodoForm = Omit<Todo, 'creationTime' | 'updateTime' | 'done'>
