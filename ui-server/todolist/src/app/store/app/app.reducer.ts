import {createReducer, on} from "@ngrx/store";
import {setLoading} from "./app.actions";

export interface AppState {
  loading: boolean;
}

export const initialState: AppState = {loading: false};

export const appReducer = createReducer(
  initialState,
  on(setLoading, (state, {loading}) => ({...state, loading: loading}))
);
