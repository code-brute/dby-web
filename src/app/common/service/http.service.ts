import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Observable as BObservable} from 'rxjs/Rx';
import {BaseService} from './base.service';

/**
 * HTTP基类，封装基本的HTTP方法，不作为业务服务的父类
 */
export class $HttpService extends BaseService {
    constructor(protected http: HttpClient) {
        super();
    }

    /**
     * 查询请求
     * @param {string} url
     * @returns {Observable<any>}
     */
    get(url: string, options = {}) {
        return this.http.get(url, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set("If-Modified-Since","0")
        }).catch(error => {
            console.error('HTTP Get请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }

    /**
     * 当查询的字段过多时，参数直接封装成对象放在body中，采用post请求
     * @param {string} url
     * @param body
     * @returns {Observable<any>}
     */
    getInBody(url: string, body: any) {
        return this.http.post(url, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).catch(error => {
            console.error('HTTP Get多参数（使用Post）请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }

    /**
     * 新增请求，参数放在body中
     * @param {string} url
     * @param body
     * @returns {Observable<any>}
     */
    post(url: string, body) {
        return this.http.post(url, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).catch(error => {
            console.error('HTTP Post请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }

    /**
     * 更新请求，参数放在body中
     * @param {string} url
     * @param body
     * @returns {Observable<any>}
     */
    put(url: string, body) {
        return this.http.put(url, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).catch(error => {
            console.error('HTTP Put请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }

    /**
     * 修改字段少，参数直接加在url中，特殊场景
     * @param {string} url
     * @returns {Observable<any>}
     */
    putNoBody(url: string) {
        return this.http.put(url, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).catch(error => {
            console.error('HTTP Put（参数url中）请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }

    /**
     * 删除请求（批量删除时所有主键用'，'隔开拼成字符传后台）
     * @param {string} url
     * @param {string} id
     * @returns {Observable<any>}
     */
    delete(url: string, id: any) {
        return this.http.delete(url, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            params: new HttpParams().set('id', id)

        }).catch(error => {
            console.error('HTTP Delete请求异常：', error);
            return Observable.throw(error);
        }).map(response => {
            if (200 === response['code']) {
                return response['data'];
            } else {
                return Observable.throw(response);
            }
        });
    }
}

/**
 * 基类service封装，所有业务服务的父类
 */
@Injectable()
export class HttpService extends $HttpService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    get(url: string, options = {}) {
        if (options['cache-name'] && sessionStorage.getItem(options['cache-name']) && options !== {}) {
            return this.mock(sessionStorage.getItem(options['cache-name']));
        }
        return super.get(url).map(data => {
            if (options['cache-name']) {
                sessionStorage.setItem(options['cache-name'], JSON.stringify(data));
            }
            return data;
        });
    }

    /**
     * 将查询对象拼装为URL字符串
     * @param query
     * @returns {string}
     */
    query2params(query) {
        let queryStr = '';
        if (query) {
            for (const k in query) {
                if (query[k] && query[k] !== '') {
                    queryStr += '&' + k + '=' + query[k];
                }
            }
        }
        return queryStr;
    }

    /**
     * 本地测试用
     * @param {string} mockStr
     */
    mock(mockStr: string) {
        return BObservable
            .create(function (observer) {
                setTimeout(() => {
                    observer.next(
                        JSON.parse(mockStr));
                }, 50);
            });
    }


    /**
     * 获取Status定义的下拉列表
     * @param key tableName.columnName
     * @returns {any}
     */
    getStatusDict(key) {
        if (this['authService'] && 'function' === typeof this['authService']['getStatusDict']) {
            return this['authService']['getStatusDict'](key);
        } else {
            return Observable.throw('获取[' + key + ']字典数据失败');
        }
    }

    /**
     * 获取部门列表
     * @returns {any}
     */
    getOrgList() {
        if (this['authService'] && 'function' === typeof this['authService']['getOrgList']) {
            return this['authService']['getOrgList']();
        } else {
            return Observable.throw('获取组织机构列表数据失败');
        }
    }

    getOrgTree() {
        if (this['authService'] && 'function' === typeof this['authService']['getOrgTree']) {
            return this['authService']['getOrgTree']();
        } else {
            return Observable.throw('获取组织机构树数据失败');
        }
    }

    /**
     * 资产分类树
     * @returns {any}
     */
    getAssetsCatalogTree() {
        if (this['authService'] && 'function' === typeof this['authService']['getAssetsCatalogsTree']) {
            return this['authService']['getAssetsCatalogsTree']();
        } else {
            return Observable.throw('获取资产分类树数据失败');
        }
    }

    /**
     * 备品备件分类树
     * @returns {any}
     */
    getPartsCatalogList() {
        if (this['authService'] && 'function' === typeof this['authService']['getPartsCatalogList']) {
            return this['authService']['getPartsCatalogList']();
        } else {
            return Observable.throw('获取组织机构列表数据失败');
        }
    }

    getPartsCatalogTree() {
        if (this['authService'] && 'function' === typeof this['authService']['getPartsCatalogTree']) {
            return this['authService']['getPartsCatalogTree']();
        } else {
            return Observable.throw('获取组织机构列表数据失败');
        }
    }

    /**
     * 属性分类树
     * @returns {any}
     */
    getSpecPrptyTree() {
        if (this['authService'] && 'function' === typeof this['authService']['getSpecPrptyTree']) {
            return this['authService']['getSpecPrptyTree']();
        } else {
            return Observable.throw('获取属性列表数据失败');
        }
    }

    getRepoList() {
        if (this['authService'] && 'function' === typeof this['authService']['getRepoList']) {
            return this['authService']['getRepoList']();
        } else {
            return Observable.throw('获取仓库列表数据失败');
        }
    }

    getSupplierList() {
        if (this['authService'] && 'function' === typeof this['authService']['getSupplierList']) {
            return this['authService']['getSupplierList']();
        } else {
            return Observable.throw('获取供应商列表数据失败');
        }
    }

    getUnitList() {
        if (this['authService'] && 'function' === typeof this['authService']['getUnitList']) {
            return this['authService']['getUnitList']();
        } else {
            return Observable.throw('获取计量单位列表数据失败');
        }
    }

    getCurrentLoginUser() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
}
