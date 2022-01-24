import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {setUser} from "./store/user/user.actions";
import {selectUser} from "./selectors/user.selector";
import {UserStoreState} from "./store/user/user.reducer";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "./model/User";

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title!: string

  userState$: Observable<UserStoreState> = this.store.select(selectUser);

  clientUrl!: string

  dateParams: { [k: string]: any } = {};

  userConnected!: User | null | undefined;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private userService: UserService) {

    this.clientUrl = environment.clientServer;

    this.userService.getUserConnected().subscribe((user) =>
      this.store.dispatch(setUser({user})));

    this.userState$.subscribe((userState) => this.userConnected = userState.user)

    route.queryParamMap.subscribe((params) => {

      this.dateParams = {};

      if (params.has('startTime')) {
        this.dateParams['startTime'] = params.get('startTime');
      }
      if (params.has('endTime')) {
        this.dateParams['endTime'] = params.get('endTime');
      }
    })
  }

}
