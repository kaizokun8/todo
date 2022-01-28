import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
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
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreModule} from "@ngrx/store";
import {notificationReducer} from "./store/notification/notification.reducer";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {todoReducer} from "./store/todo/todo.reducer";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ApiInterceptor} from "../services/ApiInterceptor";
import {ErrorHandlerInterceptor} from "../services/ErrorHandlerInterceptor";
import {MatTabsModule} from "@angular/material/tabs";
import {userReducer} from "./store/user/user.reducer";
import {TodosComponent} from "./modules/todos/todos.component";
import {FormTodoComponent} from "./modules/todos/formTodo/formTodo.component";
import {TodoComponent} from "./modules/todos/todo/todo.component";
import {TodoListComponent} from "./modules/todos/todoList/todoList.component";
import {TodoFilterComponent} from "./modules/todos/todoFilter/todoFilter.component";
import {TodoTableComponent} from "./modules/todos/todoTable/todoTable.component";
import {TodoCalendarComponent} from "./modules/todos/todoCalendar/todoCalendar.component";
import {QuickSearchComponent} from "./modules/todos/quickSearch/quickSearch.component";
import {TodoCommandsComponent} from "./modules/todos/todoCommands/todoCommands.component";
import {MatListModule} from "@angular/material/list";
import {ConfirmDialogComponent} from "./components/confirmDialog/confirmDialog.component";
import {NotificationsComponent} from "./modules/notifications/notifications.component";
import {LoginComponent} from "./modules/login/login.component";
import {appReducer} from "./store/app/app.reducer";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AsyncPipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent, FormTodoComponent, TodoComponent, LoginComponent, TodosComponent,
    TodoListComponent, TodoFilterComponent, TodoTableComponent, NotificationsComponent,
    TodoCommandsComponent, UserFormComponent, ConfirmDialogComponent, TodoCalendarComponent, QuickSearchComponent
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
    StoreModule.forRoot({
      notifications: notificationReducer,
      todos: todoReducer,
      user: userReducer,
      app: appReducer
    }),
    ToastModule,
    ProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [MessageService, AsyncPipe,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
