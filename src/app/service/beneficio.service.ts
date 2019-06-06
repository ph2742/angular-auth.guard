import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Beneficio } from '../model/beneficio';
import { BeneficioFilter } from '../model/beneficio-filter';

@Injectable()
export class BeneficioService extends ServiceBase {
  url = this.urlService + 'beneficios';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_beneficio: string) {
    return this.httpClient.get(this.url + '/' + id_beneficio, this.obterAuthHeader()).pipe(
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

  getFavorite(id_categoria: string) {
    return this.httpClient.get(this.url + '/favorito/' + id_categoria, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByLocalization(latitude: string, longitude: string) {
    return this.httpClient.get(this.url + '/localizacao/' + latitude + '/' + longitude, this.obterAuthHeader()).pipe(
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

  getByCompany(id_category: string) {
    return this.httpClient.get(this.url + '/empresa/' + id_category, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getTop(index: number) {
    return this.httpClient.get(this.url + '/top/' + index, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  save(beneficio: Beneficio){
    return this.httpClient.post(this.url, beneficio, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_beneficio: string){
    return this.httpClient.delete(this.url + '/' + id_beneficio, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getWithFilters(BeneficioFilter: BeneficioFilter){
    return this.httpClient.post(this.url + '/filter', BeneficioFilter, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
