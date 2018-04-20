import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ContentComponent} from './content/content.component';

const mainpageRoutes: Routes = [
  {path: '', component: IndexComponent,
    children: [
      {path: '', component: ContentComponent}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainpageRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class MainpageRouteModule { }
