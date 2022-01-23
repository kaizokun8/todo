/**
 * Created by jbe on 15/01/2022
 */

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Todo} from "../../../model/Todo";
import {TodoService} from "../../../../services/todo.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirmDialog/confirmDialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {setNotificationList} from "../../../store/notification/notification.actions";
import {Notification} from "../../../model/Notification";
import {removeTodo} from "../../../store/todo/todo.actions";

@Component({
  selector: 'todoCommands',
  templateUrl: './todoCommands.component.html',
  styleUrls: ['./todoCommands.component.css']
})

export class TodoCommandsComponent implements OnChanges {

  @Input() todo!: Todo;
  @Input() iconSize!: string;
  @Input() fromList: boolean = false;
  @Output('delete') readonly delete = new EventEmitter<Todo>();

  done!: Boolean;

  constructor(private todoService: TodoService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private store: Store<{ notification: string }>) {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.done = this.todo?.done;
  }

  onDelete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '300px',
        data: {title: "Delete the task", message: `Are you sure you want to delete the task : ${this.todo?.title}`}
      })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.todoService.deleteTodo(this.todo)
          .subscribe({
            next: () => {
              let notifications: Array<Notification> = [{
                severity: 'success',
                summary: 'Task delete',
                detail: `The task "${this.todo.title}" has been successfully deleted ! `
              }];

              this.store.dispatch(setNotificationList({notifications}))
              //this.snackbar.open("The task has been successfully deleted ! ", "Keep going", {duration: 5000})
              this.store.dispatch(removeTodo({todo: this.todo}));
              this.delete.emit();
            },
            error: (err) => {
              //erreur non géré au niveau de l'intercepteur générique
              let notifications: Array<Notification> = [{
                severity: 'error',
                summary: 'Task delete error',
                detail: `An error occured when deleting the task "${this.todo.title}" !!! `
              }];

              this.store.dispatch(setNotificationList({notifications}))

            },
            complete: () => {
              console.log("complete")
            }
          })
      }
    })
  }

  onDone() {
    this.todoService.switchDone(this.todo, this.done)
      .subscribe((done) => {
        this.done = done
      });
  }
}
