import {Routes} from "@angular/router";
import {TodoListComponent} from "./modules/explorer/todoList/todoList.component";
import {TodoComponent} from "./modules/explorer/todo/todo.component";
import {FormTodoComponent} from "./modules/explorer/formTodo/formTodo.component";
import {TodoFilterComponent} from "./modules/explorer/todoFilter/todoFilter.component";
import {UserFormComponent} from "./modules/demo/userForm/userForm.component";
import {LoginComponent} from "./modules/explorer/login/login.component";

export const ROUTES: Routes = [

  {path: '', pathMatch: 'full', redirectTo: '/todos'},
  {path: 'login', component: LoginComponent},
  {
    path: 'todos', component: TodoListComponent,
    children: [
      {path: 'filter', component: TodoFilterComponent},
      {path: 'search', component: TodoFilterComponent},
    ]
  },
  {path: 'todos/:id', component: TodoComponent},
  {path: 'form/:action', component: FormTodoComponent},
  {path: 'form/:action/:id', component: FormTodoComponent}
]
