import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Notification} from "./model/Notification";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../services/client.service";
import {environment} from "../environments/environment";
import {selectNotifications} from "./selectors/notifications.selector";
import {UserService} from "../services/user.service";
import {Oauth2Service} from "../services/oauth2.service";

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  notifications$: Observable<readonly Notification[]> = this.store.select(selectNotifications);

  dateParams: { [k: string]: any } = {};

  loginUrl!: string

  title!: string

  constructor(private store: Store,
              private clientService: ClientService,
              private oauth2Service: Oauth2Service,
              private userService: UserService,
              private messageService: MessageService,
              private route: ActivatedRoute) {

    this.loginUrl = environment.clientServer;


    this.oauth2Service.getUserInfo().subscribe(user => {
      console.log("user oauth2")
      console.log(user)
    })


    this.clientService.getUser().subscribe(user => {
      console.log("user client")
      console.log(user)
    })

    this.userService.getUser().subscribe((user) => {
      console.log("user rsc")
      console.log(user)
    })

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
