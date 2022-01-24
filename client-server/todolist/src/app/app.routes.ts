import {Routes} from "@angular/router";
import {LoggedInGuard} from "../services/LoggedInGuard";
import {TodosComponent} from "./modules/todos/todos.component";
import {TodoListComponent} from "./modules/todos/todoList/todoList.component";
import {TodoFilterComponent} from "./modules/todos/todoFilter/todoFilter.component";
import {TodoComponent} from "./modules/todos/todo/todo.component";
import {FormTodoComponent} from "./modules/todos/formTodo/formTodo.component";
import {LoginComponent} from "./modules/login/login.component";

export const ROUTES: Routes = [

  {path: '', pathMatch: 'full', redirectTo: '/todos/list'},
  {path: 'login', component: LoginComponent},
  {
    path: 'todos', component: TodosComponent, canActivate: [LoggedInGuard],
    children: [
      {
        path: 'list', component: TodoListComponent,
        children: [
          {path: 'filter', component: TodoFilterComponent}
        ]
      },
      {path: 'id/:id', component: TodoComponent},
      {path: 'form/:action', component: FormTodoComponent},
      {path: 'form/:action/:id', component: FormTodoComponent}
    ]
  }
]
