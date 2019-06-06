import { Deserializable } from './deserializable';
import { Plano } from './plano';
import { Status } from './status';
import { RedeEmpresa } from './rede-empresa';
import { Empresa } from './empresa';
import { Categoria } from '../model/categoria';
import { Beneficio } from './beneficio';

export class SelectItem implements Deserializable {
    id: string;
    itemName: string;
    code: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    fromPlano(input: Plano){
        this.id = input.guid;
        this.itemName = input.nome;

        return this;
    }

    fromStatus(input: Status){
        this.id = input.guid;
        this.itemName = input.nome;

        return this;
    }

    fromRedeEmpresa(input: RedeEmpresa){
        this.id = input.guid;
        this.itemName = input.nome;

        return this;
    }

    fromEmpresa(input: Empresa) {
      this.id = input.guid;
      this.itemName = input.nomeFantasia;

      return this;
    }

    fromCategoria(input: Categoria){
        this.id = input.guid;
        this.itemName = input.nomeCategoria;

        return this;
    }

    fromBeneficio(input: Beneficio) {
        this.id = input.guid;
        this.itemName = input.nome;

        return this;
    }
}
