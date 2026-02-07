import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {signupStart} from "../states/auth.action";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ])
    });
  }

  showEmailValidationError(){
    const emailControl = this.signUpForm.get('email');
    if(emailControl?.touched && !emailControl?.valid) {
      if (emailControl.errors?.['required']){
        return 'Email is required'
      }

      if (emailControl.errors?.['email']) {
        return 'Email is invalid';
      }
    }

    return '';
  }

  showPasswordValidationError(){
    const passwordControl = this.signUpForm.get('password');
    if(passwordControl?.touched && !passwordControl?.valid) {
      if (passwordControl.errors?.['required']){
        return 'Password is required'
      }

      if (passwordControl.errors?.['minlength']) {
        return 'Password must be at least 6 characters';
      }

      if (passwordControl.errors?.['pattern']) {
        return 'Password must contain at least one uppercase letter, one lowercase letter and one number';
      }
    }

    return '';
  }

  onSignup() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.store.dispatch(signupStart({email, password}));
  }

}
