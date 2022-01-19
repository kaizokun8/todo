import {createAction, props} from "@ngrx/store";
import {Notification} from "../../model/Notification";

export const setNotificationList = createAction(
  '[Notification List] Set Notifications',
  props<{ notifications: ReadonlyArray<Notification> }>())
