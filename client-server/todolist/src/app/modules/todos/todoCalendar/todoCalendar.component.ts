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

export class TodoCalendarComponent {

  selectedDate: Date | null = new Date();

  viewType: string = LIST;

  highLightedDates: Set<number> = new Set<number>();

  display = false;

  startDate: any;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe((params) => this.viewType = params.get('view') ?? LIST);

    //premier appel à la methode onMonthSelect afin de charger les jours ayant une tache pour le moi courant
    this.onMonthSelected(this.selectedDate);
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
    this.router.navigate(['/todos/list/'], {
      queryParams: {
        startTime: startTime,
        endTime: endTime,
        scheduled: true,
        view: this.viewType
      }
    })

    this.selectedDate = date;
  }

  /**
   * Lors de la selection du mois les dates comportant une tache sont chargées,
   * afin de mettre en évidence dans le calendrier celles qui possedent une tache.
   * Le probleme c'est que l'appel à la methode dateClass est apellée avant que la réponse http ne soit obtenue.
   * Il faut donc forcer le calendrier à se recharger uen fois la reponse obtenue,
   * en le masquant avant l'appel service et en le réaffichant une fois la reponse obtenue.
   * Il faut également initialiser startDate avec la date du mois sans quoi le composant
   * se remet sur l'année et le mois courant
   * ainsi que selectedDate pour selectionner le premier jour du mois.
   * */
  onMonthSelected(month: Date | null) {

    this.display = false;

    this.todoService.getScheduledDaysOfMonthAndYears(month?.getMonth(), month?.getFullYear())
      .subscribe((scheduledDays: Array<number>) => {

        this.highLightedDates = new Set(scheduledDays);
        this.startDate = month;
        this.selectedDate = month;
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
