import {createFeatureSelector} from '@ngrx/store';
import {Notification} from "../model/Notification";

export const selectNotifications = createFeatureSelector<ReadonlyArray<Notification>>('notifications');

