import {createAction, props} from "@ngrx/store";
import {ToDoSearchResult} from "../../dto/ToDoSearchResult";
import {Todo} from "../../model/Todo";
import {AllToDoSearchResult} from "../../dto/AllToDoSearchResult";

export const setScheduledOrUnscheduledTodos = createAction(
  '[Todo List] Set scheduled or unscheduled Todos',
  props<{ todoSearchResult: ToDoSearchResult }>());

export const setScheduledAndUnscheduledTodos = createAction(
  '[Todo List] Set scheduled and unscheduled Todos',
  props<{ allTodoSearchResult: AllToDoSearchResult }>());

export const removeTodo = createAction(
  '[Todo List] Remove Todo',
  props<{ todo: Todo }>())

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>())

export const updateTodo = createAction(
  '[Todo List] Update Todo',
  props<{ todo: Todo }>())
