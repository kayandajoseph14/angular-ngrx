import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {setErrorMessage} from "../shared/shared.action";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit{

  constructor(
    private store: Store<AppState>
  ) {}
  @Input() errorMessage: string | null = null;

  ngOnInit(): void {
    setTimeout(()=>{
      return this.store.dispatch(setErrorMessage({ value: ''}));
    }, 3000);
  }
}
