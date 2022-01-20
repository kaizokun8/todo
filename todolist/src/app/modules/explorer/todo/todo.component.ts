/**
 * Created by jbe on 14/01/2022
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Todo} from "../../../model/Todo";
import {map, switchMap} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  @Input() todo!: Todo;
  @Input() fromList: boolean = false;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    /*
        this.route.paramMap.subscribe((params: ParamMap) => {
          const id = params.get('id');
          this.todoService.getTodo(id).subscribe(todo => this.todo = todo)
        });
    */
    this.route.paramMap
      //transorme l'observable retourné par paramMap
      .pipe(
        //map la valeur retournée par l'observable sur l'id
        map((params: ParamMap) => params.get('id')!),
        //switch vers un autre observable retourné par le service
        switchMap(id => this.todoService.getTodo(id))
        //s'inscrit à l'observable final
      ).subscribe(todo => this.todo = todo);
  }

  onDelete() {
    //si le todo est affiché depuis une liste on transmet l'evenement au parent
    if (!this.fromList) {
      this.location.back();
    }
  }

}
