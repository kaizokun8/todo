/**
 * Created by jbe on 15/01/2022
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../../model/Todo";
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'todoCommands',
  templateUrl: './todoCommands.component.html',
  styleUrls: ['./todoCommands.component.css']
})

export class TodoCommandsComponent {

  @Input() todo!: Todo;
  @Input() fromList: boolean = false;
  @Output('delete') readonly delete = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {
  }

  onDelete(): void {

    this.todoService.deleteTodo(this.todo)
      .subscribe(() => this.delete.emit(this.todo))
  }

}
