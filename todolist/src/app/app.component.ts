import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectNotifications} from "./notifications.selector";
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Notification} from "./model/Notification";

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  notifications$: Observable<readonly Notification[]> = this.store.select(selectNotifications);

  constructor(private store: Store, private messageService: MessageService) {

    this.notifications$.subscribe((notifications: readonly Notification[]) => {

      this.messageService.addAll(notifications.map((n) => ({
        severity: n.severity,
        summary: n.summary,
        detail: n.detail
      })));
    })
  }

}
