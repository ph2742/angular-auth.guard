import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Anexo } from '../model/anexo';

@Injectable()
export class AnexoService extends ServiceBase {
  url = this.urlService + 'anexos';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_anexo: string) {
    return this.httpClient.get(this.url + '/' + id_anexo, this.obterAuthHeader()).pipe( 
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

  save(anexo: Anexo){
    return this.httpClient.post(this.url, anexo, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_anexo: string){
    return this.httpClient.delete(this.url + '/' + id_anexo, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
