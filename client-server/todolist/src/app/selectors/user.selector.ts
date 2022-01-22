import {createFeatureSelector} from "@ngrx/store";
import {User} from "../model/User";

export const selectUser = createFeatureSelector<User>('user');
