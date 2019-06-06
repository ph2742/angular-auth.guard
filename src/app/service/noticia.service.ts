import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Noticia } from '../model/noticia';

@Injectable()
export class NoticiaService extends ServiceBase {
  url = this.urlService + 'noticias';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_news: string) {
    return this.httpClient.get(this.url + '/' + id_news, this.obterAuthHeader()).pipe( 
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

  getFavorite(id_category: string) {
    return this.httpClient.get(this.url + '/favorito/' + id_category, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByCategoryList(id_category: string) {
    return this.httpClient.get(this.url + '/categoria/' + id_category, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByCategoryFull(id_category: string) {
    return this.httpClient.get(this.url + '/categoria/completa/' + id_category, this.obterAuthHeader()).pipe(
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

  getByCategoryName(name: string) {
    return this.httpClient.get(this.url + '/categoria/name/' + name, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByCategory(id_category: string) {
    return this.httpClient.get(this.url + '/categoria/' + id_category, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  save(noticia: Noticia){
    return this.httpClient.post(this.url, noticia, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_news: string){
    return this.httpClient.delete(this.url + '/' + id_news, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
