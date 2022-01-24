import {createAction, props} from "@ngrx/store";
import {User} from "../../model/User";

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User }>())
