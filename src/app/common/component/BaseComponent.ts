import {Router} from '@angular/router';
import {OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


export class BaseComponent implements OnDestroy{
  formConfig: any;
  formGroup: FormGroup;
  columns: any;
  rows: any;
  formDisable = true;

  constructor(protected router: Router) {

  }

  ngOnDestroy() {
    if (this['modalService']) {
      this['modalService'].hideAll();
    }
  }

}
