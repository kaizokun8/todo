import {HttpClient} from "@angular/common/http";
import {from, Observable} from 'rxjs';
import {environment} from '../environments/environment'
import {Todo} from "../app/model/Todo";
import {Injectable} from "@angular/core";
import {TodoFilters} from "../app/dto/TodoFilters";
import {HttpUtil} from "../app/util/HttpUtil";
import {ToDoSearchResult} from "../app/dto/ToDoSearchResult";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  baseUrl: String = environment.todoResourceServerUrl;

  saveTodo(todo: Todo): Observable<Todo> {

    if (todo.id !== null) {
      return this.http.put<Todo>(`${this.baseUrl}/todo`, todo);
    } else {
      return this.http.post<Todo>(`${this.baseUrl}/todo`, todo);
    }
  }

  getTodo(id: number): Observable<Todo> {

    return this.http.get<Todo>(`${this.baseUrl}/todo/${id}`);
  }

  getTodos(todoFilters: TodoFilters): Observable<ToDoSearchResult> {

    let queryParams = HttpUtil.fromClassToQueryParams(todoFilters);

    console.log("getTodos : " + queryParams);

    return this.http.get<ToDoSearchResult>(`${this.baseUrl}/todos?${queryParams}`);
  }

}
