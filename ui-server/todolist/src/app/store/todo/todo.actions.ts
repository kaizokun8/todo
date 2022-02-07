import {createAction, props} from "@ngrx/store";
import {ToDoSearchResult} from "../../dto/ToDoSearchResult";
import {Todo} from "../../model/Todo";
import {AllToDoSearchResult} from "../../dto/AllToDoSearchResult";
import {ParamMap} from "@angular/router";

export const loadScheduledOrUnscheduledTodos = createAction(
  '[Todo ToDoSearchResult] Load scheduled or unscheduled Todos',
  props<{ paramMap: ParamMap }>());

export const loadScheduledOrUnscheduledTodosSuccess = createAction(
  '[Todo ToDoSearchResult] Load scheduled or unscheduled Todos Success',
  props<{ todoSearchResult: ToDoSearchResult }>());

export const loadScheduledOrUnscheduledTodosFailure = createAction(
  '[Todo ToDoSearchResult] Set scheduled or unscheduled Todos Failure',
  props<{ error: any }>());

export const loadScheduledAndUnscheduledTodos = createAction(
  '[Todo AllToDoSearchResult] Load scheduled and unscheduled Todos');

export const loadScheduledAndUnscheduledTodosSuccess = createAction(
  '[Todo AllToDoSearchResult] Load scheduled and unscheduled Todos Success',
  props<{ allTodoSearchResult: AllToDoSearchResult }>());

export const loadScheduledAndUnscheduledTodosFailure = createAction(
  '[Todo AllToDoSearchResult] Load scheduled and unscheduled Todos Failure',
  props<{ error: any }>());

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ todo: Todo }>())

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>())

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>())
