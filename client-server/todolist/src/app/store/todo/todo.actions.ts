import {createAction, props} from "@ngrx/store";
import {ToDoSearchResult} from "../../dto/ToDoSearchResult";
import {Todo} from "../../model/Todo";
import {AllToDoSearchResult} from "../../dto/AllToDoSearchResult";

export const setScheduledOrUnscheduledTodos = createAction(
  '[Todo ToDoSearchResult] Set scheduled or unscheduled Todos',
  props<{ todoSearchResult: ToDoSearchResult }>());

export const setScheduledAndUnscheduledTodos = createAction(
  '[Todo AllToDoSearchResult] Set scheduled and unscheduled Todos',
  props<{ allTodoSearchResult: AllToDoSearchResult }>());

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ todo: Todo }>())

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>())

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>())
