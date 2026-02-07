import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule} from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import {appReducer} from "./store/app.state";
import { LoaderComponent } from './loader/loader.component';
import { ToasterComponent } from './toaster/toaster.component';
import {AuthEffects} from "./auth/states/auth.effects";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
