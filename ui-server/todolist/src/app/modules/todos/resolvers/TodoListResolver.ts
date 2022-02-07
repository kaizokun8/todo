import {ActivatedRouteSnapshot, ParamMap, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {loadScheduledAndUnscheduledTodos, loadScheduledOrUnscheduledTodos} from "../../../store/todo/todo.actions";
import {Store} from "@ngrx/store";
import {TodoFilters} from "../../../dto/TodoFilters";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TodoListResolver implements Resolve<void> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {

    if (this.getFilterKeysLength(route.queryParamMap) > 0) {
      this.store.dispatch(loadScheduledOrUnscheduledTodos({paramMap: route.queryParamMap}));
    } else {
      this.store.dispatch(loadScheduledAndUnscheduledTodos())
    }
  }

  private getFilterKeysLength(paramMap: ParamMap): number {

    let todoFilters = new TodoFilters();

    let keys = Object.keys(todoFilters)

    let paramsInMap = keys.filter(key => paramMap.has(key));

    return paramsInMap.length;
  }
}
