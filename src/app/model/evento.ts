import { Deserializable } from './deserializable';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Base } from './base';
import { Categoria } from './categoria';
import { Status } from './status';
import { Anexo } from './anexo';
import { Usuario } from './usuario';
import { EventoTag } from './evento-tag';

export class Evento extends Base implements Deserializable {
    categoria: Categoria;
    status: Status;
    anexo: Anexo;
    usuario: Usuario;
    isFavorito: boolean;
    nome: string;
    descricao: string;
    inicio: Date;
    fim: Date;
    uf: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    latitude: string;
    longitude: string;
    preco: number;
    urlLogo: string;
    tags: EventoTag[];
    tipo: string;
    complemento: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getDescriptionValidate(){
      if(this.fim == null){
          return 'Válido por tempo indeterminado.'
      } else {
          let datePipe = new DatePipe('pt-BR');
          return 'Válido até ' + datePipe.transform(this.fim) + '.';
      }
    }
}
