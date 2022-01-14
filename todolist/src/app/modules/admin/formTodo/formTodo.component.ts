/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'formTodo',
  templateUrl: './formTodo.component.html',
  styleUrls: ['./formTodo.component.css']
})

export class FormTodoComponent {

  constructor(private todoService : TodoService) {
  }

}
