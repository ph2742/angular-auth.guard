import { Deserializable } from './deserializable';
import { Base } from './base';
import { Usuario } from './usuario';
import { Anexo } from './anexo';
import { SelectItem } from './select-item'; 

export class RedeEmpresa extends Base implements Deserializable {
    nome: string;
    usuario: Usuario;
    anexo: Anexo;
    
    public deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public convert(input: SelectItem){
        this.guid = input.id;
        this.nome = input.itemName;

        return this;
    }

    public transfer(): SelectItem {
        let result = new SelectItem();
        result.id = this.guid;
        result.itemName = this.nome;

        return result;
    }
}
