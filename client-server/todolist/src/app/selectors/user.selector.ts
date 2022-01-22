import {createFeatureSelector} from "@ngrx/store";
import {UserStoreState} from "../store/user/user.reducer";

export const selectUser = createFeatureSelector<UserStoreState>('user');
