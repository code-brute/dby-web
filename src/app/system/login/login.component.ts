import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../common/component/BaseComponent';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {


  name: any;
  pwd: any;
  constructor(private fb: FormBuilder,
              protected router: Router,
  ) {
    super(router);
  }

  ngOnInit() {
    console.log('登陆页面启动');
    this.init();
    this.initData();
  }

  init() {
    this.formConfig = {
      name: [, Validators.required, , {label: '用户名', placeholder: '请输入用户名'}],
      pwd: [, Validators.required, , {label: ' 密  码 ', placeholder: '请输入密码'}]
    };

    this.formGroup = this.fb.group(this.formConfig);
  }

  initData() {
    this.formGroup.get('name').valueChanges.subscribe(name => {
      if (name) {
        this.name = name;
        this.check();
      }
    });

    this.formGroup.get('pwd').valueChanges.subscribe(pwd => {
      if (pwd) {
        this.pwd = pwd;
        this.check();
      }
    });
  }

  check() {
   // console.log('name--', this.name, 'pwd--', this.pwd);
    if (this.pwd && this.name ) {
      this.formDisable = false;
    }else {
      this.formDisable = true;
    }

  }

  get fc() {
    return Object.keys(this.formConfig);
  }

  login() {
    if (this.formGroup.valid) {
      console.log('name: ', this.formGroup.get('name').value, 'pwd: ', this.formGroup.get('pwd').value);
    }else {
      console.log('请填写表单');
    }
  }

}
