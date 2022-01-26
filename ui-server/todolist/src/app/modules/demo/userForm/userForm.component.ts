/**
 * Created by jbe on 16/01/2022
 */

import {Component} from '@angular/core';
import {User} from "../../../model/User";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})

export class UserFormComponent {

  user: User = {
    id: '',
    email: 'foo@bar.com',
    username: 'foo',
    password: 'bar'
  }

  save(user: User) {
    console.log("save")
    console.log(user)
  }

  saveB() {
    console.log("save b")
    console.log(this.user)
  }
}
