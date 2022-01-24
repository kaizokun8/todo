/**
 * Created by jbe on 20/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Todo} from "../../../model/Todo";
import {Router} from "@angular/router";

@Component({
  selector: 'quickSearch',
  templateUrl: './quickSearch.component.html',
  styleUrls: ['./quickSearch.component.css']
})

export class QuickSearchComponent {

  title = new FormControl('');
  scheduled = new FormControl(true);
  todoList: Array<Todo> = [];

  constructor(private todoService: TodoService, private fb: FormBuilder, private router: Router) {

    this.title.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(newValue => {
      //console.log("newValue : " + newValue)
      let params = {title: newValue, scheduled: this.scheduled.value};
      todoService.filterTodos(params).subscribe((rs) => {
        this.todoList = rs.todos;
      })
    })
  }

}
