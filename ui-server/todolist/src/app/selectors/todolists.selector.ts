import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TodoStoreState} from "../store/todo/todo.reducer";
import {Todo} from "../model/Todo";

export const selectTodos = createFeatureSelector<TodoStoreState>('todos');

export const selectTodosScheduled = createSelector(selectTodos, (state: TodoStoreState) => state.scheduled);

export const selectTodosUnscheduled = createSelector(selectTodos, (state: TodoStoreState) => state.unscheduled);

//exemple de selector retournant des données de manière dynamique, si la liste d'origine change le selector en fera de même
export const selectDoneTodosScheduled = createSelector(
  selectTodosScheduled,
  (scheduledTodos: ReadonlyArray<Todo>) => scheduledTodos.filter(s => s.done === true))

export const selectUnDoneTodosScheduled = createSelector(
  selectTodosScheduled,
  (scheduledTodos: ReadonlyArray<Todo>) => scheduledTodos.filter(s => s.done !== true))
