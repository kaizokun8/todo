import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {setUser} from "./store/user/user.actions";
import {selectUser} from "./selectors/user.selector";
import {UserStoreState} from "./store/user/user.reducer";
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router, RouterEvent
} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "./model/User";
import {AppState} from "./store/app/app.reducer";
import {selectApp} from "./selectors/app.selector";
import {setNotificationList} from "./store/notification/notification.actions";
import {setLoading} from "./store/app/app.actions";
import {RouterUtil} from "./util/RouterUtil";

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userState$: Observable<UserStoreState> = this.store.select(selectUser);

  appState$: Observable<AppState> = this.store.select(selectApp);

  title!: string;

  //loading: boolean = false;

  clientUrl!: string;

  dateParams: { [k: string]: any } = {};

  userConnected!: User | null | undefined;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {

    this.clientUrl = environment.clientServer;

    //this.appState$.subscribe((appState) => this.loading = appState.loading)

    this.userService.getUserConnected().subscribe((user) =>
      this.store.dispatch(setUser({user})));

    this.userState$.subscribe((userState) => this.userConnected = userState.user)

    this.route.queryParamMap.subscribe((params) => {

      this.dateParams = {};

      if (params.has('startTime')) {
        this.dateParams['startTime'] = params.get('startTime');
      }
      if (params.has('endTime')) {
        this.dateParams['endTime'] = params.get('endTime');
      }
    });

    this.router.events.subscribe((event) => {

      let routerEvent: RouterEvent = (event as RouterEvent);

      if (!RouterUtil.urlContains(
        routerEvent.url, '/todos/id', '/todos/form/edit')) {
        return;
      }

      if (routerEvent instanceof NavigationStart) {

        this.store.dispatch(setLoading({loading: true}))

      } else if (

        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationEnd) {
        this.store.dispatch(setLoading({loading: false}))
      }
    })
  }

}
