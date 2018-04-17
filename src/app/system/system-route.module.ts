import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {FormBuilder} from '@angular/forms';

const systemRouters: Routes = [
  {}
];

@NgModule({
  imports: [
    RouterModule.forChild(systemRouters)
  ],
  exports: [
    RouterModule
  ],

})
export class SystemRouteModule { }
