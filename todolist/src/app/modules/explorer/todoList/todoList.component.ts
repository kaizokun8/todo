/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {TodoFilters} from "../../../dto/TodoFilters";
import {Priority} from "../../../model/priority";
import {map, Observable, switchMap} from "rxjs";
import {ToDoSearchResult} from "../../../dto/ToDoSearchResult";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Todo} from "../../../model/Todo";

@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})

export class TodoListComponent {

  todos!: Array<Todo>;
  total!: number;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {

    this.route.queryParamMap
      //transforme l'observable retourné par paramMap
      .pipe(
        //switch vers un autre observable retourné par le service
        switchMap(params => this.todoService.getTodos(params))
        //s'inscrit à l'observable final
      ).subscribe(rs => {

      this.todos = rs.todos;
      this.total = rs.total;
    });

  }

}
