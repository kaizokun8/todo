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
  ValidationErrors,
  Validators
} from "@angular/forms";
import {Priority, PriorityLabels, Priorities} from "../../../model/priority";
import {CREATE, EDIT} from "../../../../shared/Action";
import {Store} from "@ngrx/store";
import {Notification} from "../../../model/Notification";
import {setNotificationList} from "../../../store/notification.actions";

@Component({
  selector: 'formTodo',
  templateUrl: './formTodo.component.html',
  styleUrls: ['./formTodo.component.css']
})

export class FormTodoComponent {

  todayStart = new Date();

  initTodo: Todo;

  todoForm!: FormGroup;

  priorities: Array<Priority> = Priorities;

  action!: string | null;

  static endDateGreaterThanStartDate(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const end: Date = group.get("end")!.value;
    const scheduled: Date = group.get("scheduled")!.value;
    return scheduled && start && end && end?.getTime() <= start?.getTime() ? {startGreaterThanEnd: true} : null;
  }

  static endDateSameDayThanStartDate(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const end: Date = group.get("end")!.value;
    const scheduled: Date = group.get("scheduled")!.value;
    return (scheduled && end && start && start?.getDay() !== end?.getDay()) ? {startNotSameDayThanEnd: true} : null;
  }

  public static startDateIsToday(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const scheduled: Date = group.get("scheduled")!.value;
    return scheduled && start && start?.getDay() !== new Date().getDay() ? {notToday: true} : null;
  }

  public static startDateIsRequired(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("start")!.value;
    const scheduled: Date = group.get("scheduled")!.value;
    return scheduled && !start ? {startDateMissing: true} : null;
  }

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store) {

    let start = new Date();
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0);

    let end = new Date();
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59);

    this.initTodo = {
      id: null,
      title: '',
      description: '',
      priority: Priority.LOW,
      creationTime: 0,
      updateTime: 0,
      scheduled: true,
      startTime: start.getTime(),
      endTime: end.getTime(),
      done: false
    };

    this.todoForm = fb.group({
      id: null,
      priority: null,
      title: fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description: null,
      done: false,
      range: fb.group({
        scheduled: false,
        start: null,
        end: null
      }, {
        validators: [
          FormTodoComponent.endDateGreaterThanStartDate, FormTodoComponent.endDateSameDayThanStartDate,
          FormTodoComponent.startDateIsToday, FormTodoComponent.startDateIsRequired]
      })
    });

    route.paramMap.pipe(switchMap((paramsMap) => {

        this.action = paramsMap.get("action");

        if (this.action === CREATE) {

          return new Observable<Todo>(o => o.next(this.initTodo));

        } else if (this.action === EDIT) {

          return this.todoService.getTodo(paramsMap.get("id"))
        }
        return new Observable<Todo>()
      }
    )).subscribe((todo: Todo) => {

      if (todo) {

        this.todoForm.get('id')?.setValue(todo.id);
        this.todoForm.get('priority')?.setValue(todo.priority);
        this.todoForm.get('title')?.setValue(todo.title);
        this.todoForm.get('description')?.setValue(todo.description);
        this.todoForm.get('done')?.setValue(todo.done);
        let range = this.todoForm.get('range');
        range?.get('scheduled')?.setValue(todo.scheduled);
        range?.get('start')?.setValue(todo.startTime ? new Date(todo.startTime) : new Date());
        range?.get('end')?.setValue(todo.endTime ? new Date(todo.endTime) : new Date());
      }

    });
  }

  save() {

    let values = this.todoForm.value;

    let todo: Todo = {
      id: values.id,
      title: values.title,
      description: values.description,
      priority: values.priority,
      creationTime: null,
      updateTime: null,
      scheduled: values.range.scheduled,
      startTime: (values.range.scheduled && values.range.start instanceof Date) ? values.range.start.getTime() : 0,
      endTime: (values.range.scheduled && values.range.end instanceof Date) ? values.range.end.getTime() : 0,
      done: values.done
    }

    this.todoService.saveTodo(todo).subscribe({
      next: (todo) => {

        //window.location.href = `/todos/${todo.id}`;

        let action = this.action === CREATE ? 'created' : 'updated';

        let notifications: Array<Notification> = [{
          severity: 'success',
          summary: `Task ${action}`,
          detail: `The task "${todo.id}#${todo.title}" has been successfully ${action} ! `
        }];

        this.store.dispatch(setNotificationList({notifications}))
      },
      error: () => {

        let action = this.action === CREATE ? 'creating' : 'updating';

        let notifications: Array<Notification> = [{
          severity: 'error',
          summary: `Error`,
          detail: `An error occured while ${action} the task "${todo.id}#${todo.title}" ! `
        }];

        this.store.dispatch(setNotificationList({notifications}))
      },
      complete: () => {

      }
    })
  }

  priorityLabel(priority: Priority) {

    return PriorityLabels[priority];
  }

  isTitleInvalid() {
    return this.todoForm.get('title')?.invalid;
  }

  isRangeInvalid() {
    return this.todoForm.get('range')?.invalid;
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

  getDateRangeErrorMessages() {

    let range = this.todoForm.get('range');

    let errorMessages = [];

    if (range?.hasError('startDateMissing')) {
      //si la date de depart est manquant on ne retourne que cette erreur
      //les autres étant soit sur cette date si elle est defini
      //ou des comparaisons par rapport à elle
      errorMessages.push('The start date is missing');
    } else {

      if (range?.hasError('notToday')) {
        errorMessages.push('The start date must be today');
      }
      if (range?.hasError('startGreaterThanEnd')) {
        errorMessages.push('The start date is greater or equal to the end date');
      }
      if (range?.hasError('startNotSameDayThanEnd')) {
        errorMessages.push('The start date is not the same day than the end date');
      }
    }

    return errorMessages;
  }

  isAdd() {
    return this.action === CREATE;
  }

  isEdit() {
    return this.action === EDIT;
  }

}
