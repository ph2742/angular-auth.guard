import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { UsuarioApp } from '../model/usuario-app';

@Injectable()
export class UsuarioAppService extends ServiceBase {
  url = this.urlService + 'usuarios-app';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_usuario: string) {
    return this.httpClient.get(this.url + '/' + id_usuario, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getAll() {
    return this.httpClient.get(this.url, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  save(usuarioApp: UsuarioApp){
    return this.httpClient.post(this.url, usuarioApp, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_usuario: string){
    return this.httpClient.delete(this.url + '/' + id_usuario, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
