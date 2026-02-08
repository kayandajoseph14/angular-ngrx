import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {autoLogin, loginStart, loginSuccess, logout, signupStart, signupSuccess} from "./auth.action";
import {catchError, EMPTY, exhaustMap, map, mergeMap, of, tap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setErrorMessage, setIsLoading} from "../../shared/shared.action";

@Injectable()
export class AuthEffects{
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({value: true}))
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({value: false}))
            const loggedUser = this.authService.formatUserData(data);
            this.authService.saveUserInLocalStorage(loggedUser);
            return loginSuccess({user: loggedUser, redirect: true})
          }),

          catchError((errorResponse) => {
            console.log(errorResponse.error.error.message)
            this.store.dispatch(setIsLoading({value: false}))
            const errorMessage = this.authService.getErrorMessage(errorResponse)
            return of(setErrorMessage({value: errorMessage}))
          })
        )
      })
    )
  })

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({value: true}))
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({value: false}))
            const signedUpUser = this.authService.formatUserData(data);
            this.authService.saveUserInLocalStorage(signedUpUser);
            return signupSuccess({user: signedUpUser, redirect: true})
          }),

          catchError((errorResponse) => {
            console.log(errorResponse.error.error.message)
            this.store.dispatch(setIsLoading({value: false}))
            const errorMessage = this.authService.getErrorMessage(errorResponse)
            return of(setErrorMessage({value: errorMessage}))
          })
        )
      })
    )
  })

  redirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess, signupSuccess),
      tap(action => {
        if(action.redirect){
          this.router.navigate(['/'])
        }
      })
    )
  }, {dispatch: false})

  autoLogin$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.readUserFromLocalStorage();
        if(user){
          return of(loginSuccess({user : user, redirect: false}))
        }
        return EMPTY;
      })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.authService.logout();
        //this.router.navigateByUrl('/auth/login')
        this.router.navigate(['auth', 'login'], { queryParams : { reason : 'expired' }});
      })
    )
  }, {dispatch: false})

}
