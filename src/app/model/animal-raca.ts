import { Deserializable } from './deserializable';
import { Base } from './base';

export class AnimalRaca extends Base implements Deserializable {
    tipo: string; 
    nome: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
