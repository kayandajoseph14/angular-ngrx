import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CounterComponent} from "./counter.component";
import {CommonModule} from "@angular/common";
import {CounterValueComponent} from "./counter-value/counter-value.component";
import {CounterButtonComponent} from "./counter-button/counter-button.component";
import {CustomInputComponent} from "./custom-input/custom-input.component";
import {FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./states/counter.reducer";
import {COUNTER_STATE} from "../constants";

const routes: Routes = [
  { path: '', component: CounterComponent },
]
@NgModule({
  declarations: [
    CounterComponent,
    CounterValueComponent,
    CounterButtonComponent,
    CustomInputComponent,
  ],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE, counterReducer)
  ],
  exports: []
})
export class CounterModule {}
