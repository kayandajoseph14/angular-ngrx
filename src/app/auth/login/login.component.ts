import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../../models/user.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {loginStart} from "../states/auth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  loginForm!: FormGroup;
  loggedInUser!: User;

    ngOnInit(){
      this.loginForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(null, [
          Validators.required
        ])
      });
    }

    onLogin() {
      //console.log(this.loginForm.value);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      // this.authService.login(email, password).subscribe((response) => {
      //   this.loggedInUser = response;
      // })

      this.store.dispatch(loginStart({email, password}));

    }

  showEmailValidationErrors(){
      const emailControl = this.loginForm.get('email');
      if (emailControl?.touched && !emailControl?.valid) {
        if (emailControl.errors?.['required']) {
          return 'Email is required';
        }
        if (emailControl.errors?.['email']) {
          return 'Email is invalid';
        }
      }
      return '';
    }

  showPasswordValidationErrors(){
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched && !passwordControl?.valid) {
      if (passwordControl.errors?.['required']) {
        return 'Password is required';
      }
    }
    return '';
  }


}
