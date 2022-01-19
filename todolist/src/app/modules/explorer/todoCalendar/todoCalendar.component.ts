/**
 * Created by jbe on 19/01/2022
 */

import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LIST} from "../../../../shared/View";
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";

@Component({
  selector: 'todoCalendar',
  templateUrl: './todoCalendar.component.html',
  styleUrls: ['./todoCalendar.component.css']
})

export class TodoCalendarComponent implements OnInit {

  selectedDate: Date | null = new Date();

  viewType: string = LIST;

  highLightedDates: Set<number> = new Set<number>();

  display = false;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe((params) => this.viewType = params.get('view') ?? LIST);

    this.onMonthSelected(this.selectedDate);
  }

  ngOnInit(): void {

    console.log("ON INIT")
  }

  onSelectChange(date: Date | null) {
    date?.setHours(0);
    date?.setMinutes(0);
    date?.setSeconds(0);
    date?.setMilliseconds(0);
    let startTime = date?.getTime() ?? new Date().getTime();
    date?.setHours(23);
    date?.setMinutes(59);
    date?.setSeconds(59);
    date?.setMilliseconds(999);
    let endTime = date?.getTime() ?? new Date().getTime();
    this.router.navigate(['/todos'], {
      queryParams: {
        startTime: startTime,
        endTime: endTime,
        scheduled: true,
        view: this.viewType
      }
    })

    this.selectedDate = date;
  }

  onMonthSelected(month: Date | null) {
    /*
    * récuperer le timestamp du premier jor du mois et celui du dernier
    * recuperer toutes les taches programmées dont le timestamp de départ ce situe entre les deux
    * extraire du timestamp de depart le jour du mois, et retourner la liste des jours du mois de manière distincts
    * */

    //let d = new Date(month?.getFullYear(), month?.getMonth(),0).getDate();
    this.display = false;
    this.todoService.getScheduledDaysOfMonthAndYears(month?.getMonth(), month?.getFullYear())
      .subscribe((scheduledDays: Array<number>) => {
        this.highLightedDates = new Set(scheduledDays);
        this.display = true;
      })
  }

  onYearSelected(year: Date) {

  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    // Only highlight dates inside the month view.
    if (view === 'month') {

      if (this.highLightedDates.has(cellDate.getDate())) {
        return 'highlighted-date';
      }
    }

    return '';
  };
}
