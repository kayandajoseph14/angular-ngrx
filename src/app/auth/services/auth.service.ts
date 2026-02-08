import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FIRE_BASE_API_KEY} from "../../constants";
import {User} from "../../models/user.model";
import {AuthResponse} from "../../models/auth-response.model";
import {Observable} from "rxjs";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {logout} from "../states/auth.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  private logoutTimer: any;

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIRE_BASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http.post<AuthResponse>(url, body);
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIRE_BASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http.post<AuthResponse>(url, body);
  }

  getErrorMessage(errorResponse: HttpErrorResponse){
    let message = 'An unknown error has occured.';

    if(!errorResponse.error || !errorResponse.error.error){
      console.log(errorResponse);
      return message;
    }
    switch(errorResponse.error.error.message){
      case 'INVALID_LOGIN_CREDENTIALS':
        message='The email or Password is incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        message = 'This password is not correct.';
        break;
      case 'USER_DISABLED':
        message = 'This user has been disabled.';
        break;
      case 'EMAIL_EXISTS':
        message = 'A User with the given email already exists.';
        break;
      default:
        message = errorResponse.error.error.message
    }

    return message;
  }

  formatUserData(response: AuthResponse){
    const formattedUserData: User = {
      email: response.email,
      accessToken: response.idToken,
      expiresAt: Date.now() + (+response.expiresIn * 1000),
      userId: response.localId
    }
    return formattedUserData;
  }

  saveUserInLocalStorage(user: User){
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.autoLogout(user);
    }
    catch (error) {
      console.log("Failed to save user in localstorage", error)
    }
  }

  readUserFromLocalStorage(){
    try {
      const loggedUser = localStorage.getItem('user');
      if (!loggedUser) {
        return null;
      }

      const user: User = JSON.parse(loggedUser);

      if (user.expiresAt <= Date.now()) {
        localStorage.removeItem('user');
        return null;
      }

      return user;

    }catch (e) {
      localStorage.removeItem('user');
      console.log("Failed to read user from localstorage", e)
      return null;
    }
  }

  logout(){
    localStorage.removeItem('user');
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }

  autoLogout(user: User){
    const interval = user.expiresAt - Date.now();
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(logout())
    }, interval);
  }
}
