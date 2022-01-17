/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {Observable, switchMap} from "rxjs";
import {ToDoSearchResult} from "../../../dto/ToDoSearchResult";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Todo} from "../../../model/Todo";
import {AllToDoSearchResult} from "../../../dto/AllToDoSearchResult";
import {LIST} from "../../../../shared/View";
import {TodoFilters} from "../../../dto/TodoFilters";

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

  currentChild!: string | undefined;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {

    this.route.url.subscribe((v) => {
      //au changement d'url recupere le chemin enfant courant pour l'attacher dynamiquement
      //aux liens situés dans le template pointant vers l'url de chargement du composant courant.
      this.currentChild = this.route.snapshot.firstChild?.routeConfig?.path;
    })

    this.route.queryParamMap.subscribe((params) => this.viewType = params.get('view') ?? LIST);

    //recherche de todos par parametre de requete
    this.route.queryParamMap
      //transforme l'observable retourné par paramMap
      .pipe(
        //switch vers un autre observable retourné par le service
        switchMap(paramMap => {
          console.log("TO DO LIST====")
          console.log(paramMap)

            return this.getFilterKeysLength(paramMap) > 0 ?
              this.todoService.filterTodos(paramMap) :
              new Observable<ToDoSearchResult>()
          }
        )
        //s'inscrit à l'observable final
      ).subscribe(rs => {
      if (rs.scheduled) {
        this.todosScheduled = rs.todos;
        this.totalScheduled = rs.total;
        this.todosUnscheduled = [];
        this.totalUnscheduled = 0;
      } else {
        this.todosUnscheduled = rs.todos;
        this.totalUnscheduled = rs.total;
        this.todosScheduled = [];
        this.totalScheduled = 0;
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

    let todoFilters = new TodoFilters();

    let keys = Object.keys(todoFilters)

    let paramsInMap = keys.filter(key => paramMap.has(key));

    return paramsInMap.length;
  }

}
