import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {TodoService} from "../../../services/todo.service";
import {
  loadScheduledAndUnscheduledTodos,
  loadScheduledAndUnscheduledTodosFailure,
  loadScheduledAndUnscheduledTodosSuccess, loadScheduledOrUnscheduledTodos, loadScheduledOrUnscheduledTodosSuccess
} from "./todo.actions";
import {RouterUtil} from "../../util/RouterUtil";

@Injectable()
export class TodoEffects {

  getTodos$ = createEffect(() => this.actions$.pipe(
      ofType(loadScheduledAndUnscheduledTodos),
      mergeMap(() => this.todoService.getUnscheduledAndTodayScheduledTodos()
        .pipe(
          map(todos => loadScheduledAndUnscheduledTodosSuccess({allTodoSearchResult: todos})),
          catchError(() => of(loadScheduledAndUnscheduledTodosFailure))
        ))
    )
  )

  filterTodos$ = createEffect(() => this.actions$.pipe(
      ofType(loadScheduledOrUnscheduledTodos),
      mergeMap((p) => this.todoService.filterTodos(RouterUtil.fromParamMapToObject(p.paramMap))
        .pipe(
          map(todos => loadScheduledOrUnscheduledTodosSuccess({todoSearchResult: todos})),
          catchError(() => of(loadScheduledAndUnscheduledTodosFailure))
        ))
    )
  )

  constructor(private actions$: Actions,
              private store: Store,
              private todoService: TodoService) {

  }

}
