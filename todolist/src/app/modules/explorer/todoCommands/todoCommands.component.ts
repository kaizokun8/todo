/**
 * Created by jbe on 15/01/2022
 */

import {Component, Input} from '@angular/core';
import {Todo} from "../../../model/Todo";

@Component({
  selector: 'todoCommands',
  templateUrl: './todoCommands.component.html',
  styleUrls: ['./todoCommands.component.css']
})


export class TodoCommandsComponent {

  @Input() todo!: Todo;
  @Input() fromList: boolean = false;
}
