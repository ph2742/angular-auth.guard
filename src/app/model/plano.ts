import { Deserializable } from './deserializable';
import { Base } from './base';
import { SelectItem } from './select-item'; 

export class Plano extends Base implements Deserializable {
    nome: string; 
    tipo: string;
    descricao: string;
    numero: string;
    identificacao: string;

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
