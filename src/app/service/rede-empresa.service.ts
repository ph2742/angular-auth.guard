import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { RedeEmpresa } from '../model/rede-empresa';
import { RedeEmpresaFilter } from '../model/rede-empresa-filter';

@Injectable()
export class RedeEmpresaService extends ServiceBase {
  url = this.urlService + 'redes-empresas';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_rede: string) {
    return this.httpClient.get(this.url + '/' + id_rede, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByName(name: string) {
    return this.httpClient.get(this.url + '/name/' + name, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getToSelect(filters: RedeEmpresaFilter) {
    return this.httpClient.post(this.url + '/select', filters, this.obterAuthHeader()).pipe( 
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

  save(redeEmpresa: RedeEmpresa){
    return this.httpClient.post(this.url, redeEmpresa, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_rede: string){
    return this.httpClient.delete(this.url + '/' + id_rede, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
