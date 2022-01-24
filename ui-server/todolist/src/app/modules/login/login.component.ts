/**
 * Created by jbe on 21/01/2022
 */

import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginUrl!: string

  constructor() {
    this.loginUrl = environment.clientServer;
  }

}
