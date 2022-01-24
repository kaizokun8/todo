import {createFeatureSelector} from "@ngrx/store";
import {AppState} from "../store/app/app.reducer";

export const selectApp = createFeatureSelector<AppState>('app');
