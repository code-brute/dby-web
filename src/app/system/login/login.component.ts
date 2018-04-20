import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../common/component/BaseComponent';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../mainpage/service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {


  name: any;
  pwd: any;
  model = {};
  constructor(private fb: FormBuilder,
              protected router: Router,
              private toastr: ToastrService,
              private service: AuthService,
              private cookieService: CookieService,
              private authService: AuthService,
  ) {
    super(router);
  }

  ngOnInit() {
    console.log('登陆页面启动');
    this.init();
    this.initData();
    this.initModel();
    this.authService.clear();
  }

  init() {
    this.formConfig = {
      name: [, Validators.required, , {label: '用户名', placeholder: '请输入用户名', type: 'text'}],
      pwd: [, Validators.required, , {label: ' 密  码 ', placeholder: '请输入密码', type: 'password'}]
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

  initModel() {
    if (this.cookieService.check(Md5.hashStr('name').toString())) {
      this.model['name'] = this.decode(this.cookieService.get(Md5.hashStr('name').toString()));
    }
    if (this.cookieService.check(Md5.hashStr('pwd').toString())) {
      this.model['pwd'] = this.decode(this.cookieService.get(Md5.hashStr('pwd').toString()));
    }
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
/*
      this.service.login(this.formGroup.value.name, Md5.hashStr(this.formGroup.value.pwd).toString()).subscribe(data => {   // 密码加密，测试完成后使用
*/
      this.service.login(this.formGroup.value.name, this.formGroup.value.pwd).subscribe(data => {  // 未加密密码，测试用
        if (data) {
          const username = this.decode(this.cookieService.get(Md5.hashStr('name').toString()));
          if (username && username !== this.model['name']) {
            this.cookieService.deleteAll();
          }
          this.service.loginEvent.emit('success');
          this.router.navigate([this.service.getRedirectedUrl()]);
        }

      }, error1 => {
        if (error1['error'] && error1['error']['msg']) {
          this.toastr.error(error1['error']['msg'], '提示信息');
        }else {
          this.toastr.error('用户名或密码错误，登陆失败', '提示信息');
        }
        });
    }else {
      console.log('请填写表单');
    }
  }

  utf8Decode(data) {
    let string = '';
    let i = 0;
    let c, c2 = 0;
    while (i < data.length) {
      c = data.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }else if ((c > 191) && (c < 224)) {
        c2 = data.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }else {
        c2 = data.charCodeAt(i + 1);
        const c3 = data.charCodeAt(i += 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }

  decode(data) {
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    data = data.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i< data.length) {
      enc1 = _keyStr.indexOf(data.charAt(i++));
      enc2 = _keyStr.indexOf(data.charAt(i++));
      enc3 = _keyStr.indexOf(data.charAt(i++));
      enc4 = _keyStr.indexOf(data.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output += String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }
    output = this.utf8Decode(output);
    return output;

  }

}
