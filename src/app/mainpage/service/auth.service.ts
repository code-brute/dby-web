import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {delay} from 'rxjs/operator/delay';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {MessageService} from '../../message.service';
import {$HttpService} from '../../common/service/http.service';

class $CacheStorage {
  $$storage = {};
  length: number;

  clear() {
    this.$$storage = {};
  }

  getItem(key: string): any {
    return this.$$storage[key];
  }

  setItem(key: string, data: any) {
    this.$$storage[key] = data;
  }

  removeItem(key: string) {
  }
}

@Injectable()
export class AuthService extends $HttpService {

  userUrl = 'api/user';

  isLoggedIn = false;
  private redirectedUrl = '/';
  loginEvent: EventEmitter<any> = new EventEmitter();

  private $$token: string = Md5.hashStr('token').toString();
  private $$authStorage: $CacheStorage = new $CacheStorage();


  constructor(protected http: HttpClient,
              private messageService: MessageService,
              ) {
    super(http);
  }

  authenticate() {
    console.log('authServie---authenicate', sessionStorage.getItem(this.$$token));
    return sessionStorage.getItem(this.$$token);
  }

/*  login(name: string, pwd: string) {
   // const data = 'username=' + name + '&password=' + pwd + '&rememberMe=true';
    const data = {id: pwd, name: name};
    const url = 'api/login';
    return this.http.post(this.userUrl, data,
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).catch(error => {
      console.log('post 请求异常', error);
      return Observable.throw(error);
    }).map(response => {
      console.log('---response', response);
      if (200 === response['code']) {
        this.isLoggedIn = true;
        sessionStorage.setItem(this.$$token, Md5.hashStr(response['data']['sessionId']).toString());
        sessionStorage.setItem('currentUser', JSON.stringify(response['data']['sysUser']));
        return response['data'];
      } else {
        return Observable.throw(response);
      }
    });
  }*/

    login(name: string, pwd: string) {
     // const data = 'username=' + name + '&password=' + pwd + '&rememberMe=true';
      const data = {id: pwd, name: name};
      const url = 'api/user/' + pwd;
      return this.http.get(url,
        {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).catch(error => {
        console.log('post 请求异常', error);
        return Observable.throw(error);
      }).map(response => {
        console.log('---response', response);
        if (200 === response['code']) {
          this.isLoggedIn = true;
          sessionStorage.setItem(this.$$token, Md5.hashStr(response['data']['sessionId']).toString());
          sessionStorage.setItem('currentUser', JSON.stringify(response['data']['sysUser']));
          return response['data'];
        } else {
          return Observable.throw(response);
        }
      });
    }



  logout() {
    this.http.post('/api/logout', {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}).catch(error => {
      console.log('退出登陆发生异常', error);
      return Observable.throw(error);
    }).map(response => {
      if (200 === response['code']) {
        this.isLoggedIn = false;
        this.$$authStorage.clear();
        sessionStorage.clear();
        return response['data'];
      }else {
        return Observable.throw(response);
      }
    });
  }

  setRedirectedUrl(url: string) {
    this.redirectedUrl = url;
  }

  getRedirectedUrl(): string {
    return this.redirectedUrl;
  }

  clear() {
    sessionStorage.clear();
    this.$$authStorage.clear();
  }

}
