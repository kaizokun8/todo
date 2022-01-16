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
import {RouterUtil} from "../../../util/RouterUtil";
import {TodoFilters} from "../../../dto/TodoFilters";
import {TodoFiltersImp} from "../../../dto/TodoFiltersImp";

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

  listViewQueryParams: { [k: string]: any } = {};

  gridViewQueryParams: { [k: string]: any } = {};

  constructor(private todoService: TodoService, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe((params) => {
      this.viewType = params.get('view') ?? LIST;
      let paramObject = RouterUtil.fromParamMapToObject(params)
      this.listViewQueryParams = {...paramObject, ['view']: LIST}
      this.gridViewQueryParams = {...paramObject, ['view']: GRID};
    });

    //recherche de todos par parametre de requete
    this.route.queryParamMap
      //transforme l'observable retourné par paramMap
      .pipe(
        //switch vers un autre observable retourné par le service
        switchMap(paramMap =>
          this.getFilterKeysLength(paramMap) > 0 ?
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
      .pipe(switchMap((paramMap) =>
        this.getFilterKeysLength(paramMap) === 0 ?
          this.todoService.getUnscheduledAndTodayScheduledTodos() :
          new Observable<AllToDoSearchResult>()
      )).subscribe((rs: AllToDoSearchResult) => {
      this.todosScheduled = rs.scheduled.todos;
      this.totalScheduled = rs.scheduled.total;
      this.todosUnscheduled = rs.unscheduled.todos;
      this.totalUnscheduled = rs.unscheduled.total;
    });
  }

  /**
   * compte le nombre de parametres utilisés pour filtrer les todos.
   * */
  private getFilterKeysLength(paramMap: ParamMap): number {

    let todoFilters: TodoFilters = new TodoFiltersImp();

    let keys = Object.keys(todoFilters)

    let paramsInMap = keys.filter(key => paramMap.has(key));

    return paramsInMap.length;
  }

}
