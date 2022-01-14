import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormTodoComponent} from "./modules/admin/formTodo/formTodo.component";
import {TodoComponent} from "./modules/explorer/todo/todo.component";
import {TodoListComponent} from "./modules/explorer/todoList/todoList.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent, FormTodoComponent, TodoComponent, TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
