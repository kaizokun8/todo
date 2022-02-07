/**
 * Created by jbe on 14/01/2022
 */

import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Todo} from "../../../model/Todo";
import {LIST} from "../../../../shared/View";
import {Store} from "@ngrx/store";
import {TodoStoreState} from "../../../store/todo/todo.reducer";
import {selectTodos, selectTodosScheduled, selectTodosUnscheduled} from "../../../selectors/todolists.selector";


@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})

export class TodoListComponent implements OnInit {

  todosScheduled!: ReadonlyArray<Todo>;
  totalScheduled!: number;

  todosUnscheduled!: ReadonlyArray<Todo>;
  totalUnscheduled!: number;

  viewType: string = LIST;

  currentChild!: string | undefined;

  todoStoreState$: Observable<TodoStoreState> = this.store.select(selectTodos);

  todosScheduled$: Observable<ReadonlyArray<Todo>> = this.store.select(selectTodosScheduled);

  todosUnScheduled$: Observable<ReadonlyArray<Todo>> = this.store.select(selectTodosUnscheduled);

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private store: Store) {


  }

  ngOnInit(): void {

    this.todoStoreState$.subscribe((s) => {
      this.totalScheduled = s.totalScheduled;
      this.totalUnscheduled = s.totalUnscheduled;
    })

    //not working...
    this.todosScheduled$.subscribe(scheduled => this.todosScheduled = scheduled);
    this.todosUnScheduled$.subscribe(unscheduled => this.todosUnscheduled = unscheduled);

    this.route.url.subscribe((v) => {
      //au changement d'url recupere le chemin enfant courant pour l'attacher dynamiquement
      //aux liens situés dans le template pointant vers l'url de chargement du composant courant.
      this.currentChild = this.route.snapshot.firstChild?.routeConfig?.path;
    })
    this.route.queryParamMap.subscribe((params) => this.viewType = params.get('view') ?? LIST);

    //recherche par default sans parametres, todos du jour plus non programés
    //comparaison recuperation directe vs recuperation via effect
    /*
    this.route.queryParamMap
      .pipe(switchMap((paramMap) =>
        this.getFilterKeysLength(paramMap) === 0 ?
          this.todoService.getUnscheduledAndTodayScheduledTodos() :
          new Observable<AllToDoSearchResult>()
      )).subscribe((allTodoSearchResult) =>
      this.store.dispatch(loadScheduledAndUnscheduledTodosSuccess({allTodoSearchResult})));
*/
    //deplacé vers le resolver, le composant est ainsi davantage découplé du store.
    /*
    this.route.queryParamMap.subscribe(
      ((paramMap) => {
          if (this.getFilterKeysLength(paramMap) === 0) {
            this.store.dispatch(loadScheduledAndUnscheduledTodos())
          }
        }
      ))
    */
  }

}
