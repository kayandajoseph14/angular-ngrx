import {Component, OnInit} from '@angular/core';
import {AppState} from "../store/app.state";
import {Store} from "@ngrx/store";
import {getLoggedUser} from "../auth/states/auth.selector";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {logout} from "../auth/states/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) {}

  loggedUser$!: Observable<User | null>;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(getLoggedUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
