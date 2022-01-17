/**
 * Created by jbe on 15/01/2022
 */

import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../../model/Todo";
import {scheduled} from "rxjs";

@Component({
  selector: 'todoTable',
  templateUrl: './todoTable.component.html',
  styleUrls: ['./todoTable.component.css']
})

export class TodoTableComponent implements OnInit{

  @Input("todoList") todoList!: Array<Todo>;

  @Input("scheduled") scheduled!: boolean;

  displayedColumns: Array<String> = [];

  ngOnInit(): void {

    this.displayedColumns.push('id');
    this.displayedColumns.push('priority');
    this.displayedColumns.push('title');

    if (this.scheduled) {
      this.displayedColumns.push('startTime');
      this.displayedColumns.push('endTime');
    }
    this.displayedColumns.push('creationTime');
    this.displayedColumns.push('done');
    this.displayedColumns.push('admin');
  }
}
