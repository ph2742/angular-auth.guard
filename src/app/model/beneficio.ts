import { Deserializable } from './deserializable';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Base } from './base';
import { Usuario } from './usuario';
import { Empresa } from './empresa';
import { Categoria } from './categoria';
import { Anexo } from './anexo';
import { Status } from './status';
import { BeneficioTipo } from './beneficio-tipo';
import { BeneficioTag } from './beneficio-tag';

export class Beneficio extends Base implements Deserializable {
    usuario: Usuario;
    empresaL: Empresa[];
    categoria: Categoria;
    anexo: Anexo;
    status: Status;
    tipo: BeneficioTipo;
    nome: string;
    descricao: string;
    inicio: Date;
    fim: Date;
    tags: BeneficioTag[];
    videoCapa: string;
    urlLogo: string;
    isFavorito: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getDescriptionPrice(){
        if(this.tipo == null)
            return '';

        if(this.tipo.tipoDesconto == '0' && this.tipo.valorDesconto >= 100) {
            return 'Grátis';
        } else if(this.tipo.tipoDesconto == '0') {
            let decimalPipe = new DecimalPipe('pt-BR');
            return 'Desconto em ' + decimalPipe.transform(this.tipo.valorDesconto) + '%';
        } else {
            let currencyPipe = new CurrencyPipe('pt-BR');
            return 'Valor Fixo ' + currencyPipe.transform(this.tipo.valorDesconto, 'BRL');
        }
    }

    getDescriptionValidate(){
        if(this.fim == null){
            return 'Válido por tempo indeterminado.'
        } else {
            let datePipe = new DatePipe('pt-BR');
            return 'Válido até ' + datePipe.transform(this.fim) + '.';
        }
    }

    transfer(){
        let datePipe = new DatePipe('pt-BR');
        return {
            nome: this.nome,
            descricao: this.descricao,
            categoria_nome: this.categoria.nomeCategoria,
            cadastro: datePipe.transform(this.cadastro, 'short'),
            status_nome: this.status.nome,
            id: this.guid,
        };
    }
}
