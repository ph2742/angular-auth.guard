import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { UsuarioEmpresa } from '../model/usuario-empresa';

@Injectable()
export class UsuarioEmpresaService extends ServiceBase {
  url = this.urlService + 'usuarios-empresas';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_usuario_empresa: string) {
    return this.httpClient.get(this.url + '/' + id_usuario_empresa, this.obterAuthHeader()).pipe( 
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

  save(usuarioEmpresa: UsuarioEmpresa){
    return this.httpClient.post(this.url, usuarioEmpresa, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
