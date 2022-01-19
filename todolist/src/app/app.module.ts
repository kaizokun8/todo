import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormTodoComponent} from "./modules/explorer/formTodo/formTodo.component";
import {TodoComponent} from "./modules/explorer/todo/todo.component";
import {TodoListComponent} from "./modules/explorer/todoList/todoList.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TodoFilterComponent} from "./modules/explorer/todoFilter/todoFilter.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {TodoTableComponent} from "./modules/explorer/todoTable/todoTable.component";
import {TodoCommandsComponent} from "./modules/explorer/todoCommands/todoCommands.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {UserFormComponent} from "./modules/demo/userForm/userForm.component";
import {ConfirmDialogComponent} from "./modules/explorer/confirmDialog/confirmDialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreModule} from "@ngrx/store";
import {notificationReducer} from "./store/notification/notification.reducer";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {todoReducer} from "./store/todo/todo.reducer";
import {TodoCalendarComponent} from "./modules/explorer/todoCalendar/todoCalendar.component";

@NgModule({
  declarations: [
    AppComponent, FormTodoComponent, TodoComponent,
    TodoListComponent, TodoFilterComponent, TodoTableComponent,
    TodoCommandsComponent, UserFormComponent, ConfirmDialogComponent, TodoCalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot({notifications: notificationReducer, todos: todoReducer}),
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
