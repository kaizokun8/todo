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
import {Store} from "@ngrx/store";
import {selectTodos} from "../../../todolists.selector";
import {
  setScheduledAndUnscheduledTodos,
  setScheduledOrUnscheduledTodos
} from "../../../store/todo/todo.actions";
import {TodoStoreState} from "../../../store/todo/todo.reducer";
import {RouterUtil} from "../../../util/RouterUtil";

@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})

export class TodoListComponent {

  todosScheduled!: ReadonlyArray<Todo>;
  totalScheduled!: number;

  todosUnscheduled!: ReadonlyArray<Todo>;
  totalUnscheduled!: number;

  viewType: string = LIST;

  currentChild!: string | undefined;

  todoStoreState$: Observable<TodoStoreState> = this.store.select(selectTodos);

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private store: Store) {

    this.todoStoreState$.subscribe((s) => {
      this.totalScheduled = s.totalScheduled;
      this.totalUnscheduled = s.totalUnscheduled;
      this.todosScheduled = s.scheduled;
      this.todosUnscheduled = s.unscheduled;
    })

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
            let params = RouterUtil.fromParamMapToObject(paramMap);
            return this.getFilterKeysLength(paramMap) > 0 ?
              this.todoService.filterTodos(params) :
              new Observable<ToDoSearchResult>()
          }
        )
        //s'inscrit à l'observable final
      ).subscribe((todoSearchResult) =>
      this.store.dispatch(setScheduledOrUnscheduledTodos({todoSearchResult})));
    //recherche par default sans parametres, todos du jour plus non programmés
    this.route.queryParamMap
      .pipe(switchMap((paramMap) =>
        this.getFilterKeysLength(paramMap) === 0 ?
          this.todoService.getUnscheduledAndTodayScheduledTodos() :
          new Observable<AllToDoSearchResult>()
      )).subscribe((allTodoSearchResult) =>
      this.store.dispatch(setScheduledAndUnscheduledTodos({allTodoSearchResult})));
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
