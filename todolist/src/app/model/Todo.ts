import {Priority} from "./priority";

export interface Todo {

  id: number | null;
  title: string;
  description: string;
  priority: Priority;
  creationTime: number;
  updateTime: number;
  scheduled: boolean;
  startTime: number;
  endTime: number;
  done: boolean;
}
