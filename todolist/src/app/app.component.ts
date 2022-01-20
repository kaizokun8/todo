import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectNotifications} from "./notifications.selector";
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Notification} from "./model/Notification";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  notifications$: Observable<readonly Notification[]> = this.store.select(selectNotifications);

  dateParams: { [k: string]: any } = {};

  constructor(private store: Store, private messageService: MessageService, private route: ActivatedRoute) {

    route.queryParamMap.subscribe((params) => {

      this.dateParams = {};

      if (params.has('startTime')) {
        this.dateParams['startTime'] = params.get('startTime');
      }
      if (params.has('endTime')) {
        this.dateParams['endTime'] = params.get('endTime');
      }
    })

    this.notifications$.subscribe((notifications: readonly Notification[]) => {

      this.messageService.addAll(notifications.map((n) => ({
        severity: n.severity,
        summary: n.summary,
        detail: n.detail
      })));
    })
  }

}
