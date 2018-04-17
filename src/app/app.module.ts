import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './system/login/login.component';
import {AppRouteModule} from './app-route.module';
import {NofoundComponent} from './common/nofound/nofound.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NofoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    FormBuilder,
  ],
  exports: [
    ReactiveFormsModule,
  ]
})
export class AppModule { }
