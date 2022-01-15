/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Todo} from "../../../model/Todo";
import {FormControl, FormGroup} from "@angular/forms";
import {Priority, PriorityLabels} from "../../../model/priority";
import {CREATE, EDIT} from "../../../../shared/Action";

@Component({
  selector: 'formTodo',
  templateUrl: './formTodo.component.html',
  styleUrls: ['./formTodo.component.css']
})

export class FormTodoComponent {


  id = new FormControl();
  priority = new FormControl();
  title = new FormControl();
  description = new FormControl();
  scheduled = new FormControl();

  todoDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  priorities: Array<Priority> = [Priority.LOW, Priority.MIDDLE, Priority.HIGH, Priority.EXTREME];

  startDate = new FormControl();
  endDate = new FormControl();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {

    route.paramMap.pipe(switchMap((paramsMap) => {

        let action = paramsMap.get("action");

        if (action === CREATE) {

          let todo: Todo = {
            id: null,
            title: "",
            description: "",
            priority: Priority.LOW,
            creationTime: 0,
            updateTime: 0,
            scheduled: true,
            startTime: new Date().getTime(),
            endTime: new Date().getTime(),
            done: false
          }

          return new Observable<Todo>(observer => observer.next(todo));

        } else if (action === EDIT) {

          return this.todoService.getTodo(paramsMap.get("id"))
        }
        return new Observable<Todo>()
      }
    )).subscribe((todo: Todo) => {

      if (todo) {
        this.id.setValue(todo.id);
        this.priority.setValue(todo.priority);
        this.title.setValue(todo.title);
        this.description.setValue(todo.description);
        this.scheduled.setValue(todo.scheduled);
        this.startDate.setValue(todo.startTime ? new Date(todo.startTime) : new Date());
        this.endDate.setValue(todo.endTime ? new Date(todo.endTime) : new Date())
        //this.todoDateRange.get('start')?.setValue(todo.startTime ? new Date(todo.startTime) : new Date());
        //this.todoDateRange.get('end')?.setValue(todo.endTime ? new Date(todo.endTime) : new Date());
      }

    });
  }

  save() {

    let todo: Todo = {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      priority: this.priority.value,
      creationTime: 0,
      updateTime: 0,
      scheduled: this.scheduled.value,
      //startTime: this.todoDateRange.get('start')?.value?.getTime() ?? 0,
      //endTime: this.todoDateRange.get('end')?.value?.getTime() ?? 0,
      startTime: this.startDate.value?.getTime() ?? 0,
      endTime: this.endDate.value?.getTime() ?? 0,
      done: false
    }

    this.todoService.saveTodo(todo).subscribe((todo) => {

      window.location.href = `/todos/${todo.id}`;

    })

  }

  setScheduled(checked: boolean) {
    this.scheduled.setValue(checked);
  }

  priorityLabel(priority: Priority) {

    return PriorityLabels[priority];
  }
}
