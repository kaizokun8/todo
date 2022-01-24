import {Routes} from "@angular/router";
import {TodoListComponent} from "./modules/explorer/todoList/todoList.component";
import {TodoComponent} from "./modules/explorer/todo/todo.component";
import {FormTodoComponent} from "./modules/explorer/formTodo/formTodo.component";
import {TodoFilterComponent} from "./modules/explorer/todoFilter/todoFilter.component";
import {LoginComponent} from "./modules/explorer/login/login.component";
import {LoggedInGuard} from "../services/LoggedInGuard";

export const ROUTES: Routes = [

  {path: '', pathMatch: 'full', redirectTo: '/todos'},
  {path: 'login', component: LoginComponent},
  {
    path: 'todos', component: TodoListComponent, canActivate: [LoggedInGuard],
    children: [
      {path: 'filter', component: TodoFilterComponent}
    ]
  },
  {path: 'todos/:id', component: TodoComponent, canActivate: [LoggedInGuard]},
  {path: 'form/:action', component: FormTodoComponent, canActivate: [LoggedInGuard]},
  {path: 'form/:action/:id', component: FormTodoComponent, canActivate: [LoggedInGuard]}
]
