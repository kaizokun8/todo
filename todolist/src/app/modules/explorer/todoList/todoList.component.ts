/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {map, Observable, switchMap} from "rxjs";
import {ToDoSearchResult} from "../../../dto/ToDoSearchResult";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Todo} from "../../../model/Todo";
import {AllToDoSearchResult} from "../../../dto/AllToDoSearchResult";
import {GRID, LIST} from "../../../../shared/View";

@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})

export class TodoListComponent {

  todosScheduled!: Array<Todo>;
  totalScheduled!: number;

  todosUnscheduled!: Array<Todo>;
  totalUnscheduled!: number;

  viewType: string = LIST;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    //recherche de todos par parametre de requete
    this.route.queryParamMap
      //transforme l'observable retourné par paramMap
      .pipe(
        //switch vers un autre observable retourné par le service
        switchMap(paramMap =>
          paramMap.keys.length > 0 ?
            this.todoService.filterTodos(paramMap) :
            new Observable<ToDoSearchResult>()
        )
        //s'inscrit à l'observable final
      ).subscribe(rs => {
      if (rs.scheduled) {
        this.todosScheduled = rs.todos;
        this.totalScheduled = rs.total;
      } else {
        this.todosUnscheduled = rs.todos;
        this.totalUnscheduled = rs.total;
      }
    });
    //recherche par default sans parametres, todos du jour plus non programmés
    this.route.queryParamMap
      .pipe(switchMap(paramMap =>
        paramMap.keys.length === 0 ?
          this.todoService.getUnscheduledAndTodayScheduledTodos() :
          new Observable<AllToDoSearchResult>()
      )).subscribe((rs: AllToDoSearchResult) => {
      this.todosScheduled = rs.scheduled.todos;
      this.totalScheduled = rs.scheduled.total;
      this.todosUnscheduled = rs.unscheduled.todos;
      this.totalUnscheduled = rs.unscheduled.total;
    });

  }

  listView() {
    this.viewType = LIST;
  }

  isList() {
    return this.viewType === LIST;
  }

  gridView() {
    this.viewType = GRID;
  }

  isGrid() {
    return this.viewType === GRID;
  }

}
