import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Todo} from "../../../model/Todo";
import {concatMap, delay, from, Observable, of} from "rxjs";
import {TodoService} from "../../../../services/todo.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<Todo> {

  constructor(private todoService: TodoService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Todo> | Promise<Todo> | Todo {

    const id = route.paramMap.get("id");

    return this.todoService.getTodo(id);
  }

}
