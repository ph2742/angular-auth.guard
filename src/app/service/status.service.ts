import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Status } from '../model/status';

@Injectable()
export class StatusService extends ServiceBase {
  url = this.urlService + 'status';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_status: string) {
    return this.httpClient.get(this.url + '/' + id_status, this.obterAuthHeader()).pipe(
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

  getToSelectBeneficio() {
    return this.httpClient.get(this.url + '/select/beneficio', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getToSelectEmpresa() {
    return this.httpClient.get(this.url + '/select/empresa', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getToSelectEvento() {
    return this.httpClient.get(this.url + '/select/evento', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getToSelectNoticia() {
    return this.httpClient.get(this.url + '/select/noticia', this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  save(status: Status){
    return this.httpClient.post(this.url, status, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_status: string){
    return this.httpClient.delete(this.url + '/' + id_status, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
