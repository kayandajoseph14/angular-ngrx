import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const loginStart = createAction('[auth] login start', props<{email: string, password: string}>());
export const loginSuccess = createAction('[auth] login success', props<{user: User, redirect: boolean}>());
export const loginFailure = createAction('[auth] login failure', props<{error: string}>());
export const logout = createAction('[auth] logout');

export const signupStart = createAction('[auth] signup start', props<{email: string, password: string}>());
export const signupSuccess = createAction('[auth] signup success', props<{user: User, redirect: boolean}>());
export const signupFailure = createAction('[auth] signup failure', props<{error: string}>());

export const autoLogin = createAction('[auth] auto login');

