import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './system/login/login.component';
import {NofoundComponent} from './common/nofound/nofound.component';
import {AuthGuardService} from './mainpage/service/auth-guard.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    loadChildren: 'app/mainpage/mainpage.module#MainpageModule'
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: NofoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],

  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
