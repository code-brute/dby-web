import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ContentComponent} from './content/content.component';
import {IndexComponent} from './index/index.component';
import {MainpageRouteModule} from './mainpage-route';

@NgModule({
  imports: [
    MainpageRouteModule
  ],
  declarations: [SideBarComponent, ContentComponent, IndexComponent],
  exports: []
})
export class MainpageModule { }
