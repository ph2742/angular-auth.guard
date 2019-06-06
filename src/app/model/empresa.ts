import { CnpjPipe } from '../utils/cnpj-pipe';
import { DatePipe } from '@angular/common';
import { AsYouType } from 'libphonenumber-js';
import { Deserializable } from './deserializable';
import { Base } from './base';
import { Status } from './status';
import { Anexo } from './anexo';
import { Usuario } from './usuario';
import { Plano } from './plano';
import { RedeEmpresa } from './rede-empresa';
import { SelectItem } from './select-item';

export class Empresa extends Base implements Deserializable {
    status: Status;
    anexo: Anexo;
    usuario: Usuario;
    plano: Plano;
    rede: RedeEmpresa;
    nomeFantasia: string;
    nomeRazaoSocial: string;
    cnpj: string;
    urlWebsite: string;
    telefone: string;
    email: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    vencimentoContrato: Date;
    contatoResponsavel: string;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    latitude: string;
    longitude: string;
    uf: string;
    urlLogo: string;
    complemento: string;
    
    planosEscolhidos: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public convert(input: SelectItem){
        this.guid = input.id;
        this.nomeFantasia = input.itemName;

        return this;
    }

    transfer(){
        let datePipe = new DatePipe('pt-BR');
        let asYouType = new AsYouType('BR');
        let cnpjPipe = new CnpjPipe();
        return {
            rede_nome: this.rede.nome,
            nome_fantasia: this.nomeFantasia,
            cnpj: cnpjPipe.transform(this.cnpj),
            telefone: asYouType.input(this.telefone),
            cadastro: datePipe.transform(this.cadastro, 'short'),
            status_nome: this.status.nome,
            id: this.guid,
        };
    }
}
