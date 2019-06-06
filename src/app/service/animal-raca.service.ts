import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { AnimalRaca } from '../model/animal-raca';

@Injectable()
export class AnimalRacaService extends ServiceBase {
  url = this.urlService + 'animal-racas';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_raca: string) {
    return this.httpClient.get(this.url + '/' + id_raca, this.obterAuthHeader()).pipe( 
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

  save(raca: AnimalRaca){
    return this.httpClient.post(this.url, raca, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_raca: string){
    return this.httpClient.delete(this.url + '/' + id_raca, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
