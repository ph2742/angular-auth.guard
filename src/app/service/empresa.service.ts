import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Empresa } from '../model/empresa';

@Injectable()
export class EmpresaService extends ServiceBase {
  url = this.urlService + 'empresas';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_empresa: string) {
    return this.httpClient.get(this.url + '/' + id_empresa, this.obterAuthHeader()).pipe(
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

  getToSelect() {
    return this.httpClient.get(this.url + '/select', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getStates() {
    return this.httpClient.get(this.url + '/states', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  save(empresa: Empresa){
    return this.httpClient.post(this.url, empresa, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_empresa: string){
    return this.httpClient.delete(this.url + '/' + id_empresa, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
