import {createFeatureSelector} from '@ngrx/store';
import {TodoStoreState} from "../store/todo/todo.reducer";

export const selectTodos = createFeatureSelector<TodoStoreState>('todos');

