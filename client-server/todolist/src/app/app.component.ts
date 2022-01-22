import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Notification} from "./model/Notification";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../services/client.service";
import {environment} from "../environments/environment";
import {selectNotifications} from "./selectors/notifications.selector";
import {UserService} from "../services/user.service";
import {Oauth2Service} from "../services/oauth2.service";
import {setUser} from "./store/user/user.actions";
import {selectUser} from "./selectors/user.selector";
import {UserStoreState} from "./store/user/user.reducer";

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

  userState$: Observable<UserStoreState> = this.store.select(selectUser);

  userConnected: boolean = false;

  constructor(private store: Store,
              private clientService: ClientService,
              private oauth2Service: Oauth2Service,
              private userService: UserService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {

    this.loginUrl = environment.clientServer;

    this.clientService.getUser()
      .subscribe((user) => this.store.dispatch(setUser({user})))

    this.userState$.subscribe((u) =>
      this.userConnected = u.user != null && u.user != undefined)

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
