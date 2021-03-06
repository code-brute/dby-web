import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  loginUrl = '';
  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(this.loginUrl, data);
  }
}
