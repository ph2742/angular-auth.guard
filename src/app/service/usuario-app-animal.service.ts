import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { UsuarioAppAnimal } from '../model/usuario-app-animal';

@Injectable()
export class UsuarioAppAnimalService extends ServiceBase {
  url = this.urlService + 'usuarios-app-animais';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_usuario_animal: string) {
    return this.httpClient.get(this.url + '/' + id_usuario_animal, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  getByUser(id_usuario: string) {
    return this.httpClient.get(this.url + '/usuario/' + id_usuario, this.obterAuthHeader()).pipe( 
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

  save(usuarioAppAnimal: UsuarioAppAnimal){
    return this.httpClient.post(this.url, usuarioAppAnimal, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_usuario_animal: string){
    return this.httpClient.delete(this.url + '/' + id_usuario_animal, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
