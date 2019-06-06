import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { BeneficioTipo } from '../model/beneficio-tipo';

@Injectable()
export class BeneficioTipoService extends ServiceBase {
  url = this.urlService + 'beneficios-tipos';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_beneficio_tipo: string) {
    return this.httpClient.get(this.url + '/' + id_beneficio_tipo, this.obterAuthHeader()).pipe( 
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

  save(beneficio_tipo: BeneficioTipo){
    return this.httpClient.post(this.url, beneficio_tipo, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_beneficio_tipo: string){
    return this.httpClient.delete(this.url + '/' + id_beneficio_tipo, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
