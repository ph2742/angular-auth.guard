import { Deserializable } from './deserializable';
import { Base } from './base';
import { SelectItem } from './select-item'; 

export class Categoria extends Base implements Deserializable {
    nomeCategoria: string;
    descricaoCategoria: string;
    descricaoIcone: string;
    tipoCategoria: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public convert(input: SelectItem){
        this.guid = input.id;
        this.nomeCategoria = input.itemName;

        return this;
    }
}
