import {Notification} from "./model/Notification";

export interface AppState{
  notifications : ReadonlyArray<Notification>
}
