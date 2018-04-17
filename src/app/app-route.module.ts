import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './system/login/login.component';
import {NofoundComponent} from './common/nofound/nofound.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: '**', component: NofoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
