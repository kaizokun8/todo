/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Todo} from "../../../model/Todo";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {Priority, PriorityLabels} from "../../../model/priority";
import {CREATE, EDIT} from "../../../../shared/Action";
import {User} from "../../../model/User";
import {DateControlValidator} from "../../../validator/DateControlValidator";

@Component({
  selector: 'formTodo',
  templateUrl: './formTodo.component.html',
  styleUrls: ['./formTodo.component.css']
})

export class FormTodoComponent {

  initTodo: Todo = {
    id: null,
    title: '',
    description: '',
    priority: Priority.LOW,
    creationTime: 0,
    updateTime: 0,
    scheduled: true,
    startTime: new Date().getTime(),
    endTime: new Date().getTime(),
    done: false
  };

  todoForm!: FormGroup;

  priorities: Array<Priority> = [Priority.LOW, Priority.MIDDLE, Priority.HIGH, Priority.EXTREME];

  static endDateGreaterThanStartDate(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const end: Date = group.get("end")!.value;
    return (end && (start?.getTime() < end?.getTime())) ? null : {startGreaterThanEnd: true};
  }

  static endDateSameDayThanStartDate(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const end: Date = group.get("end")!.value;
    return (end && (start?.getDay() === end?.getDay())) ? null : {startNotSameDayThanEnd: true};
  }

  constructor(private todoService: TodoService, private route: ActivatedRoute, private fb: FormBuilder) {

    route.paramMap.pipe(switchMap((paramsMap) => {

        let action = paramsMap.get("action");

        if (action === CREATE) {

          return new Observable<Todo>(o => o.next(this.initTodo));

        } else if (action === EDIT) {

          return this.todoService.getTodo(paramsMap.get("id"))
        }
        return new Observable<Todo>()
      }
    )).subscribe((todo: Todo) => {

      if (todo) {

        this.todoForm = fb.group({
          id: todo.id,
          priority: todo.priority,
          title: fb.control(todo.title, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
          description: todo.description,
          scheduled: todo.scheduled,
          range: fb.group({
            start: fb.control(todo.startTime ? new Date(todo.startTime) : new Date(), [Validators.required, DateControlValidator.isGreaterThanNow]),
            end: todo.endTime ? new Date(todo.endTime) : new Date()
          }, {validators: [FormTodoComponent.endDateGreaterThanStartDate, FormTodoComponent.endDateSameDayThanStartDate]})

        })

      }

    });
  }

  save() {

    let values = this.todoForm.value;

    console.log(values);

    let todo: Todo = {
      id: values.id,
      title: values.title,
      description: values.description,
      priority: values.priority,
      creationTime: 0,
      updateTime: 0,
      scheduled: values.scheduled,
      startTime: values.range.start instanceof Date ? values.range.start.getTime() : 0,
      endTime: values.range.end instanceof Date ? values.range.end.getTime() : 0,
      done: false
    }

    this.todoService.saveTodo(todo).subscribe((todo) => {

      //window.location.href = `/todos/${todo.id}`;

    })
  }

  priorityLabel(priority: Priority) {

    return PriorityLabels[priority];
  }

  isTitleInvalid() {
    return this.todoForm.get('title')?.invalid;
  }

  getTitleErrorMessage() {

    let title = this.todoForm.get('title')

    if (title?.hasError('required')) {
      return 'The title is required'
    }
    if (title?.hasError('minlength')) {
      return 'The title cannot be less than three characters'
    }
    if (title?.hasError('maxlength')) {
      return 'The title cannot be more than 255 characters'
    }
    return '';
  }

  isRangeInvalid() {
    return this.todoForm.get('range')?.invalid;
  }

  getDateRangeErrorMessage() {

    let range = this.todoForm.get('range');

    if (range?.hasError('startGreaterThanEnd')) {
      return 'The start date is greater or equal to the end date';
    }

    if (range?.hasError('startNotSameDayThanEnd')) {
      return 'The start date is not the same day than the end date';
    }

    return '';
  }

  isStartInvalid() {

    return this.todoForm.get('range')?.get('start')?.invalid;
  }

  getStartErrorMessage() {

    let start = this.todoForm.get('range')?.get('start')

    if (start?.hasError('required')) {
      return 'The start date is required';
    }
    if (start?.hasError('lessThanNow')) {
      return 'The start date must be in the future';
    }
    return '';
  }

}
