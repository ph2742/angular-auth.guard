import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Categoria } from '../model/categoria';

@Injectable()
export class CategoriaService extends ServiceBase {
  url = this.urlService + 'categorias';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_categoria: string) {
    return this.httpClient.get(this.url + '/' + id_categoria, this.obterAuthHeader()).pipe(
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

  save(categoria: Categoria){
    return this.httpClient.post(this.url, categoria, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_categoria: string){
    return this.httpClient.delete(this.url + '/' + id_categoria, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
