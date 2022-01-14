/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {TodoFilters} from "../../../dto/TodoFilters";
import {Priority} from "../../../model/priority";
import {Todo} from "../../../model/Todo";
import {Observable} from "rxjs";
import {ToDoSearchResult} from "../../../dto/ToDoSearchResult";

@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})

export class TodoListComponent {

  constructor(private todoService: TodoService) {

    console.log("TodoListComponent")

    let todoFilter = new TodoFilters();

    todoFilter.title = "";
    todoFilter.description = "";
    todoFilter.scheduled = true;
    todoFilter.done = false;
    todoFilter.startTime = 1642175864000;
    todoFilter.endTime = 1642179464001;
    todoFilter.priority = [Priority.LOW, Priority.MIDDLE, Priority.HIGH, Priority.EXTREME];

    let getTodos$: Observable<ToDoSearchResult> = todoService.getTodos(todoFilter);

    getTodos$.subscribe((searchResult: ToDoSearchResult) => {

      console.log(searchResult);

      console.log("total : " + searchResult.total);

      searchResult.todos.forEach(todo => console.log(todo));
    });
  }

}
