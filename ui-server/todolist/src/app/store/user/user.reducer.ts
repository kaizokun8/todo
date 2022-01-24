import {createReducer, on} from "@ngrx/store";
import {setUser} from "./user.actions";
import {User} from "../../model/User";

export interface UserStoreState {
  user: User | null | undefined,
  parameters: { [key: string]: string | number | boolean }
}

export const initialState: UserStoreState = {user: null, parameters: {}};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user: user}))
);
