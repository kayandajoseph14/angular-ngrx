import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AUTH_STATE} from "../../constants";
import {AuthState} from "./auth.state";

const selectAuthFeature = createFeatureSelector<AuthState>(AUTH_STATE)
export const getLoggedUser = createSelector(
  selectAuthFeature,
  (state) => {
    return state.user
})

