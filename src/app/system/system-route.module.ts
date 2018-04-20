import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

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
