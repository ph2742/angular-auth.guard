import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Evento } from '../model/evento';
import { EventoFilter } from '../model/evento-filter';

@Injectable()
export class EventoService extends ServiceBase {
  url = this.urlService + 'eventos';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_evento: string) {
    return this.httpClient.get(this.url + '/' + id_evento, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getActive() {
    return this.httpClient.get(this.url + '/ativo', this.obterAuthHeader()).pipe(
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

  save(evento: Evento) {
    return this.httpClient.post(this.url, evento, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_evento: string) {
    return this.httpClient.delete(this.url + '/' + id_evento, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getWithFilters(EventoFilter: EventoFilter) {
    return this.httpClient.post(this.url + '/filter', EventoFilter, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
