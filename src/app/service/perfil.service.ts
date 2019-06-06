import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { Perfil } from '../model/perfil';

@Injectable()
export class PerfilService extends ServiceBase {
  url = this.urlService + 'perfis';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_perfil: string) {
    return this.httpClient.get(this.url + '/' + id_perfil, this.obterAuthHeader()).pipe( 
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

  save(perfil: Perfil){
    return this.httpClient.post(this.url, perfil, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_perfil: string){
    return this.httpClient.delete(this.url + '/' + id_perfil, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
