import { Deserializable } from './deserializable';
import { Base } from './base';
import { SelectItem } from './select-item'; 

export class Status extends Base implements Deserializable {
    nome: string;
    tipo: string;
    numero: string;
    
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
        var result = new SelectItem();
        result.id = this.guid;
        result.itemName = this.nome;

        return result;
    }
}
