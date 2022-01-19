/**
 * Created by jbe on 19/01/2022
 */

import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LIST} from "../../../../shared/View";
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";

@Component({
  selector: 'todoCalendar',
  templateUrl: './todoCalendar.component.html',
  styleUrls: ['./todoCalendar.component.css']
})

export class TodoCalendarComponent {

  selectedDate: Date | null = new Date();

  viewType: string = LIST;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe((params) => this.viewType = params.get('view') ?? LIST);

    this.onMonthSelected(this.selectedDate);
  }

  onSelectChange(date: Date | null) {
    console.log("onSelectChange");
    console.log(date);
    date?.setHours(0);
    date?.setMinutes(0);
    date?.setSeconds(0);
    let startTime = date?.getTime();
    date?.setHours(23);
    date?.setMinutes(59);
    date?.setSeconds(59);
    let endTime = date?.getTime();
    this.router.navigate(['/todos'], {
      queryParams: {
        startTime: startTime,
        endTime: endTime,
        scheduled: true,
        view: this.viewType
      }
    })
  }

  onMonthSelected(month: Date | null) {
    console.log("onMonthSelected")
    console.log(month)
  }

  onYearSelected(year: Date) {
    console.log("onYearSelected")
    console.log(year)
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    console.log(cellDate)
    console.log(cellDate.getDate())
    console.log(view)
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
