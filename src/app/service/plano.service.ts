import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Plano } from '../model/plano';

@Injectable()
export class PlanoService extends ServiceBase {
  url = this.urlService + 'planos';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_plano: string) {
    return this.httpClient.get(this.url + '/' + id_plano, this.obterAuthHeader()).pipe( 
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

  save(plano: Plano){
    return this.httpClient.post(this.url, plano, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_plano: string){
    return this.httpClient.delete(this.url + '/' + id_plano, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
