import {createReducer, on} from "@ngrx/store";
import {Todo} from "../../model/Todo";
import {
  removeTodo,
  setScheduledAndUnscheduledTodos,
  setScheduledOrUnscheduledTodos
} from "./todo.actions";

export interface TodoStoreState {
  scheduled: ReadonlyArray<Todo>,
  unscheduled: ReadonlyArray<Todo>,
  totalScheduled: number,
  totalUnscheduled: number,
}

export const initialState: TodoStoreState = {
  scheduled: [],
  unscheduled: [],
  totalScheduled: 0,
  totalUnscheduled: 0
};

export const todoReducer = createReducer(
  initialState,
  on(setScheduledOrUnscheduledTodos, (state, {todoSearchResult}) => {
    if (todoSearchResult.scheduled) {
      return {
        totalScheduled: todoSearchResult.total,
        scheduled: todoSearchResult.todos,
        totalUnscheduled: 0,
        unscheduled: []
      };
    } else {
      return {
        totalScheduled: 0,
        scheduled: [],
        totalUnscheduled: todoSearchResult.total,
        unscheduled: todoSearchResult.todos
      };
    }
  }),
  on(setScheduledAndUnscheduledTodos, (state, {allTodoSearchResult}) =>
    ({
      scheduled: allTodoSearchResult.scheduled.todos,
      unscheduled: allTodoSearchResult.unscheduled.todos,
      totalScheduled: allTodoSearchResult.scheduled.total,
      totalUnscheduled: allTodoSearchResult.unscheduled.total
    })
  ),
  on(removeTodo, (state, {todo}) => {

    if (todo.scheduled) {
      let scheduledList = state.scheduled?.filter(t => t.id !== todo.id);
      return {...state, scheduled: scheduledList, totalScheduled: scheduledList.length}
    } else {
      let unscheduledList = state.unscheduled?.filter(t => t.id !== todo.id);
      return {...state, unscheduled: unscheduledList, totalUnscheduled: unscheduledList.length}
    }
  })
);
