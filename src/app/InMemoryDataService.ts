import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const user = [
      { id: 11, name: 'Mr. Nice', code: 200, data: {sessionId: 1, sysUser: '11'} },
      { id: 12, name: 'Narco' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 13, name: 'Bombasto' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 14, name: 'Celeritas' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 15, name: 'Magneta' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 16, name: 'RubberMan' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 17, name: 'Dynama' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 18, name: 'Dr IQ' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 19, name: 'Magma' , code: 200, data: {sessionId: 1, sysUser: '11'}},
      { id: 20, name: 'Tornado' , code: 200, data: {sessionId: 1, sysUser: '11'}}
    ];

    return {user};
  }
}
