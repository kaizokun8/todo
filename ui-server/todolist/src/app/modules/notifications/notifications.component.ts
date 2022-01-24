/**
 * Created by jbe on 23/01/2022
 */

import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Notification} from "../../model/Notification";
import {selectNotifications} from "../../selectors/notifications.selector";
import {MessageService} from "primeng/api";

@Component({
  selector: 'notifications-toast',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent {

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
