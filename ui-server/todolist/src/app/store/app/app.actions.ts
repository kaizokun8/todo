import {createAction, props} from "@ngrx/store";

export const setLoading = createAction(
  '[Loading Boolean] Set Loading',
  props<{ loading: boolean }>())
