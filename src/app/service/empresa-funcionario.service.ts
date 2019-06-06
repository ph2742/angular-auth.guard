import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { ServiceBase } from '../service/service.base';
import { EmpresaFuncionario } from '../model/empresa-funcionario';

@Injectable()
export class EmpresaFuncionarioService extends ServiceBase {
  url = this.urlService + 'empresas-funcionarios';

  constructor(private httpClient: HttpClient){
    super();
  }

  getById(id_empresa_funcionario: string) {
    return this.httpClient.get(this.url + '/' + id_empresa_funcionario, this.obterAuthHeader()).pipe( 
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

  save(empresa_funcionario: EmpresaFuncionario){
    return this.httpClient.post(this.url, empresa_funcionario, this.obterAuthHeader()).pipe(
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }

  delete(id_empresa_funcionario: string){
    return this.httpClient.delete(this.url + '/' + id_empresa_funcionario, this.obterAuthHeader()).pipe( 
      tap(
        data => { this.extractData(data) },
        response => { this.serviceError(response) }
      ));
  }
}
