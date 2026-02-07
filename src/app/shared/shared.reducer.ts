import {createReducer, on} from "@ngrx/store";
import {initialState} from "./shared.state";
import {setErrorMessage, setIsLoading} from "./shared.action";

export const sharedReducer = createReducer(
  initialState,
  on(setIsLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.value
    }
  }),

  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.value
    }
  })

)
