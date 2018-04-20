import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './system/login/login.component';
import {AppRouteModule} from './app-route.module';
import {NofoundComponent} from './common/nofound/nofound.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './system/service/login.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardService} from './mainpage/service/auth-guard.service';
import {AuthService} from './mainpage/service/auth.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './InMemoryDataService';
import {MessageService} from './message.service';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NofoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),

    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    CookieService,
    AuthGuardService,
    FormBuilder,
    LoginService,
    MessageService,
  ],
  exports: [
    ReactiveFormsModule,
  ]
})
export class AppModule { }
