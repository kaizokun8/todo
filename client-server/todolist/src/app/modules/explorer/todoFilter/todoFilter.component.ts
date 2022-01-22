/**
 * Created by jbe on 14/01/2022
 */

import {Component} from '@angular/core';
import {TodoService} from "../../../../services/todo.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {Priorities, Priority, PriorityLabels} from "../../../model/Priority";
import {TodoFilters} from "../../../dto/TodoFilters";

@Component({
  selector: 'todoFilter',
  templateUrl: './todoFilter.component.html',
  styleUrls: ['./todoFilter.component.css']
})

export class TodoFilterComponent {

  formFilter!: FormGroup

  priorities: Array<Priority> = Priorities;

  static endDateGreaterThanStartDate(group: AbstractControl): ValidationErrors | null {

    const start: Date = group.get("startDate")!.value;
    const end: Date = group.get("endDate")!.value;
    const scheduled: Date = group.get("scheduled")!.value;
    return scheduled && start && end && end?.getTime() <= start?.getTime() ? {startGreaterThanEnd: true} : null;
  }

  static endCreationDateGreaterThanStartCreationDate(group: AbstractControl): ValidationErrors | null {
    const start: Date = group.get("startCreationDate")!.value;
    const end: Date = group.get("endCreationDate")!.value;
    return start && end && end?.getTime() <= start?.getTime() ? {startGreaterThanEnd: true} : null;
  }

  getDateFromTimeParam(params: ParamMap, key: string): Date | null {

    if (params.has(key)) {
      let startTime = Number.parseInt(params.get(key)!);
      if (!Number.isNaN(startTime)) {
        return new Date(startTime);
      }
    }

    return null;
  }

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {

    this.formFilter = fb.group({
      title: '',
      description: '',
      priority: [],
      done: '',
      dateRange: fb.group({
        scheduled: true,
        startDate: null,
        endDate: null,
      }, {
        validators: [
          TodoFilterComponent.endDateGreaterThanStartDate]
      }),
      creationDateRange: fb.group({
        startCreationDate: null,
        endCreationDate: null,
      }, {
        validators: [
          TodoFilterComponent.endCreationDateGreaterThanStartCreationDate]
      })
    })

    route.queryParamMap.subscribe((params) => {

      this.formFilter.get('title')?.setValue(params.has('title') ? params.get('title') : '');
      this.formFilter.get('description')?.setValue(params.has('description') ? params.get('description') : '');
      this.formFilter.get('priority')?.setValue(params.has('priority') ? params.getAll('priority') : []);
      this.formFilter.get('done')?.setValue(params.has('done') ? params.get('done') === 'true' : 'false')
      let dateRangeGroup = this.formFilter.get('dateRange');
      dateRangeGroup?.get('scheduled')?.setValue(params.has('scheduled') ? params.get('scheduled') === 'true' : 'false');
      dateRangeGroup?.get('startDate')?.setValue(this.getDateFromTimeParam(params, 'startTime'));
      dateRangeGroup?.get('endDate')?.setValue(this.getDateFromTimeParam(params, 'endTime'));
      let creationDateRangeGroup = this.formFilter.get('creationDateRange');
      creationDateRangeGroup?.get('startCreationDate')?.setValue(this.getDateFromTimeParam(params, 'startCreationTime'));
      creationDateRangeGroup?.get('endCreationDate')?.setValue(this.getDateFromTimeParam(params, 'endCreationTime'));
    })

  }

  priorityLabel(priority: Priority) {

    return PriorityLabels[priority];
  }

  isRangeInvalid() {
    return this.formFilter.get('dateRange')?.invalid;
  }

  isCreationRangeInvalid() {
    return this.formFilter.get('creationDateRange')?.invalid;
  }

  getDateRangeErrorMessages() {

    let dateRange = this.formFilter.get('dateRange');

    let errorMessages = [];

    if (dateRange?.hasError('startGreaterThanEnd')) {
      errorMessages.push('The start date is greater or equal to the end date');
    }
    return errorMessages;
  }

  getCreationDateRangeErrorMessages() {

    let dateRange = this.formFilter.get('creationDateRange');

    let errorMessages = [];

    if (dateRange?.hasError('startGreaterThanEnd')) {
      errorMessages.push('The start date is greater or equal to the end date');
    }
    return errorMessages;
  }

  filter() {

    let filters: TodoFilters = new TodoFilters();

    filters.title = this.formFilter.value.title;
    filters.priority = this.formFilter.value.priority;
    filters.description = this.formFilter.value.description;
    filters.done = this.formFilter.value.done;
    filters.scheduled = this.formFilter.value.dateRange.scheduled;
    filters.startTime = this.formFilter.value.dateRange.startDate?.getTime();
    filters.endTime = this.formFilter.value.dateRange.endDate?.getTime();
    filters.startCreationTime = this.formFilter.value.creationDateRange.startCreationDate?.getTime();
    filters.endCreationTime = this.formFilter.value.creationDateRange.endCreationDate?.getTime();
    filters.page = 0;
    filters.pageSize = 10;
    console.log("FILTER====")
    console.log(this.formFilter.value);
    console.log(filters)

    this.router.navigate(["/todos/filter"], {queryParams: filters, queryParamsHandling: 'merge'});

  }
}
