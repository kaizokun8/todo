import {HttpClient, HttpParams} from "@angular/common/http";
import {from, Observable} from 'rxjs';
import {environment} from '../environments/environment'
import {Todo} from "../app/model/Todo";
import {Injectable} from "@angular/core";
import {TodoFilters} from "../app/dto/TodoFilters";
import {HttpUtil} from "../app/util/HttpUtil";
import {ToDoSearchResult} from "../app/dto/ToDoSearchResult";
import {ParamMap} from "@angular/router";

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

  getTodo(id: string | null): Observable<Todo> {

    if (id === null) {
      return new Observable<Todo>();
    }

    return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`);
  }

  getTodos(paramMap: ParamMap): Observable<ToDoSearchResult> {

    let params = HttpUtil.fromParamMaptoHttpParams(paramMap);

    return this.http.get<ToDoSearchResult>(`${this.baseUrl}/todos`, {params});
  }

}
