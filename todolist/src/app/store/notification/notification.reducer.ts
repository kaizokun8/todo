import {createReducer, on} from "@ngrx/store";
import {setNotificationList} from "./notification.actions";
import {Notification} from "../../model/Notification";

export const initialState: ReadonlyArray<Notification> = [];

export const notificationReducer = createReducer(
  initialState,
  on(setNotificationList, (state, {notifications}) => notifications)
);
