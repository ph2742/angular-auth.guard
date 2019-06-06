import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { tap } from 'rxjs/operators'
import { Observable } from "rxjs/Observable";

import { ServiceBase } from "../service/service.base";
import { Usuario } from "../model/usuario";

@Injectable()
export class AutenticateService extends ServiceBase {
  url = this.urlService + 'usuarios';

  constructor(private httpClient: HttpClient){
    super();
  }

  login(usuario: Usuario) : Observable<Usuario> {
    const body = new HttpParams()
        .set("grant_type", "password")
        .set('username', usuario.username)
        .set('password', usuario.password);

    let response = this.httpClient.post(this.urlService + 'Token', body.toString(), super.obterHeaderUrlencoded())
        .map(super.extractData)
        .catch(super.serviceError);

    return response;
  }

  getById(id_usuario: string) {
    return this.httpClient.get(this.url + '/' + id_usuario, this.obterAuthHeader()).pipe( 
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

  save(usuario: Usuario){
    return this.httpClient.post(this.url, usuario, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_usuario: string){
    return this.httpClient.delete(this.url + '/' + id_usuario, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
