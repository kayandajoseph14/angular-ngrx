import {counterReducer} from "../counter/states/counter.reducer";
import {coursesReducer} from "../courses/states/courses.reducer";
import {CounterState} from "../counter/states/counter.state";
import {CoursesState} from "../courses/states/courses.state";
import {AuthState} from "../auth/states/auth.state";
import {authReducer} from "../auth/states/auth.reducer";
import {AUTH_STATE, COUNTER_STATE, COURSES_STATE, SHARED_STATE} from "../constants";
import {SharedState} from "../shared/shared.state";
import {sharedReducer} from "../shared/shared.reducer";

export interface AppState {
  [AUTH_STATE]: AuthState,
  [COUNTER_STATE]: CounterState,
  [COURSES_STATE]: CoursesState,
  [SHARED_STATE]: SharedState
}
export const appReducer = {
  [AUTH_STATE]: authReducer,
  [COUNTER_STATE]: counterReducer,
  [COURSES_STATE]: coursesReducer,
  [SHARED_STATE]: sharedReducer
}
